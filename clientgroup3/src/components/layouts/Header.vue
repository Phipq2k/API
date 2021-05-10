<template>
  <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
  <!-- Brand -->
   <div class="navbar-nav">
      <router-link class="nav-item" tag="li" to="/login"><b-avatar variant="info"></b-avatar></router-link>
   </div>

  <!-- Links -->
  <ul class="navbar-nav mr-auto">
     <router-link class="nav-item" active-class="active" exact tag="li" to="/"><a class="nav-link">Trang chủ</a></router-link>
     <router-link class="nav-item" active-class="active" tag="li" to="/contact"><a class="nav-link">Liên hệ</a></router-link>
  </ul>
  <form class="form-inline my-2 my-lg-0" action="/">
    <input class="form-control mr-sm-2" type="search" placeholder="Search">
    <button class="btn btn-success" type="submit"><i class="fa fa-search"></i></button>
  </form>
</nav>
</template>

<script>
export default {
  name: 'Header'

}
</script>

<style>

</style>