import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/Backend/Layout'
import Article from '@/Backend/article'
import User from '@/Backend/user'
import ArticleList from '@/Backend/articleList'
import Scroll from '@/Backend/Scroll'
import ScrollList from '@/Backend/scrollList'
import Mail from '@/Backend/mail'
import Login from '@/Backend/Login'
import Register from '@/Backend/Register'
import FLayout from '@/Front/FLayout'
import Home from '@/Front/Home'
import FMail from '@/Front/Mail'
import About from '@/Front/About'
import Detail from '@/Front/Detail'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'FLayout',
      component: FLayout,
      children:[
        {
          path: '/',
          name: 'Home',
          component: Home,
          meta:{
            keepAlive: true //要被缓存
          }
        },
        {
          path: '/Home',
          name: 'Home',
          component: Home,
          meta:{
            keepAlive: true //要被缓存
          }
        },
        {
          path: '/About',
          name: 'About',
          component: About,
          meta:{
            keepAlive: true //要被缓存
          }
        },
        {
          path: '/FMail',
          name: 'FMail',
          component: FMail,
          meta:{
            keepAlive: true //要被缓存
          }
        },
        {
          path: '/Detail',
          name: 'Detail',
          component: Detail,
          meta:{
            keepAlive: false//要被缓存
          }
        }
      ]
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register,
      meta : {
        requireAuth: true,
      },
    },
    {
      path: '/Layout',
      name: 'Layout',
      component: Layout,
      meta : {
        requireAuth: true,
      },
      children: [
      {
        path: '/article',
        name: 'Article',
        component: Article,
        meta : {
          requireAuth: true,
        }
      },
      {
        path: '/user',
        name: 'User',
        component: User,
        meta : {
          requireAuth: true,
        }
      },
      {
        path: '/articleList',
        name: ArticleList,
        component: ArticleList,
        meta : {
          requireAuth: true,
        }
      },
      {
        path: '/addscroll',
        name: Scroll,
        component: Scroll,
        meta : {
          requireAuth: true,
        }
      },
      {
        path: '/scrollList',
        name: ScrollList,
        component: ScrollList,
        meta : {
          requireAuth: true,
        }
      },
      {
        path: '/mail',
        name: Mail,
        component: Mail,
        meta : {
          requireAuth: true,
        }
      }
    ]
    }
  ]
})
