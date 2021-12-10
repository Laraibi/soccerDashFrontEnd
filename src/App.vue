<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <div class="row">
    <div class="col-3">
      <input placeholder="name" type="text" v-model="name" />
    </div>
    <div class="col-3">
      <input placeholder="email" type="text" v-model="email" />
    </div>
    <div class="col-3">
      <input placeholder="password" type="password" v-model="password" />
    </div>
    <div class="col-3">
      <button class="btn btn-success" @click="login">login</button>
      <button class="btn btn-success" @click="register">register</button>
    </div>
  </div>
  <router-view />
</template>
<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      this.$store.dispatch("login", {
        email: this.email,
        name: this.name,
        password: this.password,
      });
    },
    register() {
      this.$store.dispatch("register", {
        email: this.email,
        name: this.name,
        password: this.password,
      });
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
