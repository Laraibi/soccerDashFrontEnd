import axios from "axios";
import { createStore } from "vuex";
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";
// axios.defaults.baseURL = "http://soccerDash.test/";
axios.defaults.baseURL = "http://192.168.1.6:901";

export default createStore({
  state: {
    matchToDay: [],
    pronos: [],
    user: {},
    jsonFilesAvaillable: [],
    importedJsonFiles: [],
    allUsersPronos: [],
  },
  mutations: {
    setMaths(state, matchs) {
      state.matchToDay = matchs;
    },
    fillPronos(state, userPronos) {
      state.pronos = userPronos;
    },
    setProno(state, prono) {
      let index = state.pronos.findIndex(
        (userProno) => userProno.soccer_match.id == prono.soccer_match.id
      );
      if (index == -1) {
        this.state.pronos.push(prono);
      } else {
        state.pronos[index].prono = prono.prono;
      }
    },
    setLoggedUsed(state, user) {
      state.user = user;
    },
    deleteProno(state, pronoID) {
      state.pronos = state.pronos.filter((prono) => prono.id != pronoID);
    },
    updateUserSolde(state, solde) {
      state.user.user.solde = solde;
    },
    setAvaillableFilles(state, availlableFies) {
      state.jsonFilesAvaillable = availlableFies;
    },
    addImportedFile(state, file) {
      state.importedJsonFiles.push(file);
    },
    fillUsersPronos(state, Pronos) {
      state.allUsersPronos = Pronos;
    },
  },
  actions: {
    getAvailableFiles({ commit }) {
      axios.get("api/getAvailableJsonFiles").then((response) => {
        commit("setAvaillableFilles", response.data);
      });
    },
    getMatchsToDay({ commit }) {
      axios.get("api/matchsToDay").then((response) => {
        commit("setMaths", response.data);
      });
    },
    startImport({ commit }, fileName) {
      axios
        .post("api/importJson", { fileName: fileName, Password: "thePassWord" })
        .then((response) => {
          commit("addImportedFile", {
            fileName: response.date.fileName,
            counts: response.date.counts,
          });
        });
    },
    getMatchsOfSelectedDate({ commit, state }, date) {
      axios
        .post(
          "api/matchsInDay",
          { date: date },
          {
            headers: {
              Authorization: `Bearer ${state.user.access_token}`,
            },
          }
        )
        .then((response) => {
          commit("setMaths", response.data);
        });
    },
    loadUserPronos({ commit, state }) {
      axios
        .get("api/Prono", {
          headers: {
            Authorization: `Bearer ${state.user.access_token}`,
          },
        })
        .then((response) => {
          commit("fillPronos", response.data);
        });
    },
    makeProno({ commit, state }, prono) {
      // commit("setProno", prono);
      axios
        .post(
          "api/Prono",
          { ...prono },
          {
            headers: {
              Authorization: `Bearer ${state.user.access_token}`,
            },
          }
        )
        .then((response) => {
          commit("updateUserSolde", response.data.soldeUser);
          commit("setProno", response.data.prono);
        });
    },
    cancelProno({ commit, state }, pronoID) {
      axios
        .delete("api/Prono/" + pronoID, {
          headers: { Authorization: `Bearer ${state.user.access_token}` },
        })
        .then((response) => {
          commit("updateUserSolde", response.data.soldeUser);
          commit("deleteProno", response.data.deletedPronoId);
        });
    },
    register({ commit }, credentials) {
      axios.post("api/signup", { ...credentials }).then((response) => {
        commit("setLoggedUsed", response.data);
      });
    },
    login({ commit }, credentials) {
      axios.post("api/signin", { ...credentials }).then((response) => {
        commit("setLoggedUsed", response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        this.dispatch("loadUserPronos");
      });
    },
    logout({ commit, state }) {
      axios
        .get("api/logout", {
          headers: {
            Authorization: `Bearer ${state.user.access_token}`,
          },
        })
        .then(() => {
          commit("setLoggedUsed", {});
        });
    },
    getAllUserPronos({ commit, state }) {
      axios
        .get("api/allUsersPronos", {
          headers: {
            Authorization: `Bearer ${state.user.access_token}`,
          },
        })
        .then((response) => {
          // console.log(response.data);
          commit("fillUsersPronos", response.data);
        });
    },
  },
  getters: {
    jsonFiles(state) {
      return state.jsonFilesAvaillable;
    },
    matchs(state) {
      return state.matchToDay;
    },
    userPronos(state) {
      return state.pronos;
    },
    loggedUser(state) {
      return state.user;
    },
    userPronosStats(state, getters) {
      return {
        Success: getters.userPronos.filter((prono) => prono.Result == true)
          .length,
        Failed: getters.userPronos.filter((prono) => prono.Result == false)
          .length,
        Programed: getters.userPronos.filter(
          (prono) => prono.Result == "notYet"
        ).length,
        Wait: getters.userPronos.filter(
          (prono) => prono.Result == "waitingForResult"
        ).length,
      };
    },
    allUserPronos(state) {
      return state.allUsersPronos;
    },
  },
  modules: {},
});
