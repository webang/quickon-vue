const menu = [
  {
    title: '基础组件',
    child: [
      {
        label: '文本组件',
        name: 'h-text',
        icon: 'el-icon-edit-outline'
      },
      {
        label: '链接组件',
        name: 'h-link',
        icon: 'el-icon-view'
      },
      {
        label: '图片组件',
        name: 'h-image',
        icon: 'el-icon-picture'
      },
      {
        label: '点击热区',
        name: 'h-click-area',
        icon: 'el-icon-star-off'
      },
      {
        label: '布局容器',
        name: 'h-container',
        icon: 'el-icon-news'
      },
      {
        label: '智能多列',
        name: 'h-column',
        icon: 'el-icon-menu'
      }
    ]
  },
  // {
  //   title: '业务组件',
  //   child: [
  //     {
  //       label: '优惠券',
  //       name: 'h-coupon',
  //       icon: 'el-icon-picture'
  //     },
  //     {
  //       label: '优惠券组',
  //       name: 'h-coupon-list',
  //       icon: 'el-icon-edit-outline'
  //     },
  //     {
  //       label: '表单组件',
  //       name: 'h-form',
  //       icon: 'el-icon-message'
  //     }
  //   ]
  // },
  // {
  //   title: '交互组件',
  //   child: [
  //     {
  //       label: '图片轮播',
  //       name: 'h-banner',
  //       icon: 'el-icon-edit-outline'
  //     },
  //     {
  //       label: '倒计时',
  //       name: 'h-counter',
  //       icon: 'el-icon-time'
  //     }
  //   ]
  // }
];

const widgetLabel = {};
menu.forEach(element => {
  element.child.forEach(element => {
    widgetLabel[element.name] = element.label;
  });
});

export default {
  menu,
  widgetLabel
};
