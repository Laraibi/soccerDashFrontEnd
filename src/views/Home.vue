<template>
  <div class="container">
    <div class="row">
      <div class="col-6">
        <ul>
          <li v-for="(competition, index) in competitions" :key="index">
            <a href="#" @click="changeselectedCompetitionId(competition.id)">{{
              competition.name
            }}</a>
          </li>
        </ul>
      </div>
      <div class="col-6">
        <ul>
          <li v-for="(match, index) in filtredMatchs" :key="index">
            {{ match.home_team.name }} Vs {{ match.away_team.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      selectedCompetitionId: -1,
    };
  },
  computed: {
    ...mapGetters(["matchs"]),
    competitions() {
      let allCompetitions = [];
      this.matchs.forEach((match) => {
        if (allCompetitions.every((comp) => comp.id != match.competition.id)) {
          allCompetitions.push(match.competition);
        }
      });
      // return [...new Set(this.matchs.map((match) => match.competition))];
      return allCompetitions;
    },
    filtredMatchs() {
      return this.matchs.filter(
        (match) => match.competition.id == this.selectedCompetitionId
      );
    },
  },
  methods: {
    changeselectedCompetitionId(id) {
      this.selectedCompetitionId = id;
    },
  },

  mounted() {
    this.$store.dispatch("getMatchsToDay");
  },
};
</script>
