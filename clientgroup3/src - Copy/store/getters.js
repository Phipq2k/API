import shop from '@/api/shop'

export default { // = computed properties
  availableProducts(state,getters) {
    return state.products.filter(product => product.inventory > 0)
  },
  cartProducts(state) {
    return state.cart.map(cartItem => {
      const product = state.products.find(product => product.id === cartItem.id)
      return {
        id: product.id,
        // inventory: product.inventory, 
        title: product.title,
        price: product.price,
        img: product.img,
        quantity: cartItem.quantity
      }
    })
  },
  cartTotal(state,getters) {
    // let total = 0;
    // getters.cartProducts.forEach(product => {
    //   total = total + product.price * product.quantity
    // })
    // return total;

    return getters.cartProducts.reduce((total,product) => total + product.price * product.quantity, 0)
  },

  productInStock() {
    return(product) => {
      return product.inventory > 0
    }
  },

  getProductById: (state) => (id) => {
    return state.products.find(product => product.id === id)
  },

  getApparelSizeOptions: (state) => (subcategory) =>{
    return state.sizeOptions[subcategory]
  },

  getSubCategoryTypes: (state) => (category) => {
    return state.subCategoryTypes[category]
  },
  
  getBannerLink (state) {
    return state.bannerLink
  }
}
