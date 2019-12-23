import Vue from 'vue'
import LoadingTpl from './loading.vue'

class Loading {
  static show () {
    if (!this.vm) {
      const loadingTpl = Vue.extend(LoadingTpl)
      this.vm = new loadingTpl()
    }
    this.tpl = this.vm.$mount().$el
    this.vm.show()
  }

  static hide () {
    if (!this.vm) {
      return
    }
    this.vm.hide()
    this.tpl = null
  }
}

export default Loading
