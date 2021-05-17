<template>
  <aside>
    <div class="aside-block sub-category" v-if="entrance==='product'">
      <h4>Sub Category</h4>
      <label v-for="item in subCategoryed"  class="checkbox-control sub-category--label ">
        <input  type="checkbox" @change="updateSubCategory(item.sub)" v-model="item.check">
        <div class="checkbox-box"></div>
        <span>{{item.sub}}</span>
      </label>
    </div>
    <div class="aside-block sub-category" v-else>
      <h4>Category</h4>
      <label v-for="item in categoryed" class="checkbox-control sub-category--label">
        <input type="checkbox" @change="updateCategory(item.cate)" v-model="item.check">
        <div class="checkbox-box"></div>
        <span>{{item.cate}}</span>
      </label>
    </div>
    <div class="aside-block">
      <label for="pricerange">Maximum Price: <span>${{ pricerange }}</span></label>
      <input
        class="slider"
        id="pricerange"
        tabindex="0"
        :value="pricerange"
        type="range"
        :min="min"
        :max="max"
        step="0.1"
        @input="updateHighPrice($event)"
      />
      <span class="min">${{ min }}</span>
      <span class="max">${{ max }}</span>
    </div>
    <div class="aside-block">
        <h4>Super Sale</h4>
        <label class="checkbox-control">
        <span class="label-name">Show only sale item</span>
        <input type="checkbox" v-model="check" @change="updateSale">
        <div class="checkbox-box"></div>
      </label>
    </div>
    <div class="aside-block">
      <h4>In Stack</h4>
      <label class="checkbox-control">
        <span class="label-name">Show in Stack</span>
        <input type="checkbox" v-model="stack" @change="updateStack" name="">
        <div class="checkbox-box"></div>
      </label>
    </div>
    <!-- <div class="aside-block">
      <h4>Support</h4>
      <p>Get in touch with us for any queries at <a href="#">support@bazaaar.in</a></p>
    </div> -->
  </aside>
</template>

<script>
import store from '@/store/index'
export default {
  name: 'Sidebar',
  data() {
    return {
      min: 0,
      max: 2000,
      check: this.checked,
      stack: this.stacked,
    };
  },
  props: {
    category: {
      type: String,
      default: 'all'
    },
    entrance: {
      type: String,
      default: 'product'
    }
  },
  computed: {
    pricerange() {
      return this.$store.state.highprice
    },
    checked() {
      return this.$store.state.sale;
    },
    stacked() {
      return this.$store.state.stack;
    },
    subCategoryed() {
      return this.$store.state.categoryForSubCheck[this.category]
    },
    categoryed() {
      return this.$store.state.categoryForCateCheck
    }
  },
  methods: {
    updateHighPrice($event) {
      this.$store.commit('setHighPrice', $event.target.value)
    },
    updateSale() {
      this.$store.commit('toggleSale');
    },
    updateStack() {
      this.$store.commit('toggleStack')
    },
    updateSubCategory(sub) {
      this.$store.commit('toggleSubCategory', sub)
    },
    updateCategory(cate) {
      this.$store.commit('toggleCategory', cate)
    }
  }
}
</script>

<style lang="css">
  .aside-block {
    padding: 40px 0;
    border-bottom: 1px solid #eee;
    font-size: 15px;
  }
  .min {
    float: left;
  }
  .max {
    float: right;
  }
  .aside-block h4 {
    margin-bottom: 10px;
  }
  .checkbox-control {
    position: relative;
    display: inline-block;
  }
  .sub-category {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 250px;
  }
  .sub-category--label {
    width: 120px;
    display: flex;
    justify-content: space-between;
  }
  .checkbox-box {
    width: 18px;
    height: 18px;
    border: 2px solid #131313;
    position: relative;
    cursor: pointer;
    float: left;
    top: 2px;
    margin-right: 10px;
  }

  input[type="checkbox"] {
    opacity: 0;
    position: absolute;
  }

  input[type="checkbox"]:hover ~ .checkbox-box, input[type="checkbox"]:focus ~ .checkbox-box, input[type="checkbox"]:checked ~ .checkbox-box{
    border-color: #5044ff;
  }

  input[type="checkbox"]:checked ~ .checkbox-box::before {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    top: 2px;
    left: 2px;
    background: #5044ff;
  }
</style>
