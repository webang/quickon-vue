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
      path: '/rich-text',
      name: 'rich-text',
      component: () => import('../views/rich-text')
    }
  ]
});
