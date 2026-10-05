import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import ProductList from '@/components/ProductList.vue';

describe('ProductList.vue - Manejo de Estado de Error de API', () => {
  it('valida la respuesta visual (UI) ante un error simulado de la API mostrando alerta y botón de reintento', async () => {
    const retryFetchMock = jest.fn();

    /* Store de prueba con estado de error */
    const store = createStore({
      modules: {
        products: {
          namespaced: true,
          getters: {
            isLoading: () => false,
            errorMessage: () => 'Error simulado al obtener los productos desde la API.',
            allCategories: () => []
          },
          actions: {
            fetchProducts: jest.fn(),
            fetchCategories: jest.fn(),
            retryFetch: retryFetchMock
          }
        },
        filters: {
          namespaced: true,
          getters: {
            selectedCategory: () => 'all',
            searchQuery: () => '',
            sortBy: () => 'default',
            onlyFavorites: () => false,
            hasActiveFilters: () => false
          }
        },
        favoritos: {
          namespaced: true,
          getters: {
            isFavorite: () => () => false
          }
        }
      },
      getters: {
        filteredProducts: () => [],
        totalProductsCount: () => 0
      }
    });

    const wrapper = mount(ProductList, {
      global: {
        plugins: [store],
        stubs: {
          ProductCard: true,
          Search: true,
          'el-input': true,
          'el-select': true,
          'el-option': true,
          'el-row': true,
          'el-col': true,
          'el-skeleton': true,
          'el-empty': true,
          'el-icon': true
        }
      }
    });

    /* 1. Alerta de error en UI */
    expect(wrapper.find('[data-cy="error-container"]').exists()).toBe(true);
    expect(wrapper.find('[data-cy="error-alert"]').text()).toContain('Error simulado al obtener los productos desde la API.');

    /* 2. Botón de reintento */
    const retryBtn = wrapper.find('[data-cy="retry-btn"]');
    expect(retryBtn.exists()).toBe(true);
    expect(retryBtn.text()).toContain('Reintentar conexión');
    await retryBtn.trigger('click');
    expect(retryFetchMock).toHaveBeenCalled();

    /* 3. Cuadrícula oculta ante error */
    expect(wrapper.find('[data-cy="products-grid"]').exists()).toBe(false);
  });
});
