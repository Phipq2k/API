<template>
  <div>
      <h1>Login</h1>
      <p>Tạo trang đăng nhập (get API data từ servergroup 3), nếu người dùng chưa có tài khoản thì tạo sự kiện đăng ký và điều hướng đến trang đăng ký (post API từ servergroup 3)</p>
      <ul>
        <li>Ví dụ về sự kiện điều hướng đến trang đăng ký: </li>
        <button class="btn btn-success" @click="handledemo1">Chuyển đến trang đăng ký</button>
      </ul>
      <p>Nếu người dùng đăng nhập đúng, chuyển về trang chủ, thay đổi text trong avatar là chữ cái đâù trong tên người dùng (giống sự kiện mỗi khi ta đăng nhập vào email, avatar sẽ thay đổi thành của mình), ngược lại sẽ không cho đăng nhập. Cuối cùng thay đổi sự kiện khi nhấn vào avatar sẽ chuyển đến trang admin.</p>
      <ul>
        <li>Ví dụ về sự kiện điều hướng đến trang chủ: </li>
        <button class="btn btn-danger" @click="handledemo2">Quay lại trang chủ</button>
        <li>Ví dụ về sự kiện điều hướng đến trang profile: </li>
        <button class="btn btn-warning" @click="handledemo3">Chuyển đến trang profile</button>
      </ul>
    
  </div>
  
</template>

<script>
export default {
  methods: {
    handledemo1(){
      this.$router.push('/registration')
    },
    handledemo2() {
      this.$router.push('/')
      //console.log('back to home');
    },
    handledemo3() {
      this.$router.push('/profile')
      //console.log('back to home');
    }
  }

}
</script>

<style>

</style>