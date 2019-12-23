<template>
  <div class='app-wrap' :class='{"show-header": showHeader}'>
    <Header :title='title' v-if='showHeader'></Header>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import Header from './component/header/index.vue'

export default {
  watch: {
    $route (to) {
      window.Toast.clear()
      window.Loading.hide()
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
      const meta = to.meta || {}
      this.title = document.title = meta.title || '宝宝树'
      const { showHeader } = meta

      // 控制头部
      this.showHeader = showHeader
    }
  },

  components: {
    Header
  },
  data () {
    return {
      title: '',
      showHeader: this.$route.meta.showHeader
    }
  },

  created () {
    this.title = document.title = this.$route.meta.title || '宝宝树'
  }
}
</script>

<style lang="less" scoped>
  @import "./index.less";
</style>
