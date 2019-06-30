// 图片素材
const imgs = [
  'https://s1.huishoubao.com/static/oRG0Lf3l.png',
  'https://s1.huishoubao.com/static/KRp17iXH.jpg'
]

const productUrl = 'https://mobile.huishoubao.com'

export default {
  // 图片
  'hsb-image': {
    url: imgs[0],
    link: productUrl
  },
  // 链接
  'hsb-link': {
    text: '立即估价',
    link: productUrl
  },
  // 按钮
  'hsb-button': {
    text: '立即估价',
    url: productUrl
  },
  // 优惠券组
  'hsb-coupon-list': {
    couponList: [
      {
        id: 1
      },
      {
        id: 2
      },
      {
        id: 3
      },
      {
        id: 4
      }
    ]
  },
  // 容器
  'hsb-container': {},
  // 点击热区
  'hsb-click-area': {
    url: '',
    link: productUrl
  }
}
