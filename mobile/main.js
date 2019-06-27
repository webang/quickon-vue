// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import App from './App'
// import router from './router'
import axios from 'axios'
import './styles/base.css'

Vue.config.productionTip = false

let pageData = {
  widget: []
}

let app

/**
 * 更新缓存数据
 */
const updateProp = (data) => {
  window.localStorage.setItem('editProps', JSON.stringify(data))
}

/**
 * 获取本地缓存数据
 */
const getProp = () => {
  let cache = window.localStorage.getItem('editProps')
  return cache
}

const getModules = function() {
  const cache = getProp()
  if (cache) {
    return new Promise((resolve, reject) => {
      pageData = JSON.parse(cache)
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
    app = new Vue({
      el: '#app',
      render: function(createElement) {
        let VNodes = modules.map((module, index) => {
          return createElement(module, {
            props: pageData.widget[index].prop,
            style: pageData.widget[index].style
          })
        })
        return createElement(
          'div',
          {
            class: 'pageData',
            attrs: {
              'data-pageData': 'render'
            }
          },
          VNodes
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
