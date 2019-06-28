// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import App from './App'
// import router from './router'
// import axios from 'axios'
import './styles/base.css'

Vue.config.productionTip = false

let pageData = {
  widget: []
}
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

const myRender = list => {
  let confList = []
  const render = function(cList, list) {
    list.forEach((element, index) => {
      const m = {
        child: [],
        props: element.prop || {},
        style: element.style || {},
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

const getModules = function() {
  const cache = getProp()
  if (cache) {
    return new Promise((resolve, reject) => {
      pageData = JSON.parse(cache)
      myRender(pageData.widget || [])
      resolve(pageData.widget)
    })
  }
  // return new Promise((resolve, reject) => {
  //   axios('http://localhost:7001/').then(res => {
  //     const data = res.data[0]
  //     data.widget = JSON.parse(data.widget)
  //     pageData = data
  //     window.localStorage.setItem('editProps', JSON.stringify(pageData))
  //     resolve(pageData.widget)
  //   })
  // })
}

/* eslint-disable no-new */
getModules().then(modulesArray => {
  require.ensure([], function(require) {
    let modules = []
    modulesArray.forEach(component => {
      let module = require('./hsb-components/' +
        component.component +
        '/index.vue').default
      modules.push(module)
    })
    new Vue({
      el: '#app',
      render: function(createElement) {
        let VNodes = modules.map((module, index) => {
          return createElement(module, {
            props: pageData.widget[index].prop,
            style: pageData.widget[index].style
          })
        })

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

        // getChild()

        return createElement(
          'div',
          {
            class: 'pageData',
            attrs: {
              'data-pageData': 'render'
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
