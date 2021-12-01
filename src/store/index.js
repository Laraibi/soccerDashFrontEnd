import axios from "axios";
import { createStore } from "vuex";

export default createStore({
  state: {
    matchToDay: [],
  },
  mutations: {
    setMatchToDay(state, matchs) {
      state.matchToDay = matchs;
    },
  },
  actions: {
    getMatchsToDay({ commit }) {
      axios.get("http://localhost:8000/api/matchsToDay").then((response) => {
        commit("setMatchToDay", response.data);
      });
    },
  },
  getters:{
    matchs(state){
      return state.matchToDay
    }
  },
  modules: {},
});
