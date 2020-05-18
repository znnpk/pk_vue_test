<template>
  <body id="paper">
  <el-form :model="loginForm" ref="loginForm" :rules="rules" class="login-container" label-position="left"
           label-width="0px" v-loading="loading">
    <h3 class="login_title">用户注册</h3>
    <el-form-item prop="userName">
      <el-input type="text" v-model="loginForm.userName"
                auto-complete="off" placeholder="账号"/>
    </el-form-item>
    <el-form-item prop="userPassword">
      <el-input  v-model="loginForm.userPassword"
                auto-complete="off" show-password  placeholder="密码"/>
    </el-form-item>
    <el-form-item prop="rePassword">
      <el-input  v-model="loginForm.rePassword"
                auto-complete="on" show-password placeholder="确认密码" />
    </el-form-item>
    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 49%;" v-on:click="register">注册</el-button>
      <router-link to="login"><el-button type="primary" style="width: 49%;">返回登录</el-button></router-link>
    </el-form-item>
  </el-form>
  </body>
</template>
<script>
export default{
  data () {
    const userNameCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        this.$api.article.emManger('get','emNames',{userName: this.loginForm.userName})
          .then( (res) => {
                if (res.code === 200) {
                  callback(new Error('用户名已经被占用'))
                } else {
                  callback()
                }
          })
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.loginForm.userPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      rules: {
          userName: [{required: true, validator: userNameCheck, trigger: 'blur'}],
          userPassword: [{required: true, message: '密码不能为空', trigger: 'blur'}
          // ,{ pattern: /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,30}$/, message: '密码为数字，小写字母，大写字母，特殊符号 至少包含三种，长度为 8 - 30位，密码不能包含 用户名，公司名称(lidian), 公司域名(rekoon) （判断的时候不区分大小写)' }
        ],
        rePassword: [{required: true, validator: validatePass2, trigger: 'blur'}]
      },
      checked: true,
      loginForm: {
        username: '',
        password: '',
        rePassword: ''
      },
      loading: false
    }
  },
  methods: {
    register () {
      var _this = this
      _this.$refs['loginForm'].validate((valid) => {
        if (valid) {
          this.$api.article.emManger('post','emByUserName',{userName: this.loginForm.userName
            ,userPassword: this.loginForm.userPassword})
            .then( (res) => {
                  if (res.code === 200) {
                    this.$notify.success({
                      title: '成功',
                      message: '注册成功！\n 请登录！'
                    });
                    _this.$router.replace('/login')
                  } else {
                    this.$alert(res.message, '提示', {
                      confirmButtonText: '确定'
                    })
                  }
            })


        } else {
          return false
        }
      })
    },
    BackToLogin () {
      alert('test')
      var _this = this
      _this.$router.replace('/login')
    }
  }
}
</script>
<style>
  #paper {
    background: url("../../assets/images/login1.jpg") no-repeat center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  body{
    margin: -5px 0;
  }
  .register-container {
    border-radius: 15px;
    background-clip: padding-box;
    /*margin: 90px auto;*/
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    margin-top: 12.5%;
    margin-left: 40%;
  }
  .login_title {
    margin: 0 auto 40px auto;
    text-align: center;
    color: #505458;
  }
  /*.login_remember {*/
  /*  margin: 0 0 35px 0;*/
  /*  text-align: left;*/
  /*}*/
</style>
