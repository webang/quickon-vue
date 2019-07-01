// 图片素材
const imgs = [
  'https://s1.huishoubao.com/static/oRG0Lf3l.png',
  'https://s1.huishoubao.com/static/KRp17iXH.jpg'
];

// 1004首页
const productUrl = 'https://mobile.huishoubao.com';

// 券图片
const couponUrl = 'https://s1.huishoubao.com/web/hsbh5/static/img/8.4c8ea3b.png';

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
  // 优惠券
  'hsb-coupon': {
    url: couponUrl,
    id: '0'
  },
  // 优惠券组
  'hsb-coupon-list': {
    couponList: [
      {
        id: 1,
        url: couponUrl
      },
      {
        id: 2,
        url: couponUrl
      },
      {
        id: 3,
        url: couponUrl
      },
      {
        id: 4,
        url: couponUrl
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
};
