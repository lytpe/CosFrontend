/* eslint-disable */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//main.js中的引入顺序决定了打包后css的顺序，组件内的样式没有生效可能是被第三方组件样式覆盖了，所以把第三方组件放在前面引入，router放在后面引入，就可以实现组件样式在第三方样式之后渲染。
import Vue from 'vue'
import App from './App'
//先引入第三方样式
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import router from './router'
import axios from 'axios'

Vue.prototype.$axios = axios
Vue.use(ElementUI)


Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
      //这里判断用户是否登录，我例子中是验证本地存储是否有token
      if (!sessionStorage.getItem('userName')) {
          next({
              path: '/Login'
          })
      } else {
          next()
      }
  } else {
      next() // 确保一定要调用 next()
  }
});
/* eslint-disable */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
