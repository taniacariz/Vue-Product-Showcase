import { mount } from '@vue/test-utils';
import ProductCard from '@/components/ProductCard.vue';

describe('ProductCard.vue - Renderizado de Producto', () => {
  /* Datos de prueba */
  const mockProduct = {
    id: 1,
    title: 'Auriculares Inalámbricos Pro',
    price: 99.99,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e'
  };

  it('valida el renderizado correcto del componente <ProductCard>', async () => {
    const dispatchMock = jest.fn();

    /* Montaje con mocks */
    const wrapper = mount(ProductCard, {
      props: {
        product: mockProduct
      },
      global: {
        mocks: {
          $store: {
            getters: { 'favoritos/isFavorite': () => false },
            dispatch: dispatchMock
          }
        },
        stubs: {
          'el-rate': true,
          'el-dialog': true
        }
      }
    });

    /* 1. Montaje en DOM */
    expect(wrapper.exists()).toBe(true);

    /* 2. Título y precio */
    expect(wrapper.find('[data-cy="product-title"]').text()).toBe('Auriculares Inalámbricos Pro');
    expect(wrapper.find('[data-cy="product-price"]').text()).toBe('$99.99');

    /* 3. Categoría e imagen */
    expect(wrapper.find('.category-tag').text()).toBe('electronics');
    const imagen = wrapper.find('.product-image');
    expect(imagen.attributes('src')).toBe(mockProduct.image);
    expect(imagen.attributes('alt')).toBe(mockProduct.title);

    /* 4. Interacción con favoritos */
    await wrapper.find('[data-cy="favorite-btn"]').trigger('click');
    expect(dispatchMock).toHaveBeenCalledWith('favoritos/toggleFavorite', mockProduct.id);
  });
});
