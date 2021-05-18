<template>
	<div class="product-page">
		<div class="sidebar-wrap">
      <Sidebar category="menApparel" entrance="admin"/>
    </div>
    <div class="product-list-wrap admin">
			<div class="search-bar">
				<div class="search-input">
					<input type="text" name="" placeholder="title" @click="search" v-model:value="searchTitle">
					<button class="search" @click="search">Search</button>
				</div>
				<img src="../assets/add.png" alt="add" @click="openAddDialog">
			</div>
			<div class="products">
				<transition-group name="card" tag="ul">
	        <li v-for="product in products" :key="product.id" :data-key="product.id" class="product-card"  tabindex="0">
	          <img class="product-img" :src="product.img" :alt="`image of ${product.title}`">
	          <span class="product-title">{{product.title}}</span>
	          <span class="product-price"> {{product.price | currency}}</span>
						<div class="button-master">
	          	<button @click="openModifyDialog">Modify</button>
	          	<button @click="deleteProduct">Delete</button>
	          </div>
	        </li>
	      </transition-group>
			</div>
    </div>
		<AddProduct v-if="showAddProduct" @close="closeAddDialog" @showTipInfo="showTipInfo"></AddProduct>
		<ModifyProduct :modifyPid="modifyPid" v-if="showModifyProduct" @close="closModifyDialog" @showTipInfo="showTipInfo"></ModifyProduct>
		<TipInformation v-if="showTip" :info="tipInfo"></TipInformation>
	</div>

</template>

<script>
import AddProduct from '@/sections/AddProduct'
import ModifyProduct from '@/sections/ModifyProduct'
import Sidebar from '@/components/Sidebar'
import TipInformation from '@/sections/TipInformation'
import {mapState, mapGetters, mapActions} from 'vuex'

export default {
	name: 'admin',
  bannerLink: '',
	data () {
		return {
			showAddProduct: false,
			showModifyProduct: false,
			searchTitle: '',
			modifyPid: null,
			showTip: false,
			tipInfo: ''
		}
	},
	methods: {
		openAddDialog: function () {
			this.showAddProduct = true
			document.body.style.overflow = 'hidden'
			document.body.style.height = '100%'
		},
		closeAddDialog: function () {
			this.showAddProduct = false
			document.body.style.overflow = 'initial'
		},
		openModifyDialog: function (el) {
			this.modifyPid = +(el.target.parentElement.parentElement.dataset.key)
			this.showModifyProduct = true
			document.body.style.overflow = 'hidden'
			document.body.style.height = '100%'
		},
		closModifyDialog: function () {
			this.showModifyProduct = false
			document.body.style.overflow = 'initial'
		},
		deleteProduct: function (el) {
			if (window.confirm('are you sure to delete the product?')){
				const deletePid = +(el.target.parentElement.parentElement.dataset.key)
				this.$store.commit('deleteProductFromState', deletePid)
			}
		},
		showTipInfo: function (tipInfo) {
			this.showTip = true
			this.tipInfo = tipInfo
			setTimeout(()=>{this.showTip = false}, 2000)
		},
		search: function () {

		},
		...mapActions({
      fetchProducts: 'fetchProducts',
      addProductToCart: 'addProductToCart',
      removeProductFromState: 'removeProductFromState'
    }),
	},
	created () {
    this.$store.commit('setBannerLink', this.$options.bannerLink)
		this.fetchProducts().then()
	},
	computed: {
		products() {
			// get products on sale
			let saleProducts = this.$store.state.products.filter(el =>
        this.$store.state.sale
          ? el.price < this.$store.state.highprice && el.sale
          : el.price < this.$store.state.highprice
      )

			// get products in stack
      let stackProducts = this.$store.state.products.filter(el => {
         return this.$store.state.stack ? el.price < this.$store.state.highprice && (el.inventory > 0) : el.price < this.$store.state.highprice
      })

      // get Products filter by category
      let categoryProducts = this.$store.state.products.filter(el => {
        return this.$store.state.categorySelect.length > 0 ? el.price < this.$store.state.highprice && this.$store.state.categorySelect.includes(el.category) : el.price < this.$store.state.highprice
      })

      // get products filter by search words
      let searchProducts = this.$store.state.products.filter(el => {
      	let reg = new RegExp(this.searchTitle, 'i')
      	return reg.test(el.title)
      })

      return saleProducts.filter(s => stackProducts.includes(s) && categoryProducts.includes(s) && searchProducts.includes(s)).sort((a,b) => a.title.toUpperCase() < b.title.toUpperCase() ? -1 : 1 )
    },
    ...mapGetters({
      productInStock: 'productInStock',
    })
	},
	components: {
		AddProduct,
		ModifyProduct,
		Sidebar,
		TipInformation
	}
}

</script>

<style lang="scss" scoped>
.admin {
	display: flex;
	flex-direction: column;
	align-items: center;

	.search-bar {
		display: flex;
		justify-content: center;
		align-items: center;

		.search-input {
			display: flex;

			input {
				width: 350px;
				height: 36px;
				outline: none;
				font-size: 18px;
				border-color: #5044ff;
				padding: 5px;
			}

			.search {
				margin: 0;
				border-radius: 0;
				border-left: 0;
				border-width: 2px;
				height: 36px;
				background-color: #5044ff;
				color: white;
			}

			.search:hover {

			}
		}

		img {
			width: 36px;
			margin-left: 20px;
			cursor: pointer;
		}
	}

	.products {
		width: 100%;
		margin-top: 10px;

		ul {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			padding: 0;

			li {
				width: 250px;

				.button-master {
					position: absolute;
					background-color: black;
					opacity: .75;
					height: 95%;
					width: 93%;

					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;

					display: none;
				}
			}

			.product-card:hover {
				.button-master {
					display: flex;
				}
			}
		}
	}
}
</style>
