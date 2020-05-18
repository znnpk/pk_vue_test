// 本文档进行封装 axios

// 在http.js中引入axios
import axios from 'axios'; // 引入axios
import QS from 'qs'; // 引入qs模块，用来序列化post类型的数据，后面会提到
// vant的toast提示框组件，大家可根据自己的ui组件更改。
import { Toast } from 'vant';
import ElementUI from 'element-ui'

//通过axios.defaults.timeout设置默认的请求超时时间。例如超过了10s，就会告知用户当前请求超时，请刷新等。
axios.defaults.timeout = 10000;

/**
 * 提示函数
 * 禁止点击蒙层、显示一秒后关闭
 */
const tip = msg => {
  console.log(msg)
  // this.$notify.info({
  //   title: '信息',
  //   message: 'msg'
  // });
  Toast({
    message: msg,
    duration: 1000,
    forbidClick: true
  });
}

/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
  tip("登录过期 请重新登录");
  router.replace({
    path: '/login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  });
}

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      toLogin();
      break;
    // 403 token过期
    // 清除token并跳转登录页
    case 403:
      tip('登录过期，请重新登录');

      sessionStorage.clear();
      store.commit('loginSuccess', null);
      setTimeout(() => {
        toLogin();
      }, 1000);
      break;
    // 404请求不存在
    case 404:
      tip('请求的资源不存在');
      break;
    default:
      console.log('后台回返数据');
      console.log(other);
      if(other=== "bakLogin"){
        toLogin();
      }
  }}

// 创建axios实例
var instance = axios.create({    timeout: 1000 * 12});

// 设置post请求头
// instance.defaults.headers.post['Content-Type'] = 'multipart/form-data';

// 我们在发送请求前可以进行一个请求的拦截，为什么要拦截呢，我们拦截请求是用来做什么的呢？
// 比如，有些请求是需要用户登录之后才能访问的，或者post请求的时候，我们需要序列化我们提交的数据。
// 这时候，我们可以在请求被发送之前进行一个拦截，从而进行我们想要的操作。

// 先导入vuex,因为我们要使用到里面的状态对象
// vuex的路径根据自己的路径去写
import store from './../store/index';
import router from './../router'
import {isUndefined} from 'element-ui/src/utils/types'

// 这里说一下token，一般是在登录完成之后，将用户的token通过localStorage或者cookie存在本地
// ，然后用户每次在进入页面的时候（即在main.js中），会首先从本地存储中读取token，
// 如果token存在说明用户已经登陆过，则更新vuex中的token状态。然后，在每次请求接口的时候，
// 都会在请求的header中携带token，后台人员就可以根据你携带的token来判断你的登录是否过期，
// 如果没有携带，则说明没有登录过。这时候或许有些小伙伴会有疑问了，就是每个请求都携带token，
// 那么要是一个页面不需要用户登录就可以访问的怎么办呢？其实，你前端的请求可以携带token，但是后台可以选择不接收啊！
/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
instance.interceptors.request.use(
  config => {
    // 登录流程控制中，根据本地是否存在token判断用户的登录情况
    // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
    // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
    // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
    const token = sessionStorage.getItem("token");
    token && (config.headers.Authorization = token);
    const redisKey = sessionStorage.getItem("redisKey");
    redisKey && (config.headers.redisKey = redisKey);
    const serverRsaPublicKey = sessionStorage.getItem("serverRsaPublicKey");
    (serverRsaPublicKey == null ||serverRsaPublicKey === "undefined") &&  (config.headers.serverRsaPublicKey = "0");

    return config;
  },
  error => Promise.error(error))


// 响应拦截器
instance.interceptors.response.use(
  // 请求成功
  res => {
    // 如果后端token被刷新 则本地token进行刷新

  if(res.data.redisKey){
    sessionStorage.setItem("redisKey",res.data.redisKey);
    // console.log("收到redisKey:"+res.data.redisKey )
  }
    if(res.data.serverRsaPublicKey){
      sessionStorage.setItem("serverRsaPublicKey",res.data.serverRsaPublicKey);
      // console.log("收到公钥:"+res.data.serverRsaPublicKey )
    }
      const newToken = res.headers.authorization;
      newToken && (sessionStorage.setItem("token",newToken));
    if (res.status === 200) {
      return res.data
    } else {
      tip('服务断线ing');
    Promise.reject(res)
      }
    }
    ,

  // 请求失败
  error => {
    tip('操作失败')
    const { response } = error;
    if (response) {
      // 请求已发出，但是不在2xx的范围
      errorHandle(response.status, response.data.message);
      return Promise.reject(response);
    } else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      if (!window.navigator.onLine) {
        store.commit('changeNetwork', false);
      } else {
        return Promise.reject(error);
      }
    }
  });

export default instance;





