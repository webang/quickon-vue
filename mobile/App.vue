<template>
  <div id="app">
    <router-view/>
    <transition name="slide">
      <login-pop v-if="showLogin"></login-pop>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import LoginPop from './biz-components/login-pop';

export default {
  name: 'App',
  components: {
    LoginPop
  },
  computed: {
    ...mapState({
      showLogin: state => state.user.showLogin
    })
  }
};
</script>

<style lang="postcss" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s;
}

.slide-enter,
.slide-leave-to {
  transform: translate3d(0, 100%, 0);
}
</style>
