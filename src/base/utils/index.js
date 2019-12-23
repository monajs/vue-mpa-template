/**
 * reduce emit frequency
 * @param fn
 * @param throttleInterval
 * @returns {*}
 */

export const throttle = (fn, throttleInterval = 200) => {
  let flag = true
  return (...args) => {
    if (!flag) {
      return
    }
    flag = false
    setTimeout(() => {
      fn(...args)
      flag = true
    }, throttleInterval)
  }
}
