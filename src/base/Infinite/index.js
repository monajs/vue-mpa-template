/**
 * scroll infinite
 * author: yangxi
 * email: 599321378@qq.com
 * new Infinite(config)
 * config.emitDistance  |  bottom emit distance.  | default: 150
 */

export default class Infinite {
  constructor (props = {}) {
    this._config = props
    const { emitDistance = 150 } = this._config

    this._href = location.href

    this._scrollHandler = () => {
      if (this._href !== location.href) {
        return
      }
      const docHeight = document.body.scrollHeight
      const winHeight = document.documentElement.clientHeight
      const st = document.body.scrollTop + document.documentElement.scrollTop

      if (docHeight - winHeight - st < emitDistance) {
        this._onloadHandler && this._onloadHandler(st)
      }
    }

    window.addEventListener('scroll', this._scrollHandler, false)
  }

  _config = {}
  _onloadHandler = null

  destroy () {
    window.removeEventListener('scroll', this._scrollHandler, false)
  }

  onload (fn) {
    this._onloadHandler = fn
  }
}
