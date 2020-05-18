import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
// 将所有未登录会话重定向到 /login
// Router.beforeEach((to, from, next) => {
//   if (to.path === '/login') {
//     sessionStorage.removeItem('user')
//   }
//   var user = sessionStorage.getItem('user')
//   if (!user && to.path !== '/login') {
//     next({
//       path: '/login'
//     })
//   } else {
//     next()
//   }
// })

import  comment from '@/components/user/comment.vue'


export default new Router({
  // base:'/vue/', //打包后的路径访问问题   使用node服务器架设时候就不需要进行 vue的目录结构了 同nginx
  mode: 'history', // 去掉路由地址的# 但是刷新会404 除非再重新配置 需要进行nginx 化配置
  //  本地打开时候 history模式 打开也会是空白哦
  routes: [
    {path: '/', redirect: 'login'},
    {
      path: '/comment',
      meta: {
        title: '品科内部系统登录'
      },
      // component: (resolve) => require(['@/components/user/comment.vue'], resolve)
      component: comment
    },
    {
      path: '/testTwo',
      meta: {
        title: '品科内部系统登录'
      },
      component: (resolve) => require(['@/components/testDemoTwo.vue'], resolve)
    },
    {
      path: '/OutShow',
      meta: {
        title: '品科内部系统登录'
      },
      component: (resolve) => require(['@/components/home/bigScreenShow.vue'], resolve)
    },
    {
      path: '/demo',
      meta: {
        title: '品科内部系统登录'
      },
      component: (resolve) => require(['@/components/testDemo.vue'], resolve)
    },
    {
      path: '/home',
      name: 'home',
      meta: {
        title: 'pkHomeShow'
      },
      redirect: '/show',
      // 路由重新定向到 /show
      component: (resolve) => require(['@/components/home/home.vue'], resolve),
      children: [
        {
          path: '/show',
          name: 'weHomeShow',
          component: (resolve) => require(['@/components/home/weHomeShow.vue'], resolve),
          // components: {
          //   top:(resolve) => require(['@/components/home/bigScreenShow.vue'], resolve),
          //   default:(resolve) => require(['@/components/home/EmShow.vue'], resolve)
          //     },
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/AgencyManger',
          name: 'AgencyManger',
          component: (resolve) => require(['@/components/home/basicManager/AgencyManger.vue'], resolve),
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/EmManager',
          name: 'EmManager',
          component: (resolve) => require(['@/components/home/basicManager/EmManager.vue'], resolve),
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/SchManager',
          name: 'SchManager',
          component: (resolve) => require(['@/components/home/basicManager/SchManager.vue'], resolve),
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/AgencyOrder',
          name: 'AgencyOrder',
          component: (resolve) => require(['@/components/home/orderManager/AgencyOrder.vue'], resolve),
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/SchOrder',
          name: 'SchOrder',
          component: (resolve) => require(['@/components/home/orderManager/SchOrder.vue'], resolve),
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/AgencyShow',
          name: 'AgencyShow',
          component: (resolve) => require(['@/components/home/basicShow/AgencyShow.vue'], resolve),
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/OrderShow',
          name: 'OrderShow',
          component: (resolve) => require(['@/components/home/basicShow/OrderShow.vue'], resolve),
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/SchShow',
          name: 'SchShow',
          component: (resolve) => require(['@/components/home/basicShow/SchShow.vue'], resolve),
          meta: {
            requireAuth: true
          }
        }
      ]
    },
    {
      path: '/login',
      meta: {
        title: '品科内部系统登录'
      },
      component: (resolve) => require(['@/components/user/login.vue'], resolve)
    },
    {
      path: '/register',
      meta: {
        title: '品科内部系统登录'
      },
      component: (resolve) => require(['@/components/user/register.vue'], resolve)
    }
  ]
})
