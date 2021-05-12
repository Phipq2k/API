<template>
  <div>
    <Header/>
    <Main/>
    <Footer/>
  </div>
</template>

<script>
import Header from './views/layouts/Header'
import Main from './views/layouts/Main'
import Footer from './views/layouts/Footer'
export default {
  name: 'App',
  components: {
    Header,
    Main,
    Footer
  }
}
</script>

<style>

</style>
