import { productService } from '@/services/api';

/* Módulo de productos: catálogo, carga y errores */
const state = () => ({
  items: [],
  categories: [],
  loading: false,
  error: null,
  simulatedError: false
});

const mutations = {
  SET_PRODUCTS(state, products) {
    state.items = products;
  },
  SET_CATEGORIES(state, categories) {
    state.categories = categories;
  },
  SET_LOADING(state, isLoading) {
    state.loading = isLoading;
  },
  SET_ERROR(state, error) {
    state.error = error;
  },
  SET_SIMULATED_ERROR(state, value) {
    state.simulatedError = value;
  }
};

const actions = {
  /* Carga los productos desde la API */
  async fetchProducts({ commit, state }) {
    commit('SET_LOADING', true);
    commit('SET_ERROR', null);

    try {
      const products = await productService.getProducts(state.simulatedError);
      commit('SET_PRODUCTS', products);

      if (Array.isArray(products) && products.length > 0 && (!state.categories || state.categories.length === 0)) {
        const dynamicCats = [...new Set(products.map(p => p.category).filter(Boolean))];
        commit('SET_CATEGORIES', dynamicCats);
      }
    } catch (err) {
      commit('SET_ERROR', err.message || 'Error al conectar con la API de productos.');
      commit('SET_PRODUCTS', []);
    } finally {
      commit('SET_LOADING', false);
    }
  },

  /* Carga las categorías disponibles para el filtro */
  async fetchCategories({ commit }) {
    try {
      const categories = await productService.getCategories();
      commit('SET_CATEGORIES', categories);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  },

  /* Alterna la simulación de error de API */
  async toggleSimulatedError({ commit, dispatch, state }) {
    const nextState = !state.simulatedError;
    commit('SET_SIMULATED_ERROR', nextState);
    if (!nextState) {
      commit('SET_ERROR', null);
    }
    await dispatch('fetchProducts');
  },

  /* Reintenta la carga de productos */
  async retryFetch({ commit, dispatch }) {
    commit('SET_SIMULATED_ERROR', false);
    commit('SET_ERROR', null);
    await dispatch('fetchProducts');
  }
};

const getters = {
  allProducts: (state) => state.items,
  isLoading: (state) => state.loading,
  errorMessage: (state) => state.error,
  allCategories: (state) => state.categories,
  hasError: (state) => !!state.error,
  isSimulatedErrorActive: (state) => state.simulatedError
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
