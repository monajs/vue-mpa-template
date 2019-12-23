/**
 * explode
 * author: yangxi
 * email: 599321378@qq.com
 * new Explode(config)
 * config.container  |  container.  | default: document
 */

/**
 this.explode = new Explode()
 this.explode.onEmit = (prams) => {
  console.log(params)
 }
 this.explode.refresh()
 this.explode.destroy()
 */

import position from '@monajs/position'
import { throttle } from '../utils'

// the attribute that save track info.
const ATTR_IMAGE_URL = 'data-explode'
// the explode node's className
const CLASSNAME = 'm2-explode'

export default class Explode {
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

  // emit handler
  onEmit (fn) {
    this._onloadHandler = fn
  }

  _scrollHandler () {
    if (this._list.length === 0) {
      return
    }
    this._list.forEach((el) => {
      if (this._optionHandler(el)) {
        const params = el.getAttribute(ATTR_IMAGE_URL)
        if (params) {
          this._onloadHandler && this._onloadHandler(this._getParams(params))
          el.removeAttribute(ATTR_IMAGE_URL)
          // this._list.splice(index, 1)
        }
      }
    })
  }

  _getParams (params) {
    let res = {}
    try {
      res = JSON.parse(params)
    } catch (e) {
      console.log(e)
    }
    return res
  }

  _optionHandler (el) {
    const { isInViewport } = position(el)
    return isInViewport
  }

  _config = {}
  _container = null
  _list = []
  _onloadHandler = null

  _getExplodeList () {
    return Array.from(this._container.querySelectorAll(`.${CLASSNAME}[${ATTR_IMAGE_URL}]`)) || []
  }

  refresh () {
    setTimeout(() => {
      this._list = this._getExplodeList()
      this._scrollHandler()
    }, 50)
  }

  destroy () {
    window.removeEventListener('scroll', this._scrollCtrl, false)
  }
}
