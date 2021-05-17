<template>
  <div id="app">
    <TopNavigation/>
    <div class="banner" v-if="bannerLink !== ''">
      <img :src="bannerLink">
    </div>
    <div class="content-wrapper">
      <router-view/>
    </div>
    <Footer/>
  </div>
</template>

<script>
import TopNavigation from '@/components/TopNavigation'
import Footer from '@/components/Footer'
import {mapGetters} from 'vuex'

export default {
  name: 'App',
  components: {
    Footer,
    TopNavigation
  },
  computed: {
    ...mapGetters({
      bannerLink: 'getBannerLink'
    })
  }
}
</script>
<style> @import './assets/styles.css'; </style>
