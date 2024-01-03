import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../views/Home.vue"
import User from "../views/User.vue"
import Main from "../views/Main.vue"
import Mall from "../views/Mall.vue"
import PageOne from "../views/PageOne.vue"
import PageTwo from "../views/PageTwo.vue"
import PageThree from "../views/PageThree.vue"
import Test from "../views/Test.vue"
import Login from "../views/Login.vue"
Vue.use(VueRouter)
//1.创建路由组件
//2.将组件和路由进行映射

const routes = [
    //主路由
    { 
        path: '/', 
        component: Main,
        redirect: '/home', //重定向
        children:[
            //子路由
            { path: 'home', component: Home },  //首页
            { path: 'user', component: User },  //用户管理
            { path: 'mall', component: Mall },   //资源管理
            { path: 'page1', component: PageOne },   //页面1
            { path: 'page2', component: PageTwo },   //页面2
            { path: 'page3', component: PageThree },   //页面3
            { path: 'Test', component: Test },   //考试页面
            
        ]
    }, 
    {
      path: '/login',
      component:Login,
      name:'login'
    }



  ]
// 3. 创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({

    routes // (缩写) 相当于 routes: routes
  })
// 4. 创建和挂载根实例。
export default router