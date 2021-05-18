<template>
	<transition name="fade" tag="div">
		<div class="checkout">
			<h1>Checkout Page</h1>
			<div class="cart-list">
				<li class="cart-item cart-head">
					<span class="cart-head--title">Title</span>
					<span>Price</span>
					<span>Quantity</span>
					<span>Operate</span>
				</li>
				<li class="cart-item" v-for="item in products" :date-key="item.id">
					<img :src="item.img" alt="img of product">
					<span>{{item.title}}</span>
					<span>{{item.price | currency}}</span>
					<span class="quantity">
						<a class="input_pre" href="javascript:(void 0);" @click="decNum(item)"> - </a>
						<input type="text" name="" v-model="item.quantity" @input="" disabled>
						<a class="input_after" href="javascript:(void 0);" @click="addNum(item)"> + </a>
					</span>
					<span><a href="javascript:(void 0);" style="text-decoration: none; color:red;" @click="removeItem(item)">remove</a></span>
				</li>
				<div class="total">
					<span>TOTAL:</span>
					<span>{{total | currency}}</span>
					</div>
			</div>
			<div class="right-part">
				<div class="buyer-info">
						<input class="buyer-input" type="text" placeholder="first name" v-model="userInfo.firstName">
						<input class="buyer-input" type="text" placeholder="last name" v-model="userInfo.lastName">
						<input class="buyer-input" type="text" placeholder="street name" v-model="userInfo.streetName">
						<input class="buyer-input" type="number" placeholder="number" v-model="userInfo.number">
						<input class="buyer-input" type="text" placeholder="zip code" v-model="userInfo.zipCode">
						<input class="buyer-input" type="text" placeholder="city" v-model="userInfo.city">
				</div>
				<div class=button-wrap>
					<button @click="checkout(userInfo)">Submit</button>
					<button>Cancel</button>
				</div>
			</div>
		</div>
	</transition>

</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import Shop from '../api/shop.js'

export default {
	data () {
		return {
			userInfo: {}
		}
	},
	computed: {
		...mapGetters({
			products: 'cartProducts',
			total: 'cartTotal'
		})
	},
	methods: {
		decNum: function (cartPro){
			const product = this.$store.getters.getProductById(cartPro.id)
			this.decProductFromCart(product)
		},
		addNum: function (cartPro){
			const product = this.$store.getters.getProductById(cartPro.id)
			this.addProductNum(product)
		},
		removeItem: function (cartPro) {
			const product = this.$store.getters.getProductById(cartPro.id)
			this.removeProductFromCart(product)
		},
		getUserInfo: function () {
			Shop.getUserInfo().then(response => {
				this.userInfo = response.body.data.userInfo
			}).catch(e => {
				//alert('getUserInfo fail')
			})
		},
		...mapActions({
			addProductNum: 'addProductToCart',
			decProductFromCart: 'decProductFromCart',
			removeProductFromCart: 'removeProductFromCart',
			checkout: 'checkout'
		})
	},
	created () {
		this.getUserInfo()
	}
}

</script>

<style lang="scss" scoped>
.checkout {
	display: flex;
	flex-direction: row;
	justify-content: center;

	.left-part {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		flex: .7 0 0;

		h1 {
			align-self: flex-start;
		}

		.cart-list {
			display: flex;
			flex-direction: column;
			width: 600px;

			.cart-head {
				color: #969696;

				.cart-head--title {
					flex: .25 0 0;
				}
			}

			.cart-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-bottom: 10px;
				margin-top: 10px;
				border-bottom: 1px solid rgba(235,235,235, .75);
				height: 70px;
				font-size: 15px;

				img {
					height: 50px;
					width: 50px
				}

				span {
					flex: .2 0 0;
				}

				span:first-child {
					flex: .3 0 0;
				}

				.quantity {
					display: flex;
					width: 50%;
					justify-content: center;

					a {
						outline: 0;
						text-decoration: none;
						text-align: center;
						font-size: 20px;
						color: black;
						background-color: #ededed;
						width: 26px;
						height: 30px;
						border: 1px solid #ccc;
					}

					input {
						width: 30px;
						height: 30px;
						border: 1px solid #ccc;
						text-align: center;
						cursor: text;
						outline: none;
						background-color: white;
					}
					.input_pre {
						border-right: 0 !important;
					}

					.input_after {
						border-left: 0 !important;
					}
				}
			}

			.total {
				display: flex;
				justify-content: space-between;
				font-size: 18px;
				color: #5400cc;
				margin-top: 5px;
			}
		}
	}

	.right-part {
		flex: .3 0 0;
		display: flex;
		flex-direction: column;
		align-items: center;

		.buyer-info {
			display: flex;
			flex-direction: row;
			margin-top: 50px;
			width: 300px;
			flex-wrap: wrap;
			justify-content: center;

			.buyer-input {
				width: 250px;
				height: 40px;
				margin: 5px;
				padding: 4px;
				outline: none;
				border-radius: 3px;
				border: 1px solid rgba(235,235,235, 1);
				font-size: 17px;
			}

			.buyer-input:focus {
				border-color: #5400cc;
			}
		}

		.button-wrap {
		}
	}
}
</style>
