// store/index.js
import { createStore } from 'vuex';
import auth from './auth';
import searchHistory from './searchHistory';

export default createStore({
  modules: {
    auth,
    searchHistory
  }
});
