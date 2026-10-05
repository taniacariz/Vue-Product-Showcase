/* global cy */

describe('Catálogo de Productos - Filtrado por Categoría (E2E)', () => {
  beforeEach(() => {
    // Interceptamos las peticiones REST con fixtures para garantizar determinismo y velocidad
    cy.intercept('GET', '**/products', { fixture: 'products.json' }).as('getProducts');
    cy.intercept('GET', '**/products/categories', { fixture: 'categories.json' }).as('getCategories');

    // Visitar la Single Page Application
    cy.visit('/');
    cy.wait(['@getProducts', '@getCategories']);
  });

  it('permite al usuario seleccionar una categoría y verificar que los productos en pantalla cambien dinámicamente', () => {
    // 1. Verificar carga inicial de la aplicación y catálogo completo
    cy.get('[data-cy="app-title"]').should('contain.text', 'Vue Product Showcase');
    cy.get('[data-cy="product-card"]').should('have.length', 5);
    cy.get('[data-cy="product-count"]').should('contain.text', 'Mostrando 5 de 5 productos');

    // Verificar que inicialmente conviven productos de varias categorías
    cy.get('[data-cy="product-card"][data-category="men\'s clothing"]').should('exist');
    cy.get('[data-cy="product-card"][data-category="electronics"]').should('exist');

    // 2. Interacción de usuario: Filtrar por categoría "Electronics"
    cy.get('[data-cy="category-select"]').click();
    cy.get('.el-select-dropdown__item').contains('Electronics').click();

    // 3. Verificación de cambio en la interfaz
    // El contador debe actualizarse a 2 productos
    cy.get('[data-cy="product-count"]').should('contain.text', 'Mostrando 2 de 5 productos');

    // La cuadrícula debe mostrar exactamente 2 productos
    cy.get('[data-cy="product-card"]').should('have.length', 2);

    // Todos los productos visibles deben ser de la categoría seleccionada
    cy.get('[data-cy="product-card"]').each(($card) => {
      cy.wrap($card).should('have.attr', 'data-category', 'electronics');
    });

    // Productos de otras categorías ya no deben estar en pantalla
    cy.get('[data-cy="product-card"][data-category="men\'s clothing"]').should('not.exist');
    cy.get('[data-cy="product-card"][data-category="jewelery"]').should('not.exist');

    // La etiqueta de categoría activa debe estar visible
    cy.get('[data-cy="active-category-tag"]').should('contain.text', 'Electronics');

    // 4. Restauración del filtro: El usuario limpia el filtro
    cy.get('[data-cy="reset-filters-btn"]').click();

    // El catálogo completo (5 productos) debe volver a mostrarse
    cy.get('[data-cy="product-card"]').should('have.length', 5);
    cy.get('[data-cy="product-count"]').should('contain.text', 'Mostrando 5 de 5 productos');
  });
});
