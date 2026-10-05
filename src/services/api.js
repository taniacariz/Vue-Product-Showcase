import axios from 'axios';
import { mockProducts, mockCategories } from './mockData';

const categoryImageMap = {
  electronics: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80',
  jewelery: 'https://images.unsplash.com/photo-1611591475874-8be05f4bf23d?w=500&auto=format&fit=crop&q=80',
  "men's clothing": 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=80',
  "women's clothing": 'https://images.unsplash.com/photo-1548883354-7622d03aca27?w=500&auto=format&fit=crop&q=80'
};

/* Sanea imágenes para garantizar disponibilidad */
function sanitizeProduct(product) {
  if (!product) return product;
  const mockMatch = mockProducts.find(m => m.id === product.id);
  let image = product.image;
  if (!image || image.includes('fakestoreapi.com/img')) {
    image = mockMatch ? mockMatch.image : (categoryImageMap[product.category] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80');
  }
  return {
    ...product,
    image
  };
}

/* Cliente Axios para FakeStoreAPI */
const apiClient = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

export const productService = {
  /* Obtiene la lista de productos */
  async getProducts(forceError = false) {
    if (forceError) {
      throw new Error('Error simulado al obtener los productos desde la API.');
    }

    try {
      const response = await apiClient.get('/products');
      if (Array.isArray(response.data) && response.data.length > 0) {
        return response.data.map(sanitizeProduct);
      }
      return mockProducts.map(sanitizeProduct);
    } catch (error) {
      console.warn('[ProductService] Fallback a datos mock:', error.message);
      return mockProducts.map(sanitizeProduct);
    }
  },

  /* Obtiene las categorías disponibles */
  async getCategories() {
    try {
      const response = await apiClient.get('/products/categories');
      if (Array.isArray(response.data) && response.data.length > 0) {
        return response.data;
      }
      return mockCategories;
    } catch (error) {
      console.warn('[ProductService] Fallback a categorías mock:', error.message);
      return mockCategories;
    }
  },

  /* Obtiene un producto por ID */
  async getProductById(id) {
    try {
      const response = await apiClient.get(`/products/${id}`);
      return sanitizeProduct(response.data);
    } catch (error) {
      const found = mockProducts.find(p => p.id === Number(id));
      if (found) return sanitizeProduct(found);
      throw error;
    }
  }
};

export default apiClient;
