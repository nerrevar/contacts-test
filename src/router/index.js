import Vue from 'vue'
import VueRouter from 'vue-router'

import HomeView from '../views/HomeView.vue'
import ContactDataView from '../views/ContactDataView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView,
  },
  {
    path: '/contact_info/:docId',
    name: 'ContactDataView',
    component: ContactDataView,
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
    case 'ContactDataView': {
      title = 'Контактная информация'
      break
    }
  }
  document.title = title
  next()
})

export default router
