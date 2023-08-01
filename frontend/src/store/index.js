import { createStore } from "vuex";
import Cookies from "js-cookie";

const searchHistoryCookie = Cookies.get("searchHistory");
const searchHistoryInitialState = searchHistoryCookie
  ? JSON.parse(searchHistoryCookie)
  : [];

export default createStore({
  state: {
    searchHistory: searchHistoryInitialState,
  },
  mutations: {
    addSearch(state, searchTerm) {
      const index = state.searchHistory.indexOf(searchTerm);
      if (index !== -1) {
        state.searchHistory.splice(index, 1);
      }
      state.searchHistory.push(searchTerm);
      if (state.searchHistory.length > 40) {
        state.searchHistory.shift();
      }
      Cookies.set("searchHistory", JSON.stringify(state.searchHistory), {
        expires: 30,
      });
    },
  },

  actions: {
  },
  getters: {
  },
});
