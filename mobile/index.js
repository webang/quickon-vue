// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import App from './App'
// import router from './router'
import parse from 'url-parse'
import apis from './apis'
import './styles/base.css'

Vue.config.productionTip = false

let pageData = {}
let vNodeList = []

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
  const { pageId } = parse(window.location.href, true).query
  return new Promise((resolve, reject) => {
    apis.getPageDetails(pageId).then(res => {
      const data = res.data.data
      document.title = data.title
      if (data.content) {
        document.getElementsByName('keywords')[0].content = data.content
      }
      if (data.description) {
        document.getElementsByName('description')[0].content =
          data.description
      }
      data.widget = JSON.parse(data.widget)
      pageData = data
      myRender(pageData.widget || [])
      resolve(pageData.widget)
    })
  })
}

/* eslint-disable no-new */
getModules().then(modulesArray => {
  require.ensure([], function(require) {
    new Vue({
      el: '#app',
      render: function(createElement) {
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
