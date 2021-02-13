import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import ContactInfo from '../views/ContactInfo.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Список контактов',
    component: Home,
  },
  {
    path: '/contact_info',
    name: 'Контактная информация',
    component: ContactInfo,
  },
  {
    path: '*',
    redirect: '/',
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.afterEach((to, from) => {
  document.title = to.name
})

export default router
