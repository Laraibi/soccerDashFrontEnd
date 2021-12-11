<template>
  <nav-bar></nav-bar>
  <div class="container">
    <router-view />
  </div>
</template>
<script>
import navBar from "./components/navBar.vue";
export default {
  components: {
    navBar,
  },
  data() {
    return {};
  },
};
</script>

<style>
</style>
