<template>
  <popup v-model="visible" class='loading' get-container="body" :close-on-click-overlay='false'>
    <div class='wrap'>
      <loading size="24px" vertical  color="#1989fa">加载中</loading>
    </div>
  </popup>
</template>
<script>
import { popup, loading } from 'vant'

export default {
  data () {
    return {
      visible: false
    }
  },

  components: {
    popup,
    loading
  },

  methods: {
    show () {
      this.visible = true
    },

    hide () {
      this.visible = false
    }
  }
}

</script>
<style scoped lang='less'>
  @import './index.less';
</style>
