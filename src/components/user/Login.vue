<template>
  <body id="paper">
  <el-form ref="loginForm" :model="loginForm" :rules="rules" class="login-container" label-position="left"
           label-width="0px" v-loading="loading" >
    <h3 class="login_title">系统登录</h3>
    <el-form-item prop="userName">
      <el-input type="text" v-model="loginForm.userName"
                auto-complete="off" placeholder="账号" aria-required="true"/>
    </el-form-item>
    <el-form-item  prop="userPassword">
      <el-input show-password v-model="loginForm.userPassword"
                auto-complete="off"  placeholder="密码"/>
    </el-form-item>
<!--    <el-checkbox class="login_remember" v-model="checked"-->
<!--                 label-position="left"><span style="color: #505458">记住密码</span></el-checkbox>-->
    <el-form-item style="width: 100%" >
      <el-button type="primary"  style="width: 49%" v-on:click="login">登录</el-button>
      <router-link to="register"><el-button type="primary" style="width:49%">注册</el-button></router-link>
    </el-form-item>
  </el-form>
  </body>
</template>
<script>
export default{
  data () {
    let userNameCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        this.$api.article.emManger('get','emNames',{userName: this.loginForm.userName})
          .then( (res) => {
                if (res.code === 200) {
                  callback()
                } else {
                  callback(new Error('用户不存在'))
                }
          })
      }
    }
    return {
      rules: {
          userName: [{required: true, validator: userNameCheck, trigger: 'change'}],
          userPassword: [{required: true, message: '密码不能为空', trigger: 'change'}]
      },
      checked: true,
      loginForm: {
        username: '',
        password: ''
      },
      loading: false
    }
  },
  methods: {
    login () {
    var _this = this
    _this.$refs['loginForm'].validate((valid) => {
      if (valid) {
        // this.$rsa.rsa.rsaTest();
        let userName = this.$rsa.rsa.rsaEncode(this.loginForm.userName,sessionStorage.getItem("serverRsaPublicKey"));
        let userPassword = this.$rsa.rsa.rsaEncode(this.loginForm.userPassword,sessionStorage.getItem("serverRsaPublicKey"));
        this.$api.article.emManger('post','login',{userName:userName,userPassword:userPassword})
          .then( (res) => {
                if (res.code === 200) {
                  // var data = resp.data.data
                    // 这个应该是为了以后的session做到处理
                    this.$store.commit('userNameChange',this.loginForm.userName);
                    sessionStorage.setItem("token",res.Authorization);

                  this.$router.replace("/home")
                } else {
                  this.$alert('用户名密码错误', '提示', {
                    confirmButtonText: '确定'
                  })
                }
          })
    }
      else{
        return false
      }
     })
    }
  },
}

</script>
<style>
  #paper {
    background: url('../../assets/images/login1.jpg') no-repeat center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  body{
    margin: -5px 0px;
  }
  .login-container {
    border-radius: 30px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 40px 35px 30px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    height: auto;
    margin-top: 17.5%;
    margin-left: 65%;
  }
  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .login_remember {
    margin: 0px 0px 35px 0px;
    text-align: left;
  }
  /*.login_button {*/
  /*background: #505458;*/
  /*}*/
  /*el_checkbox {*/
  /*background: #505458;*/
  /*}*/
</style>
