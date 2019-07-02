import Vue from 'vue';
import Router from 'vue-router';

import Welcome from '../views/welcome';
import EditPage from '../views/edit-page';
import PageList from '../views/page-list';

Vue.use(Router);

export default new Router({
  routes: [
    {
      name: 'Welcome',
      path: '/',
      component: Welcome
    },
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
});
