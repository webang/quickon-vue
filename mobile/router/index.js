import Vue from 'vue';
import Router from 'vue-router';
import demo from '../views/demo';
import welcome from '../views/welcome';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: welcome
    },
    {
      path: '/demo',
      name: 'demo',
      component: demo
    }
  ]
});
