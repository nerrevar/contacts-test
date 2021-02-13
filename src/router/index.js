import Vue from 'vue'
import VueRouter from 'vue-router'

import HomeView from '../views/HomeView.vue'
import ContactInfoView from '../views/ContactInfoView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView,
  },
  {
    path: '/contact_info/:docId',
    name: 'ContactInfoView',
    component: ContactInfoView,
    props: true,
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

router.beforeEach((to, from, next) => {
  let title
  switch (to.name) {
    case 'HomeView': {
      title = 'Список контактов'
      break
    }
    case 'ContactInfoView': {
      title = 'Контактная информация'
      break
    }
  }
  document.title = title
  next()
})

export default router
