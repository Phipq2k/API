<template>
  <div class="wrap">
    <form class="signin" v-show="hasAccount">
      <h1 class="sign-title">Login to your account</h1>
      <input id="signinEmail" type="text" name="signin-email" placeholder="email" @input="clearSignFail" @keyup.enter="signUp">
      <input id="signinPass" type="password" name="signin-pass" placeholder="password" @input="clearSignFail" @keyup.enter="signUp">
      <input id="signinReset" type="reset" name="" style="display:none;">
      <span v-show="signinFail" class="legal-info">email or pass error, try again!</span>
      <div>
        <button type="button" class="sigin-btn" @click="signIn">SignIn</button>
        <a href="javascript:(void 0)" @click="showSignup">SignUp</a>
        <a href="javascript:(void 0)" @click="forgetPass">forget password</a>
      </div>
    </form>
    <form class="signup" v-show="!hasAccount">
      <h1 class="sign-title">Create your account</h1>
      <input id="signupName" type="text" name="signup-name" placeholder="UserName" @input="checkName">
      <span class="legal-info">{{nameIllegalInfo}}</span>
      <input id="signupEmail" type="text" name="sigup-email" placeholder="Email" @input="checkEmail">
      <span class="legal-info">{{emailIllegalInfo}}</span>
      <input id="signupPass" type="password" name="signup-pass" placeholder="Password" @input="checkPass">
      <span class="legal-info" v-if="passIllegal">the length of password should be larger then 5 and shorter than 13</span>
      <input type="password" name="signup-pass-repeat" placeholder="Password Again" @input="checkPassConsist" @keyup.enter="signUp">
      <span class="legal-info" v-if="passConsistIllegal">two password you enter are not consist!</span>
      <input id="signupReset" type="reset" style="display: none" >
      <div>
        <span v-show="signupFail" class="legal-info">SignUp Fail</span>
        <button type="button" class="signup-btn" @click="signUp" >SignUp</button>
        <a href="javascript:(void 0)" @click="showSignin">have a account already</a>
      </div>
    </form>
 </div>
</template>

<script>
import env from '../../config/dev.env.js'
import Shop from '../api/shop.js'
const IP = env.SERVER_IP

export default {
  bannerLink: '',
  data () {
    return {
      hasAccount: true,
      nameIllegal: false,
      passIllegal: false,
      passConsistIllegal: false,
      signinFail: false,
      signupFail: false,
      nameIllegalInfo: '',
      emailIllegalInfo: '',
    }
  },
  created () {
    this.$store.commit('setBannerLink', this.$options.bannerLink)
  },
  methods: {
    showSignup: function () {
      this.hasAccount = false
    },
    showSignin: function () {
      this.hasAccount = true
    },
    forgetPass: function () {
      alert('oh, i forget')
    },
    clearSignFail: function () {
      if (this.signinFail === true) {
        this.signinFail = false
      }
    },
    checkName: function (e) {
      let nickName = e.target.value
      let regex = /^^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]{6,12}$/
      if (regex.test(nickName)) {
        this.nameIllegalInfo = ''

        Shop.checkNameExisted({nickName}).then(response => {

        }).catch(e => {
          
        })
        /*
        this.$http.post(IP + '/api/checkNickNameExisted', {nickName}).then(response => {
          console.log(response)
          if (response.body.code !== 1) {
            this.nameIllegalInfo = 'userName already existed, change it and try again.'
            this.nameIllegal = true
          } else {
            this.nameIllegal = false
            this.nameIllegalInfo = ''
          }
        })
        */
      } else if (nickName !== '') {
        this.nameIllegalInfo = "username's format is not correct, incluing illegal character."
        this.nameIllegal = true
      } else {
        this.nameIllegalInfo = ''
        this.nameIllegalInfo = false
      }
    },
    checkEmail: function (e) {
      let value = e.target.value
      let regex = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (regex.test(value)) {
        this.emailIllegalInfo = ''
        /*
        this.$http.post(IP + '/api/checkEmailExisted', {email: value}).then(response => {
          console.log(response)
          if (response.body.code !== 1) {
            this.emailIllegalInfo = 'eamil is already existed, change and try again.'
          } else {
          }
        })
        */
      } else if (value !== '') {
        this.emailIllegalInfo = 'illegal email format'
      } else {
        this.emailIllegalInfo = ''
      }
    },
    checkPass: function (e) {
      const pass = e.target.value
      if (pass.length < 6 || pass.length > 12) {
        if (pass.length === 0) {
          this.passIllegal = false
        } else {
          this.passIllegal = true
        }
      } else {
        this.passIllegal = false
      }
    },
    checkPassConsist: function (e) {
      const passConsist = e.target.value
      const pass = document.getElementById('signupPass').value
      if (pass === passConsist) {
        this.passConsistIllegal = false
      } else {
        this.passConsistIllegal = true
      }
    },
    signIn: function () {
      const email = document.getElementById('signinEmail').value
      const pass = document.getElementById('signinPass').value
      const data = {email, pass}

      Shop.signIn(data).then(response => {
        alert('success, and do something you want')
      }).catch(e => {
        alert('fail')
      })

      /*

      this.$http.post(IP + '/api/signIn', data, {
        withCredentials: true
      }).then(response => {
        if (response.body.code !== 1) {
          this.signinFail = true
          document.getElementById('signinReset').click()
        } else {
          this.$router.push({path: '/', params: {data: response.body.data, signIn: true}})
        }
      })
      */
    },
    signUp: function () {
      const nickName = document.getElementById('signupName').value
      const email = document.getElementById('signupEmail').value
      const pass = document.getElementById('signupPass').value
      const data = {nickName, email, pass}

      if (!this.nameIllegal && !this.passIllegal && !this.passConsistIllegal && (nickName.length > 0 && email.length > 0 && pass.length > 0)) {

        Shop.signUp(data).then(response => {
          alert('signUp success')
        }).catch(e => {
          alert('signUp fail')
        })

        /*
        this.$http.post(IP + '/api/signUp', data, {
          withCredentials: true
        }).then(response => {
          if (response.body.code !== 1) {
            this.signupFail = true
            document.getElementById('signupReset').click()
          } else {
            this.$router.push({path: '/', params: {data: response.body.data, signIn: true}})
          }
        })
        */
      } else {
        alert('SignUp Fail')
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.wrap {
  display: flex;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  flex-direction: column;
  align-items: center;
  width: 40rem;
  height: 300px;
  position: absolute;
}

.signin, .signup {
  display: flex;
  flex-direction: column;
  width: 30rem;
  border-radius: 2px;
  box-shadow: 0 0 2px rgba(0,0,0,.15);
  padding: 10px;
  background-color: white;

  .sign-title {
    text-align: center;
  }

  input {
    height: 3rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    outline: none;
    border: none;
    border-bottom: solid 1px;
    font-size: 1.5rem;
  }

  .legal-info {
    align-self: flex-start;
    color: red;
  }

  div {
    margin-top: 0.5rem;
    display: flex;
    justify-content: space-around;
    align-items: center;

    button {
      width: 10rem;
      height: 2.9rem;
      margin-top: 1rem;
      background-color: #5044ff;
      outline: none;
      border: none;
      color: white;
      font-size: 1.5rem;
      cursor: pointer;
      border-radius: 2px;
    }
    button:hover {
      background-color: rgb(2, 73, 26);
    }

    a {
      margin-top: 1rem;
    }
  }
}

.three-part-list {
  display: flex;
  flex-direction: row;
  width: 80%;
  justify-content: space-around;
  padding: 0;

  .oauth-bg {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    background-color: #f4f8fb;
    display: flex;
    align-items: center;
    justify-content:center;
    img {
      height: 2.3rem;
      vertical-align: center;
    }
  }
}

.three-part-p {
  color: #8b9196;
  font-size: 1.5rem;
  font-family: -apple-system,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Arial,sans-serif;
}
a {
  text-decoration: none;
  color: #5044ff;
}

ul {
  list-style: none;
}
</style>
