import Vue from 'vue'
import Router from 'vue-router'
import EditPage from '../views/edit-page'
import PageList from '../views/page-list'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'EditPage',
      path: '/EditPage',
      component: EditPage
    },
    {
      name: 'PageList',
      path: '/PageList',
      component: PageList
    }
  ]
})
