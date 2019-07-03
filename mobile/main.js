// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import storage from 'store';
import './styles/base.css';
import Vconsole from 'vconsole';

console.log(new Vconsole());

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
    if (event.data.type === 'setEditKey') {
      store.commit('setEditKey', storage.get('editKey'));
    }
  },
  false
);
