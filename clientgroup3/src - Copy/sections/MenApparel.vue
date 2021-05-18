<template>
  <transition name="fade" tag="div">
  <div class="product-page">
    <div class="sidebar-wrap">
      <Sidebar category="menApparel"/>
    </div>
    <div class="product-list-wrap">
      <h1>Men Apparel</h1>
      <ProductList category="menApparel"/>
    </div>
  </div>
</transition>
</template>

<script>
import ProductList from '@/components/ProductList'
import Sidebar from '@/components/Sidebar'

export default {
  name: 'index',
  bannerLink: '../static/images/banner.webp',
  components: {
    ProductList,
    Sidebar
  },
  created () {
   // this.$store.commit('resetFilterInfo')
    this.$store.commit('setBannerLink', this.$options.bannerLink)
  },
  methods: {
  }
}
</script>

<style lang="css">
 h1 {
  text-align: left;
  margin-bottom: 40px;
  font-size: 20px;
 }
</style>
