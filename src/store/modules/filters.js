/* Módulo de filtros: categoría, búsqueda y ordenamiento */
const state = () => ({
  selectedCategory: 'all',
  searchQuery: '',
  sortBy: 'default',
  onlyFavorites: false
});

const mutations = {
  SET_CATEGORY(state, category) {
    state.selectedCategory = category;
  },
  SET_SEARCH_QUERY(state, query) {
    state.searchQuery = query;
  },
  SET_SORT_BY(state, sortBy) {
    state.sortBy = sortBy;
  },
  SET_ONLY_FAVORITES(state, value) {
    state.onlyFavorites = value;
  },
  RESET_FILTERS(state) {
    state.selectedCategory = 'all';
    state.searchQuery = '';
    state.sortBy = 'default';
    state.onlyFavorites = false;
  }
};

const actions = {
  setCategory({ commit }, category) {
    commit('SET_CATEGORY', category);
  },
  setSearchQuery({ commit }, query) {
    commit('SET_SEARCH_QUERY', query);
  },
  setSortBy({ commit }, sortBy) {
    commit('SET_SORT_BY', sortBy);
  },
  toggleOnlyFavorites({ commit, state }) {
    commit('SET_ONLY_FAVORITES', !state.onlyFavorites);
  },
  resetFilters({ commit }) {
    commit('RESET_FILTERS');
  }
};

const getters = {
  selectedCategory: (state) => state.selectedCategory,
  searchQuery: (state) => state.searchQuery,
  sortBy: (state) => state.sortBy,
  onlyFavorites: (state) => state.onlyFavorites,
  hasActiveFilters: (state) => {
    return state.selectedCategory !== 'all' ||
      state.searchQuery.trim() !== '' ||
      state.sortBy !== 'default' ||
      state.onlyFavorites;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
