import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from './store';
import './api/mock'
import Cookies from 'js-cookie'
Vue.config.productionTip = false


//全局引入
Vue.use(ElementUI);
//添加全局前置导航守卫
router.beforeEach((to,from,next)=>{
  //判断token存不存在
  const token=Cookies.get('token')
  //不存在 说明当前用户未登录跳转登录页
  if(!token && to.name !== 'login'){
    next({name:'login'})
  }else if(token && to.name==='login'){//存在 登录 跳转首页
    next({name:'home'})
  }else{
    next();
  }
})
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
