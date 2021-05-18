<template>
	<div class="modify">
		<div class="form-wrap">
			<form class="add-form">
					<div class="form-item">
						<span>Img</span>
						<img :src="product.img" style="width: 30px;">
					</div>
					<div class="form-item">
						<span>Title</span>
						<input class="form-right" type="text" name="" v-model="product.title">
					</div>
					<div class="form-item">
						<span>Price</span>
						<input class="form-right" type="number" name="" v-model="product.price" step="0.01">
					</div>
					<div class="form-item">
						<span>Category</span>
						<select class="form-right" v-model="product.category">
							<option v-for="sub in category" :value="sub">
								{{sub}}
							</option>
						</select>
					</div>
					<div class="form-item">
						<span>Subcategory</span>
						<select class="form-right" name="" v-model="product.subcategory">
							<option v-for="sub in subCategory[product.category]" :value="sub">{{sub}}</option>
						</select>
					</div>
					<div class="form-item">
						<span>Sale</span>
						<div class="form-right sale-input" >
							<input class="radio"type="radio" name="sale" value="true" v-model="product.sale" :checked="product.sale">True
							<input class="radio" type="radio" name="sale" value="false" v-model="product.sale" :checked="!product.sale">False
						</div>
					</div>
					<div class="form-item">
						<span>Inventory</span>
						<input class="form-right"type="number" name="" v-model="product.inventory">
					</div>
					<div class="form-item">
						<span>Description</span>
						<textarea class="form-right" style="resize:none;" v-model="product.description"></textarea>
					</div>
					<div class="">
						<button type="button" @click="modify">Modify</button>
						<button type="button" @click="closeDialog">Cancel</button>
					</div>
				</form>
		</div>
		<div class="mask" @click="closeDialog" @keyup="">
		</div>
	</div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
	data () {
		return {
			product: {},
			category: ['menApparel', 'womenApparel', 'supplements', 'equirement'],
			subCategory: {
				menApparel: ['shoes', 'upper', 'lower'],
				womenApparel: ['shoes', 'upper', 'lower'],
				supplements: ['whey', 'protein bar'],
				equirement: []
			}
		}
	},
	methods: {
		closeDialog: function () {
			this.$emit('close')
		},
		modify: function () {
			console.log(this.product)
			this.$store.commit('modifyProductInState', this.product)
			this.$emit('showTipInfo', 'success')
			this.closeDialog()

		},
		...mapGetters({
      getProductById: 'getProductById'
		})
	},
	props: {
		modifyPid: Number
	},
	created () {
		// deep clone 
		this.product = JSON.parse(JSON.stringify(this.getProductById()(this.modifyPid)))
	},
	watch: {
	},
	components: {
	}
}

</script>

<style lang="scss" scoped>
.modify {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	margin: auto;
	z-index: 1000;

	.form-wrap {
		border-radius: 2px;
		z-index: 9999;
		width: 600px;
		height: 500px;
		background-color: white;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
		display: flex;
		justify-content: center;

		.add-form {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;
			margin: 10px;
			flex: 1 0 0;

			.form-item {
				display: flex;
				width: 100%;
				margin: 8px;
				height: 30px;

				span {
					flex: .4 0 0;
					text-align: left;
					justify-content: center;
					padding-left: 60px;
					font-size: 16px;
				}

				.form-right {
					flex: .5 0 0;
					outline: none;
					padding: 5px;
					border-radius: 2px;
					border: 1px solid rgba(203,203,203,.85);
				}

				.sale-input {
					border: none !important;

					.radio {
						margin-right: 5px;
					}
					input {
						margin-left: 35px;
					}
				}
				.file-input {
					border: none !important;
				}
			}
		}
	}

	.mask {
		position: fixed;
		width: 100%;
		height: 100%;
		background-color: #0d0a31;
		opacity: .75;
		left: 0;
		top: 0;
		z-index: 1000;
	}
}

</style>
