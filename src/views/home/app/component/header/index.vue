<template>
  <div class="comp-header flex-center theme-default" :class='{"theme-transparent": transparent}'>
    <div class='left flex-center' @click='back'>
      <Icon name='arrow-left'></Icon>
    </div>
    <div class='flex-1 title text-ellipsis'>{{titleForShow || '返利'}}</div>
    <div class='right'></div>
  </div>
</template>
<script>
import { Icon } from 'vant'

export default {
  props: {
    title: '',
    transparent: {
      type: Boolean,
      default: false
    }
  },

  watch: {
    title (to) {
      this.titleForShow = to
    }
  },

  data () {
    return {
      titleForShow: ''
    }
  },

  components: {
    Icon
  },

  created () {
    this.titleForShow = this.title
    window.Header = {
      setTitle: (title) => {
        this.$nextTick(() => {
          this.titleForShow = title
        })
      }
    }
  },

  methods: {
    back () {
      const { backHandler } = this.$route.meta
      if (backHandler) {
        backHandler()
      } else {
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style scoped lang='less'>
  @import "./index.less";
</style>
