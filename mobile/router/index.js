import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: () => import('../views/welcome')
    },
    {
      path: '/demo',
      name: 'demo',
      component: () => import('../views/demo')
    },
    {
      path: '/article',
      name: 'article',
      component: () => import('../views/article')
    },
    {
      path: '/page/:pageId',
      name: 'page',
      component: () => import('../views/page')
    }
  ]
});
