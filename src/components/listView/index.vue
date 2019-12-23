<template>
  <section class='comp-list-view'>
    <slot></slot>
    <footer class='footer flex-center' v-if='infinite && !isEnd'>{{loadingText}}</footer>
    <footer class='footer flex-center' v-if='infinite && isEnd'>{{endText}}</footer>
  </section>
</template>

<script>
/**
 * Includes three functions, lazyload | infinite | explode
 * author: yangxi
 * email: 599321378@qq.com
 */

/**
 * <ListView
 class='activity-wrap'
 ref='listView'
 :isEnd='isEnd'
 :infinite='true'
 :onInfinite='onInfinite'
 :lazyload='true'
 :explode='true'
 :onExplode='onExplode'>
 ...
 </ListView
 *
 * this.$refs.listView.emit()
 */
import Lazyload from '@/base/Lazyload'
import Infinite from '@/base/Infinite'
import Explode from '@/base/Explode'

export default {
  props: {
    infinite: {
      type: Boolean,
      default: false
    },
    onInfinite: Function,
    isEnd: {
      type: Boolean,
      default: false
    },
    endText: {
      type: String,
      default: '到底啦！再拉就走光了'
    },
    loadingText: {
      type: String,
      default: '加载中...'
    },
    explode: {
      type: Boolean,
      default: false
    },
    onExplode: Function,
    lazyload: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      infiniteIns: null,  // 分页器实例
      lazyloadIns: null,  // 懒加载器实例
      explodeIns: null  // 曝光器实例
    }
  },

  mounted () {
    this.initInfinite()
    this.initLazyload()
    this.initExplode()
    this.$nextTick(() => {
      const dom = this.$el.querySelector('.comp-list-view')
      if (dom) {
        throw new Error('请勿使用 listView 嵌套模式，暂不支持')
      }
    })
  },

  destroyed () {
    this.infiniteIns && this.infiniteIns.destroy()
    this.lazyloadIns && this.lazyloadIns.destroy()
    this.explodeIns && this.explodeIns.destroy()
  },

  methods: {
    initInfinite () {
      if (this.infinite && this.onInfinite) {
        this.infiniteIns = new Infinite()
        this.infiniteIns.onload(this.infiniteHandler.bind(this))
      }
    },

    initLazyload () {
      if (this.lazyload) {
        this.lazyloadIns = new Lazyload({
          container: this.$el
        })
      }
    },

    initExplode () {
      if (this.explode && this.onExplode) {
        this.explodeIns = new Explode({
          container: this.$el
        })
        this.explodeIns.onEmit(this.onExplode.bind(this))
      }
    },

    // 请求下一页
    infiniteHandler () {
      if (this.isEnd) {
        return
      }
      this.onInfinite && this.onInfinite(() => {
        this.lazyloadIns && this.lazyloadIns.refresh()
        this.explodeIns && this.explodeIns.refresh()
      })
    },

    // 刷新待曝光和待加载图片的节点
    emit () {
      this.lazyloadIns && this.lazyloadIns.refresh()
      this.explodeIns && this.explodeIns.refresh()
    }
  }
}
</script>
<style scoped lang='less'>
  @import "./index.less";
</style>

