import { Toast } from 'vant'
import Loading from '@/components/loading'

const toast = (type, config) => {
  const handler = type ? Toast[type] : Toast
  if (typeof config === 'object') {
    handler(config)
  } else if (typeof config === 'string') {
    handler({
      message: config,
      duration: 2000
    })
  }
}

// 仅支持 string 和 object 入参
window.Toast = {
  success (config) {
    toast('success', config)
  },
  info (config) {
    toast(null, config)
  },
  fail (config) {
    toast('fail', config)
  },
  clear () {
    Toast.clear()
  }
}

window.Loading = {
  show () {
    Loading.show()
  },

  hide () {
    Loading.hide()
  }
}
