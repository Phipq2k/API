import shop from '@/api/shop'

export default { // setting and updating the state
  setProducts(state,products) {
    state.products = products
  },

  pushProductToCart(state, prodData) {
    state.cart.push({
      id: prodData.id,
      quantity: prodData.prodNum
    })
    state.cartItems++
  },

  incrementItemQty(state, cartData) {
    cartData.cartItem.quantity+= cartData.prodNum
    state.cartItems += cartData.prodNum
  },

  decrementProductInventory(state,product) {
    product.inventory-= product.prodNum
  },

  incrementProductInventory(state, data) {
    data.product.inventory += data.quantity
  },

  decrementQuantityInCart(state, item) {
    item.quantity--
    state.cartItems--
  },

  removeProductFromCart(state, data) {
    const index = state.cart.findIndex(item => item.id === data.product.id)
    state.cart.splice(index, 1)
    state.cartItems -= data.quantity
  },

  setCheckoutStatus(state,status) {
    state.checkoutStatus = status
  },

  emptyCart(state) {
    state.cart = []
    state.cartItems = 0
  },

  setHighPrice(state, event) {
    state.highprice = event
  },

  toggleSale(state) {
    state.sale = !state.sale
  },

  toggleStack(state) {
    state.stack = !state.stack
  },

  toggleSubCategory(state, sub) {
    if (state.subcategory.includes(sub)){
      state.subcategory.splice(state.subcategory.indexOf(sub),1)
    } else {
      state.subcategory.push(sub)
    }
  },

  toggleCategory(state, cate) {
    if (state.categorySelect.includes(cate)){
      state.categorySelect.splice(state.categorySelect.indexOf(cate), 1) 
    } else {
      state.categorySelect.push(cate)
    }
    console.log(state.categorySelect)
  },

  addProductToState(state, product) {
    shop.addProduct(product).then(product => {
      state.products.push(product)
    }).catch(e => {
      let newId = Date.now() + Math.round(Math.random(0, 1) * 1000)
      product.id = product.id ? product.id : newId
      state.products.push(product)
      alert('add product fail')
    })
  },

  deleteProductFromState(state, id) {
    shop.deleteProduct(id).then(response => {
      const index = state.products.findIndex(p => p.id === id)
      state.products.splice(index, 1)
    }).catch(e => {
      alert('delete product faile')
    })
  },

  modifyProductInState(state, product) {
    shop.modifyProduct(product).then(newProduct => {
      const index = state.products.findIndex(p => p.id === product.id)
      state.products.splice(index, 1, newProduct)
    }).catch(e => {
      const index = state.products.findIndex(p => p.id === product.id)
      state.products.splice(index, 1, product)
    })
  },

  setBannerLink (state, bannerLink) {
    state.bannerLink = bannerLink
  },
  
  resetFilterInfo(state) {
    state.sale = false
    state.stack = false
    state.categorySelect.length = 0
    state.subcategory.length = 0
    state.categoryForCateCheck = [
      {
        cate: 'menApparel',
        check: false
      },
      {
        cate: 'womenApparel',
        check: false
      },
      {
        cate: 'supplements',
        check: false
      },
      {
        cate: 'equipment',
        check: false
      }
    ]
    state.categoryForSubCheck = {         
      'all': [
        {sub:'upper', check:false},
        {sub:'lower', check:false},
        {sub:'shoes', check:false},
        {sub:'whey', check:false},
        {sub:'protein bar', check:false},
        {sub: 'creatine', check: false}
      ],
      'menApparel': [
        {sub:'upper', check:false},
        {sub:'lower', check:false},
        {sub:'shoes', check:false}
      ],
      'womenApparel': [
        {sub:'upper', check:false},
        {sub:'lower', check:false},
        {sub:'shoes', check:false}
      ],
      'supplements': [
        {sub:'whey', check:false},
        {sub:'protein bar', check:false},
        {sub: 'creatine', check: false}
      ],
      'equipment': [
      ]
    }
  }


}
