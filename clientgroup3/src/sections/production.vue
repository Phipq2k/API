<template>
	<div class="production">
		<div class="prod--left">
			<img :src="product.img" :alt="`image of ${product.title}`">
		</div>
		<div class="prod--right">
			<p class="prod--right_title">{{product.title}}</p>
			<p class="prod--right_price">
				<span class="prod--right_pre">Price</span>
				<span class="prod--right_info">{{product.price | currency}}</span>
			</p>
			<div class="prod--right_desc">
				<p class="prod--right_pre">Description</p>
				<p class="description prod--right_info ">{{product.description}}</p>
			</div>
			<div class="prod--right_size" v-if="showSize">
				<p class="prod--right_pre">Size</p>
				<select v-model="product.size">
					<option disabled value="null">choose one</option>
					<option class="size_option" v-for="size in getApparelSizeOptions()(product.subcategory)" :value="size">{{size}} </option>
				</select>
			</div>
			<p class="prod--right_num">
				<span class="prod--right_pre">Number</span>
				<span class="prod--right_num__input">
					<a class="input_pre" href="javascript:(void 0);" @click="decNum"> - </a>
					<input type="text" name="" v-model="prodNum" @input="getCurrentNum">
					<a class="input_after" href="javascript:(void 0);" @click="plusNum(product)"> + </a>
				</span>
				<span class="inventory prod--right_info">(Inventory is {{product.inventory}})</span>
			</p>
			<button class="prod--right_cart" @click="addProductToCart(product)">Add to Cart</button>
		</div>
	</div>

</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'
export default {
	name: 'production',
  data () {
    return {
      product: {},
      showSize: false, // show size input for men or women apparel
      prodNum: 1  // the number to by, defalut 1
    }
  },
	created () {
		this.fetchProducts().then(() => {
			// this.$store.commit('resetFilterInfo')
			const pid = this.$route.query.pid
			const product = this.$store.getters.getProductById(pid)
			if (product) {
				window.localStorage.setItem('product', JSON.stringify(product))
				this.product = product
			} else {
				this.product = JSON.parse(window.localStorage.getItem('product'))
			}
			if (this.product.category === 'menApparel' || this.product.category === 'womenApparel') {
				this.product.size = null
				this.showSize = true
			}
		})

  },
	methods: {
		decNum: function () {
			if (this.prodNum > 1) {
				this.prodNum--
				this.product.prodNum = this.prodNum
			}
		},
		plusNum: function (pro) {
			if (this.prodNum < pro.inventory) {
				this.prodNum++
				this.product.prodNum = this.prodNum
			}
		},
		getCurrentNum: function (el) {
			if (+el.target.value > this.product.inventory){
				this.prodNum = this.product.inventory
				this.product.prodNum = this.prodNum
				el.target.value = this.prodNum
			} else if (el.target.value < 1) {
				this.prodNum = 1
				this.product.prodNum = this.prodNum
			}
		},
		...mapActions({
			fetchProducts: 'fetchProducts',
      addProductToCart: 'addProductToCart'
    }),
    ...mapGetters({
    	getProductById: 'getProductById',
    	getApparelSizeOptions: 'getApparelSizeOptions'
    })
	}
}
</script>

<style scoped lang="css">
.production {
	display: flex;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	margin: auto;
	position: absolute;
	height: 400px;
}

.prod--left {
	flex: .5 0 0;
}

.prod--left > img {
	max-height: 400px;
}

.prod--right {
	flex: .5 0 0;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
}

.prod--right_title {
	font-size: 28px;
	font-weight: 700;
	line-height: 21px;
	color: #3c3c3c;
}

.prod--right_pre {
	font-size: 20px;
	width: 110px;
	display: inline-block;
	color: #6c6c6c;
	text-align: left;
}

.prod--right_info {
	font-size: 18px;
}

.prod--right_desc {
	display: flex;
}

.prod--right_desc > .description {
	max-width: 300px;
	text-align: left;
  word-wrap: break-word;
}

.prod--right_size > .size_option {
	width: 50px;
}

.prod--right_num {
	display: flex;
	align-items: center;
}

.prod--right_num__input {
	display: flex;
}

.prod--right_num__input > a {
	outline: 0;
	text-decoration: none;
	text-align: center;
	font-size: 20px;
	color: black;
	background-color: #ededed;
}

.prod--right_num__input > .input_pre {
	width: 26px;
	height: 26px;
	border: 1px solid #ccc;
	border-right: 0 !important;
}

.prod--right_num__input > input {
	width: 50px;
	border: 1px solid #ccc;
	text-align: center;
	cursor: text;
	outline: none;
}

.prod--right_num__input > .input_after {
	width: 26px;
	height: 26px;
	border: 1px solid #ccc;
	border-left: 0 !important;
}

.prod--right_num > .inventory {
	margin-left: 10px;
}

@media (max-width: 600px) {
	.production {
		flex-direction: column;
		align-items: center;
		height: auto;
	}

	.prod--right {
		width: 233px;
	}

	.description {
		width: 200px;
	}
}
</style>
