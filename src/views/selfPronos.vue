<template>
  <div class="row">
    <div class="row justify-content-end">
      <div class="col-3">
        <button class="btn btn-secondary w-100 text-center" @click="refresh">Refresh</button>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-3">
        <span class="w-100 badge bg-success">
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              id="checkSuccess"
              type="checkbox"
              v-model="pronoFiltres.success"
            />
            <label class="form-check-label" for="checkSuccess"
              >Réussi {{ userPronosStats.Success }}</label
            >
          </div>
        </span>
      </div>
      <div class="col-3">
        <span class="w-100 badge bg-danger">
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              id="checkFailed"
              type="checkbox"
              value="Perdus"
              v-model="pronoFiltres.failed"
            />
            <label class="form-check-label" for="checkFailed"
              >Perdus {{ userPronosStats.Failed }}</label
            >
          </div>
        </span>
      </div>
      <div class="col-3">
        <span class="w-100 badge bg-warning">
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              id="checkWait"
              type="checkbox"
              v-model="pronoFiltres.waiting"
            />
            <label class="form-check-label" for="checkWait"
              >Attente {{ userPronosStats.Wait }}</label
            >
          </div>
        </span>
      </div>
      <div class="col-3">
        <span class="w-100 badge bg-secondary">
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              id="checkPrgrammed"
              type="checkbox"
              v-model="pronoFiltres.programmed"
            />
            <label class="form-check-label" for="checkPrgrammed">
              Programés {{ userPronosStats.Programed }}</label
            >
          </div>
        </span>
      </div>
    </div>
    <div class="row mt-2">
      <table class="table table-bordered text-center table-hover">
        <thead class="table-dark">
          <tr>
            <td>#</td>
            <td>Match</td>
            <td>Score</td>
            <td>Date Time</td>
            <td>Prono</td>
            <td>Opérations</td>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(prono, key) in filtredProno"
            :key="key"
            :class="bgClassProno(prono.Result)"
          >
            <td>{{ key + 1 }}</td>
            <td>
              {{ prono.soccer_match.home_team.name }} vs
              {{ prono.soccer_match.away_team.name }}
            </td>
            <td>
              ({{ prono.soccer_match.scoreHome }}) ({{
                prono.soccer_match.scoreAway
              }})
            </td>
            <td>
              {{
                parsedDate(prono.soccer_match.day) +
                " " +
                prono.soccer_match.time
              }}
            </td>
            <td>{{ prono.prono }}</td>
            <td>
              <div v-if="prono.Result == 'notYet'" id="pronoActions">
                <button class="btn btn-info">edit</button>
                <button class="btn btn-danger" @click="cancelProno(prono.id)">
                  cancel
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
let moment = require("moment");

export default {
  name: "selfPronos",
  data() {
    return {
      pronoFiltres: {
        success: true,
        failed: true,
        programmed: true,
        waiting: true,
      },
    };
  },
  computed: {
    ...mapGetters(["userPronos", "userPronosStats"]),
    filtredArray() {
      let theArray = [];
      if (this.pronoFiltres.success == true) {
        theArray.push(true);
      }
      if (this.pronoFiltres.failed == true) {
        theArray.push(false);
      }
      if (this.pronoFiltres.programmed == true) {
        theArray.push("notYet");
      }
      if (this.pronoFiltres.waiting == true) {
        theArray.push("waitingForResult");
      }
      return theArray;
    },
    filtredProno() {
      return this.userPronos.filter((prono) =>
        this.filtredArray.includes(prono.Result)
      );
    },
  },
  methods: {
    refresh() {
      this.$store.dispatch("getAvailableFiles");
    },
    cancelProno(pronoID) {
      this.$store.dispatch("cancelProno", pronoID);
    },
    parsedDate(date) {
      return moment.utc(date).format("YYYY-MM-DD");
    },
    bgClassProno(pronoResult) {
      if (pronoResult == "notYet") {
        return "bg-secondary";
      } else {
        if (pronoResult == "waitingForResult") {
          return "bg-warning";
        }
        return pronoResult ? "bg-success" : "bg-danger";
      }
    },
  },
};
</script>