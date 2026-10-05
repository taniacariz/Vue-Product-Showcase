import { createStore } from 'vuex';
import products from './modules/products';
import filters from './modules/filters';
import favoritos from './modules/favoritos';

/* Store centralizado con módulos: products, filters y favoritos */
export default createStore({
  modules: {
    products,
    productos: products,
    filters,
    filtros: filters,
    favoritos,
    favorites: favoritos
  },
  getters: {
    /* Lista filtrada y ordenada para la UI */
    filteredProducts: (state) => {
      let list = [...(state.products.items || [])];

      /* Filtro por categoría */
      const category = state.filters.selectedCategory;
      if (category && category !== 'all') {
        list = list.filter((p) => p.category && p.category.toLowerCase() === category.toLowerCase());
      }

      /* Filtro por búsqueda de texto */
      const query = (state.filters.searchQuery || '').trim().toLowerCase();
      if (query) {
        list = list.filter(
          (p) =>
            (p.title && p.title.toLowerCase().includes(query)) ||
            (p.description && p.description.toLowerCase().includes(query))
        );
      }

      /* Filtro por favoritos */
      if (state.filters.onlyFavorites) {
        const favIds = state.favoritos.items || [];
        list = list.filter((p) => favIds.includes(p.id));
      }

      /* Ordenamiento por precio o calificación */
      const sort = state.filters.sortBy;
      if (sort === 'price-asc') {
        list.sort((a, b) => Number(a.price) - Number(b.price));
      } else if (sort === 'price-desc') {
        list.sort((a, b) => Number(b.price) - Number(a.price));
      } else if (sort === 'rating') {
        list.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
      }

      return list;
    },

    /* Total de productos en el catálogo */
    totalProductsCount: (state) => (state.products.items || []).length,

    /* Total de productos filtrados */
    filteredCount: (state, getters) => getters.filteredProducts.length
  }
});
