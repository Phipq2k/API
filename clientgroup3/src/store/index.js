import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state : { // = data
    products:[],
    cart:[],
    cartItems:0,
    checkoutStatus: null,
    highprice: 1500,
    sale: false,        // check sale or not
    stack: false,       // check in of stack or not
    categorySelect: [],   // check category type
    subcategory: [],    // sub category enter
    categoryForCateCheck: [
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
    ],
    categoryForSubCheck: {         // category items for subcategory check
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
    },
    sizeOptions: {
      'upper': ['S', 'M', 'L', 'XL', 'XXL'],
      'lower': [32,33,34,35,36,37,38,39,40,41,42,43,44,45,46],
      'shoes': [34,35,36,37,38,39,40,41,42,43,44,45,46,47,48]
    },
    subCategoryTypes: {
      'menApparel': ['shoes', 'upper', 'lower'],
      'womenApparel': ['shoes', 'upper', 'lower'],
      'supplements': ['whey', 'protein bar', 'creatine'],
      'equipment': []
    },
    bannerLink: ''
  },
  getters,
  actions,
  mutations
})
