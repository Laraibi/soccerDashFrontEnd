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
    fillPronos(state,userPronos){
      state.pronos=userPronos
    },
    setProno(state, prono) {
      // if(state.pronos.some((settedProno)=>settedProno.match.id==prono.match.id))
      // {
      //   state.pronos.indexOf((seetedProno)=>seetedPronoprono.match.id==)
      // }
      // if(state.pronos.findIndex())
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
    updateUserSolde(state,solde){
      state.user.user.solde=solde
    }
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
    loadUserPronos({commit,state}){
      axios
      .get(
        "http://localhost:8000/api/Prono",
        {
          headers: {
            Authorization: `Bearer ${state.user.access_token}`,
          },
        }
      )
      .then((response) => {
        commit("fillPronos", response.data);
      });
    },
    makeProno({ commit,state }, prono) {
      // commit("setProno", prono);
      axios
      .post(
        "http://localhost:8000/api/Prono",
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
          this.dispatch("loadUserPronos");
        });
    },
    logout({ commit,state }){
      axios
        .get("http://localhost:8000/api/logout",{
          headers: {
            Authorization: `Bearer ${state.user.access_token}`,
          },
        })
        .then(() => {
          commit("setLoggedUsed", {});
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
    loggedUser(state){
      return state.user
    }
  },
  modules: {},
});
