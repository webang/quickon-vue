// import Hashids from 'hashids'

export function getUniqueKey() {
  var d = new Date().getTime();
  if (window.performance && typeof window.performance.now === 'function') {
    d += performance.now(); // use high-precision timer if available
  }
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid.replace(/-/g, '').substr(0, 8);
}

export function isDef(val) {
  return val !== undefined;
}

export function trim(val) {
  return val.replace(/(^\s*)|(\s*$)/g, '');
}

export function getInitPageConf() {
  return {
    name: '回收宝页面模板',
    title: '回收宝手机回收',
    desc: '回收宝是国内领先的二手手机数码回收平台，专注于手机回收、二手手机回收、平板回收的线上回收平台',
    widget: [
      {
        id: getUniqueKey(),
        name: 'hsb-container',
        props: {},
        child: [
          {
            id: getUniqueKey(),
            name: 'hsb-image',
            props: {
              url: 'https://s1.huishoubao.com/static/oRG0Lf3l.png',
              link: 'http://www.baidu.com'
            },
            style: {}
          },
          {
            id: getUniqueKey(),
            name: 'hsb-link',
            props: {
              url: 'https://s1.huishoubao.com/static/oRG0Lf3l.png',
              link: ''
            },
            style: {}
          }
        ]
      }
    ],
    status: 0
  };
}

export default {
  getUniqueKey,
  isDef,
  trim,
  getInitPageConf
};
