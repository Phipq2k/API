/**
 * Mocking client-server processing
 */
// const _products = [
//   {"id": 1, "title": "iPad 4 Mini", "price": 500.01, "inventory": 2},
//   {"id": 2, "title": "H&M T-Shirt White", "price": 10.99, "inventory": 10},
//   {"id": 3, "title": "Charli XCX - Sucker CD", "price": 19.99, "inventory": 5}
// ]
import axios from 'axios'

const _products = [{
        idproduct: 2,
        title: 'Adidas Sweatpants',
        price: 29.99,
        category: 'menApparel',
        subcategory: 'lower',
        sale: false,
        img: 'http://www.prodirectselect.com/productimages/V3_1_Main/155052.jpg',
        inventory: 20,
        description: 'sdfdsfsfsfsfsfsdfs fsfsfsdfsdfsdfsf sdfsfsdfsdfsdfsdfsdf'
    },
    {
        idproduct: 3,
        title: 'Adidas Sneakers',
        price: 129.99,
        category: 'menApparel',
        subcategory: 'shoes',
        sale: true,
        img: 'https://i.pinimg.com/originals/ec/df/33/ecdf33e67c281d1ccb2a7ceb52ccddca.jpg',
        inventory: 20,
        description: 'phi'
    },
    {
        idproduct: 7,
        title: 'Chocolate Whey',
        price: 998.00,
        category: 'supplements',
        subcategory: 'whey',
        sale: false,
        img: 'https://s3.images-iherb.com/opn/opn02867/l/3.jpg',
        inventory: 20,
        description: 'sdfdsfsfsfsfsfsdfs fsfsfsdfsdfsdfsf sdfsfsdfsdfsdfsdfsdf'
    },
    {
        idproduct: 8,
        title: 'Strawberry Whey',
        price: 139.90,
        category: 'supplements',
        subcategory: 'whey',
        sale: false,
        img: 'http://www.impactnutrition.com.tn/wp-content/uploads/2017/10/PREMIUM-WHEY-STRAWBERRY-CREAM-2000G.jpg',
        inventory: 0,
        description: 'sdfdsfsfsfsfsfsdfs fsfsfsdfsdfsdfsf sdfsfsdfsdfsdfsdfsdf'
    },
    {
        idproduct: 12,
        title: 'Jumping Rope',
        price: 1179.89,
        category: 'equipment',
        subcategory: '',
        sale: true,
        img: 'http://koboxinggloves.com/wp-content/uploads/2015/11/Valeo-Speed-Jump-Rope.jpg',
        inventory: 20,
        description: 'sdfdsfsfsfsfsfsdfs fsfsfsdfsdfsdfsf sdfsfsdfsdfsdfsdfsdf'
    },
    {
        idproduct: 13,
        title: 'Weighted Ball',
        price: 69.00,
        category: 'equipment',
        subcategory: '',
        sale: false,
        img: 'https://images-na.ssl-images-amazon.com/images/I/81Gfjru18WL._SX466_.jpg',
        inventory: 20,
        description: 'sdfdsfsfsfsfsfsdfs fsfsfsdfsdfsdfsf sdfsfsdfsdfsdfsdfsdfdafdasfaaaaaaaaaaaaaaaflljdslfjiodsjaoifjsdojfodjsoifjweojfoijseofijweojfiowejfoijweoifjwoijfoiwejfoijweoifjweoifjoiwejfoijweiofjweoijfoiewjoifejofjowejfoqjewofi'
    },
    {
        idproduct: 14,
        title: 'Resistance Rubber Bands',
        price: 29.99,
        category: 'equipment',
        subcategory: '',
        sale: true,
        img: 'https://images-na.ssl-images-amazon.com/images/I/61DtjNzBpfL._SY355_.jpg',
        inventory: 20,
        description: 'sdfdsfsfsfsfsfsdfs fsfsfsdfsdfsdfsf sdfsfsdfsdfsdfsdfsdf'
    },
    {
        idproduct: 15,
        title: 'Ab Roller',
        price: 1820.90,
        category: 'equipment',
        subcategory: '',
        sale: false,
        img: 'https://cdn.shopify.com/s/files/1/1090/8670/products/Ab_Roller_2.jpg?v=1497965926',
        inventory: 20,
        description: 'sdfdsfsfsfsfsfsdfs fsfsfsdfsdfsdfsf sdfsfsdfsdfsdfsdfsdf'
    },
    {
        idproduct: 16,
        title: 'Foam Roller',
        price: 159.00,
        category: 'equipment',
        subcategory: '',
        sale: true,
        img: 'https://images-na.ssl-images-amazon.com/images/I/71qJS6GshGL._SL1500_.jpg',
        inventory: 20,
        description: 'sdfdsfsfsfsfsfsdfs fsfsfsdfsdfsdfsf sdfsfsdfsdfsdfsdfsdf'
    },
    {
        idproduct: 20,
        title: 'Adidas Sweatpants',
        price: 29.99,
        category: 'womenApparel',
        subcategory: 'lower',
        sale: false,
        img: 'https://slimages.macysassets.com/is/image/MCY/products/6/optimized/8094846_fpx.tif?op_sharpen=1&wid=400&hei=489&fit=fit,1&$filterlrg$',
        inventory: 5,
        description: 'sdfdsfsfsfsfsfsdfs fsfsfsdfsdfsdfsf sdfsfsdfsdfsdfsdfsdf'
    },
    {
        idproduct: 21,
        title: 'Nike Sport Bra',
        price: 58.99,
        category: 'womenApparel',
        subcategory: 'upper',
        sale: true,
        img: 'https://s7d2.scene7.com/is/image/dkscdn/16NIKWPRCLSSCPDDDAPUA_Black_White_is/',
        inventory: 20,
        description: 'sdfdsfsfsfsfsfsdfs fsfsfsdfsdfsdfsf sdfsfsdfsdfsdfsdfsdf'
    },
    {
        idproduct: 23,
        title: 'Nike Legging',
        price: 139.90,
        category: 'womenApparel',
        subcategory: 'lower',
        sale: false,
        img: 'https://i1.adis.ws/i/jpl/jd_013860_b?qlt=80&w=600&h=765&v=1',
        inventory: 0,
        description: 'sdfdsfsfsfsfsfsdfs fsfsfsdfsdfsdfsf sdfsfsdfsdfsdfsdfsdf'
    },
    {
        idproduct: 25,
        title: 'BCAA My Protein',
        price: 129.99,
        category: 'supplements',
        subcategory: 'bcaa',
        sale: false,
        img: 'https://s1.thcdn.com/productimg/600/600/10529280-1034357592398899.jpg',
        inventory: 20,
        description: 'sdfdsfsfsfsfsfsdfs fsfsfsdfsdfsdfsf sdfsfsdfsdfsdfsdfsdf'
    },
    {
        idproduct: 28,
        title: 'BCAA Cola Taste',
        price: 69.00,
        category: 'supplements',
        subcategory: 'bcaa',
        sale: false,
        img: 'https://images-na.ssl-images-amazon.com/images/I/41Bzin-OjeL.jpg',
        inventory: 20,
        description: 'sdfdsfsfsfsfsfsdfs fsfsfsdfsdfsdfsf sdfsfsdfsdfsdfsdfsdf'
    },
    {
        idproduct: 29,
        title: 'Underarmour Legging Black',
        price: 29.99,
        category: 'womenApparel',
        subcategory: 'lower',
        sale: true,
        img: 'https://underarmour.scene7.com/is/image/Underarmour/V5ProdWithBadge?rp=on-model-crop|pdpMainDesktop&scl=1.00&fmt=jpg&qlt=85&resMode=sharp2&cache=on,off&bgc=F0F0F0&rect=0,0,612,650&$p_pos=305,325&$p_size=612,650&extendN=0,0,0,0&$p_src=is{Underarmour/V5-1246098-001_BCROP}',
        inventory: 20,
        description: 'sdfdsfsfsfsfsfsdfs fsfsfsdfsdfsdfsf sdfsfsdfsdfsdfsdfsdf'
    },
    {
        idproduct: 30,
        title: 'Underarmour Legging White',
        price: 1820.90,
        category: 'womenApparel',
        subcategory: 'lower',
        sale: false,
        img: 'http://www.beautysportswear.com/wp-content/uploads/back-white-ray-mesh-leggings.jpg',
        inventory: 20,
        description: 'sdfdsfsfsfsfsfsdfs fsfsfsdfsdfsdfsf sdfsfsdfsdfsdfsdfsdf'
    },
    {
        idproduct: 31,
        title: 'Space theme Legging',
        price: 159.00,
        category: 'womenApparel',
        subcategory: 'lower',
        sale: true,
        img: 'https://images-na.ssl-images-amazon.com/images/I/61Bi1-5bq0L._UX342_.jpg',
        inventory: 20,
        description: 'sdfdsfsfsfsfsfsdfs fsfsfsdfsdfsdfsf sdfsfsdfsdfsdfsdfsdf'
    },
    {
        idproduct: 32,
        title: 'Nike Jacket',
        price: 1119.99,
        category: 'womenApparel',
        subcategory: 'upper',
        sale: false,
        img: 'https://c.static-nike.com/a/images/t_PDP_1280_v1/f_auto/rfcfwi46v7fgjx3frycx/sportswear-n98-jacket-kp1K6M.jpg',
        inventory: 20,
        description: 'sdfdsfsfsfsfsfsdfs fsfsfsdfsdfsdfsf sdfsfsdfsdfsdfsdfsdf'
    }
]

const IP = 'http://localhost:8080'
export default {

    /*
      axios apis for
       - signIn
       - signUp 
       - getUserInfo
     */

    signIn(data) {
        return new Promise((resolve, reject) => {
            axios.post(IP + '/signIn', data).then(response => {
                resolve(response.body.data)
            }).catch(e => {
                reject(e)
            })
        })
    },

    signUp(data) {
        return new Promise((resolve, reject) => {
            axios.post(IP + '/signUp', data).then(response => {
                resolve(response.body.data)
            }).catch(e => {
                reject(e)
            })
        })
    },

    getUserInfo(data) {
        return new Promise((resolve, reject) => {
            axios.post(IP + '/getUserInfo', data).then(response => {
                resolve(response.body.data)
            }).catch(e => {
                reject(e)
            })
        })
    },

    getProducts(cb) {
        axios.get(IP + '/getProducts').then(response => {
            cb(response.body._products)
        }).catch(e => {
            setTimeout(() => cb(_products), 100)
        })
    },

    buyProducts(data) {
        return new Promise((resolve, reject) => {
            axios.post(IP + '/buyProducts', data).then(response => {
                resolve(response)
            }).catch(e => {
                reject(e)
            })
        })
    },

    addProduct(product) {
        return new Promise((resolve, reject) => {
            axios.post(IP + '/addProduct', { product }).then(response => {
                resolve(response.body.data)
            }).catch(e => {
                reject(e)
            })
        })
    },

    modifyProduct(product) {
        return new Promise((resolve, reject) => {
            axios.post(IP + '/modifyProduct', { product }).then(response => {
                resolve(response.body.data)
            }).catch(e => {
                reject(e)
            })
        })
    },

    deleteProduct(id) {
        return new Promise((resolve, reject) => {
            axios.post(IP + '/removeProduct', { id }).then(response => {
                resolve(response)
            }).catch(e => {
                reject(e)
            })
        })
    }

    /*
    buyProducts (products, cb, errorCb) {
      setTimeout(() => {
        // simulate random checkout failure.
        (Math.random() > 0.5 || navigator.userAgent.indexOf('PhantomJS') > -1)
          ? cb()
          : errorCb()
      }, 100)
    }
    */
}