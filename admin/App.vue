<template>
  <div id="app">
    <router-view></router-view>
    <Login v-if="showLogin"/>
  </div>
</template>

<script>
import Login from './components/login';
export default {
  name: 'App',
  components: {
    Login
  },
  computed: {
    showLogin () {
      return this.$store.state.user.showLogin
    }
  }
};
</script>