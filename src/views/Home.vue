<template>
  <div class="container">
    <div class="row">
      <div class="col-3">
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
      </div>
      <div class="col-9">
        <div class="row justify-content-center">
          <datepicker
            class="width-50"
            v-model="selecteDate"
            :enableTimePicker="false"
            autoApply
            format="Y-MM-dd"
          />
        </div>
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
            <tr v-for="(match, index) in filtredMatchs" :key="index">
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
                    @click="setProno(match.id, '1', match.mise)"
                  >
                    1</button
                  ><button
                    :class="
                      pronoOfMatch(match.id) && pronoOfMatch(match.id) == 'x'
                        ? 'btn-success'
                        : 'btn-secondary'
                    "
                    class="btn"
                    @click="setProno(match.id, 'x', match.mise)"
                  >
                    x</button
                  ><button
                    :class="
                      pronoOfMatch(match.id) && pronoOfMatch(match.id) == '2'
                        ? 'btn-success'
                        : 'btn-secondary'
                    "
                    class="btn"
                    @click="setProno(match.id, '2', match.mise)"
                  >
                    2
                  </button>
                  <input
                    type="text"
                    class="form-contron:text"
                    v-model="match.mise"
                  />
                </div>
              </td>
              <td>{{ match.pronos_count }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from "vuex";
import Datepicker from "vue3-date-time-picker";
let moment = require("moment");

export default {
  name: "Home",
  components: {
    Datepicker,
  },
  data() {
    return {
      selectedCompetitionId: -1,
      selecteDate: Date(),
      searchLeague: "",
    };
  },
  computed: {
    ...mapGetters(["matchs", "userPronos"]),
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
      return this.matchs
        .filter((match) => match.competition.id == this.selectedCompetitionId)
        .map((match) => {
          match.mise = 0;
          return match;
        });
    },
  },
  methods: {
    changeselectedCompetitionId(id) {
      this.selectedCompetitionId = id;
    },
    parsedDate(date) {
      return moment.utc(date);
    },
    setProno(matchID, prono, mise) {
      this.$store.dispatch("makeProno", {
        match_id:
          this.matchs[this.matchs.findIndex((match) => match.id == matchID)].id,
        prono: prono,
        mise: mise,
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
  watch: {
    selecteDate() {
      this.$store.dispatch("getMatchsOfSelectedDate", this.selecteDate);
    },
  },
  mounted() {
    this.$store.dispatch("getMatchsToDay");
  },
};
</script>
