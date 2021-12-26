<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Pronostics</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li v-if="loggedUser.user != undefined" class="nav-item">
            <router-link class="nav-link" to="/selfPronos"
              >Mes Pronos</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/importJson"
              >Import Json</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/ranking"
              >Classement</router-link
            >
          </li>
        </ul>
        <form v-if="loggedUser.user == undefined" class="d-flex">
          <input
            class="form-control me-2"
            placeholder="name (regiter)"
            type="text"
            v-model="name"
          />
          <input
            class="form-control me-2"
            placeholder="email"
            type="text"
            v-model="email"
          />
          <input
            class="form-control me-2"
            placeholder="password"
            type="password"
            v-model="password"
          />

          <button
            v-if="name.length == 0"
            class="btn btn-outline-success"
            @click.prevent="login"
          >
            Login
          </button>
          <button
            v-else
            class="btn btn-outline-success"
            @click.prevent="register"
          >
            Register
          </button>
        </form>
        <div v-else>
          Solde : {{ loggedUser.user.solde }} User :
          {{ loggedUser.user.name }}
          <button class="btn btn-outline-success" @click.prevent="logout">
            Logout
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "navBar",
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
    logout() {
      this.$store.dispatch("logout");
    },
  },
  computed: {
    ...mapGetters(["loggedUser"]),
  },
};
</script>

<style>
</style>