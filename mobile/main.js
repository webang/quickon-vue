// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import App from './App'
// import router from './router'
import parse from 'url-parse'
import './styles/base.css'

Vue.config.productionTip = false

let pageData = {}
let vNodeList = []

/**
 * 更新缓存数据
 */
const updateProp = data => {
  window.localStorage.setItem('editProps', JSON.stringify(data))
}

/**
 * 获取本地缓存数据
 */
const getProp = () => {
  let cache = window.localStorage.getItem('editProps')
  return cache
}

/**
 * 整理数据
 * @param {*} list 
 */
const myRender = list => {
  let confList = []
  const render = function (cList, list) {
    list.forEach((element, index) => {

      // 补充PX单位
      const usePxProperty = ['width', 'height', 'top', 'left']
      element.props = element.prop || {}
      element.style = element.style || {}
      Object.keys(element.style).forEach(key => {
        if (usePxProperty.includes(key) && (element.style[key].indexOf('%') === -1)) {
          element.style[key] = parseFloat(element.style[key]) + 'px'
        }
      })

      const m = {
        child: [],
        props: element.props,
        style: element.style,
        component: require('./hsb-components/' +
          element.component +
          '/index.vue').default
      }
      if (Array.isArray(element.child)) {
        render(m.child, element.child)
      }
      cList.push(m)
    })
  }
  render(confList, list)
  vNodeList = confList
}

const getModules = function () {
  const cache = getProp()
  return new Promise((resolve, reject) => {
    pageData = JSON.parse(cache)
    myRender(pageData.widget || [])
    resolve(pageData.widget)
  })
}

/* eslint-disable no-new */
getModules().then(() => {
  require.ensure([], function (require) {
    new Vue({
      el: '#app',
      render: function (createElement) {
        const getChild = () => {
          const parent = []

          const render = (parent, list) => {
            list.forEach(element => {
              const childNode = []
              if (element.child && element.child.length) {
                render(childNode, element.child)
              }
              parent.push(
                createElement(
                  element.component,
                  {
                    props: element.props,
                    style: element.style
                  },
                  childNode
                )
              )
            })
          }
          render(parent, vNodeList)
          return parent
        }
        return createElement(
          'div',
          {
            class: 'hsb-page',
            attrs: {
              id: 'root',
              'data-pageId': 'demo'
            }
          },
          getChild()
        )
      }
    })
  })
})

window.addEventListener(
  'message',
  () => {
    if (event.data.type === 'reload') {
      window.location.reload()
    }
    if (event.data.type === 'update') {
      updateProp(event.data.payload)
      window.location.reload()
    }
  },
  false
)
