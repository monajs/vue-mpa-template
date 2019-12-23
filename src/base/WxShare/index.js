/**
 * weChat share component.
 * author: yangxi
 */

/**
 new WxShare({
  title: 'fsd',
  desc: 'fdsfds',
  link: '//www.baidu.com',
  imgUrl: 'http://pic03.babytreeimg.com/foto3/thumbs/2017/0711/25/0/600a6f8a7c6da3e30d7160_ss.jpg'
})
 */

import { ajax } from '@/lib/ajax'
import hostCfg from '@/services/config'
import { Toast } from 'vant'
import wx from 'weixin-js-sdk'
import { os } from '@/lib/utils'

const newapiHost = hostCfg['newapiHost']

export default class WxShare {
  constructor (props = {}) {
    if (!os.isInWx()) {
      return
    }
    this._config = props
    this._findTicketApi(location.href).then((res) => {
      this._wxConfig(res)
      wx.ready(() => {
        this._onMenuShareOption()
      })
    })
  }

  // 分享到各平台，参数配置
  _onMenuShareOption () {
    const params = {
      title: this._config.title,
      desc: this._config.desc,
      link: this._config.link,
      imgUrl: this._config.imgUrl,
      success () {
        // 分享成功之后的操作
      },
      fail () {}
    }
    let timelineShareParams
    // 自定义分享朋友圈
    if (this._config && this._config.timeline) {
      timelineShareParams = {
        title: this._config.timeline.title,
        desc: this._config.timeline.desc,
        link: this._config.timeline.link,
        imgUrl: this._config.timeline.imgUrl,
        success () {
          // 分享成功之后的操作
        },
        fail () {}
      }
    } else {
      timelineShareParams = params
    }
    wx.onMenuShareAppMessage(params)
    wx.onMenuShareTimeline(timelineShareParams)
    wx.onMenuShareQQ(params)
    wx.onMenuShareWeibo(params)
    wx.onMenuShareQZone(params)
  }

  // 微信配置
  _wxConfig (result) {
    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: result.appid, // 必填，公众号的唯一标识
      timestamp: result.timestamp, // 必填，生成签名的时间戳
      nonceStr: result.nonceStr, // 必填，生成签名的随机串
      signature: result.signature, // 必填，签名，见附录1
      jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    })
  }

  // 获取签名信息接口
  _findTicketApi (url) {
    return ajax.get(`${newapiHost}/mobile/weixin/ticket.htm`, {
      requestBody: {
        url,
        platformType: 5
      }
    }).then(({ data: { rescode = {}, signTO = {} } }) => {
      if (rescode.code !== '0') {
        const message = rescode.info || '获取微信签名失败'
        Toast({
          message,
          duration: 2000
        })
        throw new Error(message)
      }
      return signTO
    })
  }
}
