<template>
  <div class="container">
    <table class="table table-bordered text-center">
      <thead>
        <tr>
          <td>#</td>
          <td>Username</td>
          <td>Totoal Pronos</td>
          <td>Réussis</td>
          <td>Perdus</td>
          <td>En Attente</td>
          <td>Programmés</td>
          <td>Taux Réussite</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in allUserPronosStats" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.totalPronos }}</td>
          <td>{{ user.success }}</td>
          <td>{{ user.failed }}</td>
          <td>{{ user.wait }}</td>
          <td>{{ user.Programed }}</td>
          <td>{{ parseInt(user.success / (user.success + user.failed)*100) }}%</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["allUserPronosStats"]),
  },
  created() {
    this.$store.dispatch("getAllUserPronos");
  },
};
</script>

<style>
</style>