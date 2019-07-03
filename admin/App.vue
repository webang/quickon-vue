<template>
  <div id="app">
    <router-view></router-view>
    <!-- <Login /> -->
  </div>
</template>

<script>
import Login from './components/login';
export default {
  name: 'App',
  components: {
    Login
  }
};
</script>