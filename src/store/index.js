import axios from "axios";
import { createStore } from "vuex";

export default createStore({
  state: {
    matchToDay: [],
    pronos: [],
  },
  mutations: {
    setMaths(state, matchs) {
      state.matchToDay = matchs;
    },
    setProno(state, prono) {
      // if(state.pronos.some((settedProno)=>settedProno.match.id==prono.match.id))
      // {
      //   state.pronos.indexOf((seetedProno)=>seetedPronoprono.match.id==)
      // }
      // if(state.pronos.findIndex())
      let index = state.pronos.findIndex(
        (userProno) => userProno.match.id == prono.match.id
      );
      if (index == -1) {
        this.state.pronos.push(prono);
      } else {
        state.pronos[index].prono = prono.prono;
      }
    },
  },
  actions: {
    getMatchsToDay({ commit }) {
      axios.get("http://localhost:8000/api/matchsToDay").then((response) => {
        commit("setMaths", response.data);
      });
    },
    getMatchsOfSelectedDate({ commit }, date) {
      axios
        .post("http://localhost:8000/api/matchsInDay", { date: date })
        .then((response) => {
          commit("setMaths", response.data);
        });
    },
    setProno({ commit }, prono) {
      commit("setProno", prono);
    },
  },
  getters: {
    matchs(state) {
      return state.matchToDay;
    },
    userPronos(state) {
      return state.pronos;
    },
  },
  modules: {},
});
