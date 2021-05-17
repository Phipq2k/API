import shop from '@/api/shop'

export default { // actions = mehtods
  fetchProducts(context) {
    return new Promise(function(resolve, reject) {
      shop.getProducts(products => {
        context.commit('setProducts',products)
        resolve();
      })
    })
  },

  addProductToCart(context, product) {
    // if(product.inventory > 0)
    if (!product.prodNum) {
      product.prodNum = 1
    }
    console.log('add', product)
    if(context.getters.productInStock(product)){
      const cartItem  = context.state.cart.find(item => item.id === product.id)
      if(!cartItem) {
        context.commit('pushProductToCart',{id: product.id, prodNum: product.prodNum})
      }
      else {
        context.commit('incrementItemQty',{cartItem: cartItem, prodNum: product.prodNum})
      }
      context.commit('decrementProductInventory',product)
    }
  },

  decProductFromCart(context, product) {
    let cartItem = context.state.cart.find(item => item.id === product.id)
    if (cartItem.quantity > 1) {
      context.commit('decrementQuantityInCart', cartItem)
      context.commit('incrementProductInventory', {product: product, quantity: cartItem.quantity})
    }
  },

  removeProductFromCart(context, product) {
    let cartItem = context.state.cart.find(item => item.id === product.id)
    if (cartItem) {
      context.commit('removeProductFromCart', {product: product, quantity: cartItem.quantity})
      context.commit('incrementProductInventory', {product: product, quantity: cartItem.quantity})
    }
  },

  checkout(context, userInfo) {
    shop.buyProducts({cart: context.state.cart, userInfo: userInfo}).then(response => {
      context.commit('emptyCart')
      context.commit('setCheckoutStatus', 'success')
      alert('checkout success')
    }).catch(e => {
      context.commit('setCheckoutStatus', 'fail')
      alert('checkout fail')
    })
    /*
    shop.buyProducts(
      context.state.cart,
      () => {
        context.commit('emptyCart')
        context.commit('setCheckoutStatus','success')
      },
      () => {
        context.commit('setCheckoutStatus','fail')
      }
    )
    */
  }
}
