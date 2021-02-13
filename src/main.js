import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = process.env.mode === 'production'

Vue.prototype.$_fetch = async (url, body) => {
  return await fetch(url, {
    method: 'POST',
    mode: 'same-origin',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
}

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
