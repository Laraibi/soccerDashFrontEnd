<template>
  <table class="table">
    <thead>
      <tr>
        <th>Domicile</th>
        <th>Extérieur</th>
        <th>Heure</th>
        <th colspan="2">Score</th>
        <th>Prono</th>
        <th>Nombre Pronostics</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(match, index) in matchs" :key="index">
        <th>{{ match.home_team.name }}</th>
        <th>{{ match.away_team.name }}</th>
        <td>{{ match.time }}</td>
        <td>
          {{
            match.scoreHome == null && match.scoreAway != null
              ? 0
              : match.scoreHome
          }}
        </td>
        <td>
          {{
            match.scoreAway == null && match.scoreHome != null
              ? 0
              : match.scoreAway
          }}
        </td>
        <td>
          <div v-if="match.time != null" id="makeProno">
            <button
              :class="
                pronoOfMatch(match.id) && pronoOfMatch(match.id) == '1'
                  ? 'btn-success'
                  : 'btn-secondary'
              "
              class="btn"
              @click="setProno(match.id, '1')"
            >
              1</button
            ><button
              :class="
                pronoOfMatch(match.id) && pronoOfMatch(match.id) == 'x'
                  ? 'btn-success'
                  : 'btn-secondary'
              "
              class="btn"
              @click="setProno(match.id, 'x')"
            >
              x</button
            ><button
              :class="
                pronoOfMatch(match.id) && pronoOfMatch(match.id) == '2'
                  ? 'btn-success'
                  : 'btn-secondary'
              "
              class="btn"
              @click="setProno(match.id, '2')"
            >
              2
            </button>
          </div>
        </td>
        <td>{{ match.pronos_count }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "matchsList",
  props: {
    matchs: {
      required: true,
    },
  },
  computed: {
    ...mapGetters(["userPronos"]),
  },
  methods: {
    setProno(matchID, prono) {
      this.$store.dispatch("makeProno", {
        match_id:
          this.matchs[this.matchs.findIndex((match) => match.id == matchID)].id,
        prono: prono,
      });
    },
    pronoOfMatch(matchID) {
      let prono = this.userPronos.find(
        (prono) => prono.soccer_match.id == matchID
      );
      if (prono != undefined) {
        return prono.prono;
      } else {
        return false;
      }
    },
  },
};
</script>

<style>
</style>