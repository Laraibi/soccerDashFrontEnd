<template>
  <nav-bar></nav-bar>
  <router-view />
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
