import Vue from 'vue'
import App from './app/index'
import router from './router'
import 'style/app.less'

Vue.config.productionTip = true

new Vue({
  el: '#appWrapper',
  router,
  render: (h) => h(App)
})

import '@/core/global'
