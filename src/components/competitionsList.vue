<template>
  <div class="list-group">
    <input type="text" v-model="searchLeague" class="form-control" />
    <a
      v-for="(competition, index) in filtredCompetions"
      :key="index"
      href="#"
      class="list-group-item list-group-item-action"
      :class="selectedCompetitionId == competition.id ? 'active' : ''"
      aria-current="true"
      @click="changeselectedCompetitionId(competition.id)"
    >
      {{ competition.countrie.name + "-" + competition.name }}
    </a>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "competitionList",
  data() {
    return {
      selectedCompetitionId: -1,
      searchLeague: "",
    };
  },
  methods: {
    changeselectedCompetitionId(id) {
      this.selectedCompetitionId = id;
      this.$emit("changeMatchsToShow", this.filtredMatchs);
    },
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
    filtredCompetions() {
      if (this.searchLeague == "") {
        return this.competitions;
      } else {
        return this.competitions.filter((competition) =>
          competition.name
            .toLowerCase()
            .includes(this.searchLeague.toLowerCase())
        );
      }
    },
    filtredMatchs() {
      return this.matchs.filter(
        (match) => match.competition.id == this.selectedCompetitionId
      );
    },
  },
  mounted() {
    this.$store.dispatch("getMatchsToDay");
  },
};
</script>