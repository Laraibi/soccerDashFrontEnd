<template>
<div class="row">
    <table class="table">
        <thead>
            <tr>
                <td>#</td>
                <td>Match</td>
                <td>Date Time</td>
                <td>Prono</td>
                <td>Mise</td>
                <td>Opérations</td>
            </tr>
        </thead>
        <tbody>
            <tr v-for="prono,key in userPronos" :key="key">
                <td>{{key+1}}</td>
                <td>{{prono.soccer_match.home_team.name}} vs {{prono.soccer_match.away_team.name}}</td>
                <td>{{prono.soccer_match.day + ' ' + prono.soccer_match.time}}</td>
                <td>{{prono.prono}}</td>
                <td>{{prono.mise}}</td>
                <td>
                    <button class="btn btn-info">edit</button>
                    <button class="btn btn-danger" @click="cancelProno(prono.id)">cancel</button>
                </td>
            </tr>
        </tbody>
    </table>
</div>
</template>
<script>
import  { mapGetters } from "vuex";
export default {
  name: "selfPronos",
  computed: {
    ...mapGetters(["userPronos"]),
  },
  methods:{
      cancelProno(pronoID){
          this.$store.dispatch('cancelProno',pronoID);
      }
  }
};
</script>