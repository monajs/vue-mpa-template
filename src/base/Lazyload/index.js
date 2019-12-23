/**
 * img lazyload.
 * author: yangxi
 * email: 599321378@qq.com
 * new Lazyload(config)
 * config.container  |  set container can help you improve performance   | default: document
 * config.marginY  |  the distance from target node to viewport  | default: 300
 * config.placeholder  |  default img  | default: PLACEHOLDER
 */

/**
 this.lazyload = new Lazyload()
 this.lazyload.refresh()
 this.lazyload.destroy()
 */

import position from '@monajs/position'
import { throttle } from '../utils'

// attribute to save image src
const ATTR_IMAGE_URL = 'data-src'
// img's className
const CLASSNAME = 'm2-lazyload'
// default distance from target node to viewport
const MARGINY = 200
// default img
const PLACEHOLDER = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='

export default class Lazyload {
  // static placeholder = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='
  constructor (props = {}) {
    this._config = props
    const { container } = this._config
    if (!container) {
      this._container = document
    } else if (typeof container === 'string') {
      this._container = document.querySelector(container)
    } else if (container instanceof HTMLElement) {
      this._container = container
    }
    // in order to get exact rect data.
    // first emit.
    this.refresh()

    this._href = location.href

    this._scrollCtrl = throttle(() => {
      if (this._href !== location.href) {
        return
      }
      if (this._list.length === 0) {
        return
      }
      this._scrollHandler()
    })

    window.addEventListener('scroll', this._scrollCtrl, false)
  }

  _scrollHandler () {
    if (this._list.length === 0) {
      return
    }
    this._list.forEach((el) => {
      if (this._optionHandler(el)) {
        const source = el.getAttribute(ATTR_IMAGE_URL)
        if (source) {
          el.src = source
          el.removeAttribute(ATTR_IMAGE_URL)
          // this._list.splice(index, 1)
        }
      }
    })
  }

  _optionHandler (el) {
    const { marginY = MARGINY } = this._config
    const { bottomToTop, topToBottom, isInViewport } = position(el)
    if (isInViewport) {
      return true
    }
    const calcY = (bottomToTop + marginY) * (topToBottom + marginY) <= 0 || (topToBottom - marginY) * (bottomToTop - marginY) <= 0
    // TODO x轴的
    const calcX = true
    return calcY && calcX
  }

  _config = {}
  _container = null
  _list = []

  _getImgList () {
    const { placeholder = PLACEHOLDER } = this._config
    const list = Array.from(this._container.querySelectorAll(`img.${CLASSNAME}[${ATTR_IMAGE_URL}]`)) || []
    console.time('为 img 节点赋值耗时：')
    list.forEach((v) => {
      if (!v.getAttribute('src')) {
        v.src = placeholder
      }
    })
    console.timeEnd('为 img 节点赋值耗时：')
    return list
  }

  refresh () {
    setTimeout(() => {
      this._list = this._getImgList()
      this._scrollHandler()
    }, 50)
  }

  destroy () {
    window.removeEventListener('scroll', this._scrollCtrl, false)
  }
}
