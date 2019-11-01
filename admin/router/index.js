import Vue from 'vue';
import Router from 'vue-router';

import Login from '../views/login';
import Welcome from '../views/welcome';
import PageList from '../views/page-list';
import PageEditProps from '../views/page-edit-props';
import ArticleList from '../views/article-list';
import ArticleEdit from '../views/article-edit';

Vue.use(Router);

export default new Router({
  routes: [
    {
      name: 'Welcome',
      path: '/',
      component: Welcome
    },
    {
      name: 'Login',
      path: '/Login',
      component: Login
    },
    {
      name: 'EditPageV2',
      path: '/EditPageV2',
      component: PageEditProps
    },
    {
      name: 'PageList',
      path: '/PageList',
      component: PageList
    },
    {
      name: 'RichTextList',
      path: '/RichTextList',
      component: ArticleList
    },
    {
      name: 'ue',
      path: '/ue',
      component: ArticleEdit
    }
  ]
});
