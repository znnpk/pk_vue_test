import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss'
import commonMethods from "./script/commonMethods";
import store from "./store/index";
// 设置反向代理，前端请求默认发送到 http://localhost:8443/api
import  JSEncrypt  from 'jsencrypt/bin/jsencrypt'



//axios的请求的封装
import api from './request/index' // 导入api接口
Vue.prototype.$api = api; // 将api挂载到vue的原型上

//jsencrypt rsa 加解密
import rsa from './request/rsa';
Vue.prototype.$rsa = rsa;


Vue.prototype.commonMethods=commonMethods
Vue.config.productionTip = false

Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  components: { App },
  template: '<App/>'
})
