/**
 * article模块接口列表
 */

import base from './base'; // 导入接口域名列表
import axios from './../http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块


//   部署到阿里云上的ip配置
let url = base.aliyunHost;
  //直接写项目路径 在nigx配置也行使用 就是可能会有问题 /show 直接访问会有空白页 路径跳转问题  写全ip路径就没有问题
//  ngix上项目的替换变更 貌似需要些实际 原因应该是 因为浏览器的缓存同步问题
// let url = "/pkServer";

// let url = base.homeHost;

const article = {
  url: url,
  //为了实现restful风格的 基础函数封装
  axiosMethod(method,path,params){
    //查询
    if (method === "get"){
      // console.log(params)
      return axios.get(`${path}`,{params:params});
    //  新增
    }else if(method === "post"){
      return axios.post(`${path}`, params);
    //  更新
    }else if(method === "put"){
      return axios.put(`${path}`, params);
    //  删除
    }else if(method === "delete"){
      return axios.delete(`${path}`,{data:params});
    }else if(method === "head"){
      return axios.head(`${path}`, params);
    }
  },
  // post提交
  // login (params) {
  //   return axios.post(`${url}/accesstoken`, qs.stringify(params));
  // },

  // 学校属性资源管理
  schManger (method,path,params) {
    return  this.axiosMethod(method,`${url}/sch/${path}`,params);
  },
  // 代理商属性管理
  agencyManger (method,path,params) {
    return  this.axiosMethod(method,`${url}/age/${path}`,params);
  },

  // 员工属性管理
  emManger (method,path,params) {
    return  this.axiosMethod(method,`${url}/em/${path}`,params);
  },
  // 中间商星订单属性管理
  agencyPrjManger (method,path,params) {
    return  this.axiosMethod(method,`${url}/agencyPrj/${path}`,params);
  },

  // 学校订单属性管理
  schPrjManger (method,path,params) {
    return  this.axiosMethod(method,`${url}/schPrj/${path}`,params);
  },
// 大屏展示的请求管理
  screenShow (method,path,params) {
    return  this.axiosMethod(method,`${url}/show/${path}`,params);
  },


  //封装的测试使用类
  testSome (params) {
    alert(params);
    alert(`${base.local}`);
  },

  // 其他接口…………
}

export default article;

//1.通过直接引入我们封装好的axios实例，然后定义接口、调用axios实例并返回，可以更灵活的使用axios，比如你可以对post请求时提交的数据进行一个qs序列化的处理等。
// 2.请求的配置更灵活，你可以针对某个需求进行一个不同的配置。关于配置的优先级，axios文档说的很清楚，这个顺序是：在 lib/defaults.js 找到的库的默认值，然后是实例的 defaults 属性，最后是请求的 config 参数。后者将优先于前者。
// 3.restful风格的接口，也可以通过这种方式灵活的设置api接口地址。


// methods: {
// //   onLoad(id) {
// //     this.$api.article.articleDetail(id, {
// //       api: 123
// //     }).then(res=> {
// //       // 执行某些操作
// //     })
// //   }
// // }

// <template>
// <div id="app">
//   <div v-if="!network">
//   <h3>我没网了</h3>
//   <div @click="onRefresh">刷新</div>
//   </div>
//   <router-view/>
//   </div>
//   </template>
//
//   <script>
// import { mapState } from 'vuex';
// export default {
//   name: 'App',
//   computed: {
//     ...mapState(['network'])
//   },
//   methods: {
//     // 通过跳转一个空页面再返回的方式来实现刷新当前页面数据的目的
//     onRefresh () {
//       this.$router.replace('/refresh')
//     }
//   }
// }
// </script>

// 这里简单演示一下断网。在http.js中介绍了，我们会在断网的时候，来更新vue中network的状态，
// 那么这里我们根据network的状态来判断是否需要加载这个断网组件。断网情况下，加载断网组件，不加载对应页面的组件。
// 当点击刷新的时候，我们通过跳转refesh页面然后立即返回的方式来实现重新获取数据的操作。
// 因此我们需要新建一个refresh.vue页面，并在其beforeRouteEnter钩子中再返回当前页面。

// refresh.vue
// beforeRouteEnter (to, from, next) {
//   next(vm => {
//     vm.$router.replace(from.fullPath)
//   })
// }




