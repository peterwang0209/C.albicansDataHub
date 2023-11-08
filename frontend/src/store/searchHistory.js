import Cookies from "js-cookie";

const searchHistoryCookie = Cookies.get("searchHistory");
const searchHistoryInitialState = searchHistoryCookie
  ? JSON.parse(searchHistoryCookie)
  : [];

export default {
  namespaced: true,
  state: {
    searchHistory: searchHistoryInitialState,
  },
  mutations: {
    addSearch(state, searchItem) {
      const index = state.searchHistory.findIndex(
        (item) => item.term === searchItem.term && item.type === searchItem.type
      );
      if (index !== -1) {
        state.searchHistory.splice(index, 1);
      }
      state.searchHistory.push(searchItem);
      if (state.searchHistory.length > 40) {
        state.searchHistory.shift();
      }
      Cookies.set("searchHistory", JSON.stringify(state.searchHistory), {
        expires: 30,
      });
    },
  },
  actions: {},
  getters: {},
};
