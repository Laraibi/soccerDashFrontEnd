<template>
  <nav-bar></nav-bar>
  <div class="container container-sm-fluid">
    <router-view />
  </div>
</template>
<script>
import navBar from "./components/navBar.vue";
import { mapMutations } from "vuex";
export default {
  components: {
    navBar,
  },
  data() {
    return {};
  },
  methods: {
    ...mapMutations(["setLoggedUsed"]),
  },
  created() {
    const user = localStorage.getItem("user");
    if (user) {
      this.setLoggedUsed(JSON.parse(user));
      this.$store.dispatch("loadUserPronos");
    }
  },
};
</script>

<style>
</style>
