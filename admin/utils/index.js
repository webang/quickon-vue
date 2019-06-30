// import Hashids from 'hashids'

export function getUniqueKey() {
  var d = new Date().getTime()
  if (window.performance && typeof window.performance.now === 'function') {
    d += performance.now() // use high-precision timer if available
  }
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (
    c
  ) {
    var r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
  return uuid.replace(/-/g, '').substr(0, 8)
}

export function isDef(val) {
  return val !== undefined
}

export function trim(val) {
  return val.replace(/(^\s*)|(\s*$)/g, '')
}

export function getInitPageConf() {
  return {
    id: 1,
    name: '回收宝页面模板',
    desc: '年中促销',
    title: '回收宝手机回收',
    widget: [
      {
        id: getUniqueKey(),
        component: 'hsb-container',
        prop: {},
        child: [
          {
            id: getUniqueKey(),
            component: 'hsb-image',
            prop: {
              url: 'https://s1.huishoubao.com/static/oRG0Lf3l.png',
              link: 'http://www.baidu.com'
            },
            style: {}
          },
          {
            id: getUniqueKey(),
            component: 'hsb-link',
            prop: {
              url: 'https://s1.huishoubao.com/static/oRG0Lf3l.png',
              link: ''
            },
            style: {}
          }
        ]
      }
    ],
    status: 0
  }
}

export default {
  getUniqueKey,
  isDef,
  trim,
  getInitPageConf
}
