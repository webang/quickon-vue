import Vue from 'vue';
import Router from 'vue-router';

import Welcome from '../views/welcome';
import PageList from '../views/page-list';
import EditPageV2 from '../views/edit-page-v2';

Vue.use(Router);

export default new Router({
  routes: [
    {
      name: 'Welcome',
      path: '/',
      component: Welcome
    },
    {
      name: 'EditPageV2',
      path: '/EditPageV2',
      component: EditPageV2
    },
    {
      name: 'PageList',
      path: '/PageList',
      component: PageList
    }
  ]
});
