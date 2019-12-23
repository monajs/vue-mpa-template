import Vue from 'vue'
import Test from './index.vue'
import 'style/app.less'

Vue.config.productionTip = true

new Vue({
  el: '#appWrapper',
  render: (h) => h(Test)
})

import '@/core/global'
