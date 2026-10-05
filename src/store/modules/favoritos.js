/* Módulo de favoritos con persistencia en localStorage */
const STORAGE_KEY = 'vue_showcase_favoritos';

function loadStoredFavorites() {
  try {
    const raw = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function persistFavorites(items) {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  } catch (e) {
    /* Evita fallos por modo privado */
  }
}

const state = () => ({
  items: loadStoredFavorites()
});

const mutations = {
  TOGGLE_FAVORITE(state, productId) {
    const id = Number(productId);
    const index = state.items.indexOf(id);
    if (index > -1) {
      state.items.splice(index, 1);
    } else {
      state.items.push(id);
    }
    persistFavorites(state.items);
  },
  ADD_FAVORITE(state, productId) {
    const id = Number(productId);
    if (!state.items.includes(id)) {
      state.items.push(id);
      persistFavorites(state.items);
    }
  },
  REMOVE_FAVORITE(state, productId) {
    const id = Number(productId);
    const index = state.items.indexOf(id);
    if (index > -1) {
      state.items.splice(index, 1);
      persistFavorites(state.items);
    }
  },
  CLEAR_FAVORITES(state) {
    state.items = [];
    persistFavorites(state.items);
  }
};

const actions = {
  toggleFavorite({ commit }, productId) {
    commit('TOGGLE_FAVORITE', productId);
  },
  clearFavorites({ commit }) {
    commit('CLEAR_FAVORITES');
  }
};

const getters = {
  isFavorite: (state) => (id) => state.items.includes(Number(id)),
  favoriteIds: (state) => state.items,
  favoritesCount: (state) => state.items.length
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
