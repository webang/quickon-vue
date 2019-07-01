// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import storage from 'store';
import './styles/base.css';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: {
    App
  },
  template: '<App />'
});

window.addEventListener(
  'message',
  event => {
    if (event.data.type === 'reload') {
      store.commit('setPageData', storage.get('editProps'));
    }
  },
  false
);
