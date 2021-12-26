<template>
  <div class="container">
    <div class="row">
      <div class="col-3">
        <competition-list @changeMatchsToShow="changeMatchs" />
      </div>
      <div class="col-9">
        <div class="row justify-content-center">
          <div class="col-2">
            <button class="btn btn-secondary" @click="moveDay(-1)">
              Pervious
            </button>
          </div>
          <div class="col-8">
            <datepicker
              locale="fr-ma"
              class="width-50"
              v-model="selecteDate"
              :enableTimePicker="false"
              autoApply
              format="Y-MM-dd"
            />
          </div>
          <div class="col-2">
            <button class="btn btn-secondary" @click="moveDay(1)">Next</button>
          </div>
        </div>
        <matchs-list :matchs="matchsToShow"></matchs-list>
      </div>
    </div>
  </div>
</template>

<script>
import Datepicker from "vue3-date-time-picker";
import competitionList from "../components/competitionsList.vue";
import matchsList from "../components/matchsList.vue";

let moment = require("moment");

export default {
  name: "Home",
  components: {
    Datepicker,
    competitionList,
    matchsList,
  },
  data() {
    return {
      selecteDate: Date(),
      matchsToShow: [],
    };
  },
  methods: {
    changeMatchs(Matchs) {
      this.matchsToShow = Matchs;
    },
    moveDay(dayCount) {
      this.selecteDate = moment(this.selecteDate)
        .add(dayCount, "days")
        .format("YYYY-MM-DD");
    },
  },
  watch: {
    selecteDate() {
      this.$store.dispatch("getMatchsOfSelectedDate", this.selecteDate);
    },
  },
};
</script>
