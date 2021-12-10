import axios from "axios";
import { createStore } from "vuex";

export default createStore({
  state: {
    matchToDay: [],
    pronos: [],
    user: {},
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
    setLoggedUsed(state, user) {
      state.user = user;
    },
  },
  actions: {
    getMatchsToDay({ commit }) {
      axios.get("http://localhost:8000/api/matchsToDay").then((response) => {
        commit("setMaths", response.data);
      });
    },
    getMatchsOfSelectedDate({ commit,state }, date) {
      axios
        .post(
          "http://localhost:8000/api/matchsInDay",
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
    setProno({ commit }, prono) {
      commit("setProno", prono);
    },
    register({ commit }, credentials) {
      axios
        .post("http://localhost:8000/api/signup", { ...credentials })
        .then((response) => {
          commit("setLoggedUsed", response.data);
        });
    },
    login({ commit }, credentials) {
      axios
        .post("http://localhost:8000/api/signin", { ...credentials })
        .then((response) => {
          commit("setLoggedUsed", response.data);
        });
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
