<template>
  <ListView class="home flex-center">
    <div class='name'>home</div>
  </ListView>
</template>

<script>
import ListView from '@/components/listView'

export default {
  components: {
    ListView
  },

  data () {
    return {}
  },

  created () {
    window.Toast.info('pandora vue mpa!')
    // 这是一个 mock 请求，可以前往src/mock文件夹下开启 mock
    window.newApi.get('/newapi/yangxitest')
  },

  methods: {
    goTo () {}
  }
}
</script>
<style scoped lang='less'>
  @import './index.less';
</style>
