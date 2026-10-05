<template>
  <div class="product-list-container" data-cy="product-list-container">
    <!-- Panel de filtros -->
    <div class="filter-panel panel-card">
      <div class="panel-header">
        <h2 class="panel-title">Filtros de búsqueda</h2>
        <p class="panel-subtitle">
          Encuentra artículos por palabra clave, categoría o preferencia de orden.
        </p>
      </div>

      <el-row :gutter="16" align="middle" class="filter-controls-row">
        <!-- Búsqueda por texto -->
        <el-col :xs="24" :sm="12" :md="8" class="filter-col">
          <label class="filter-label">Buscar producto:</label>
          <el-input
            v-model="searchQueryModel"
            placeholder="Ej: Mochila, Disco SSD, Camiseta..."
            clearable
            class="custom-input"
            data-cy="search-input"
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
        </el-col>

        <!-- Selector de Categoría -->
        <el-col :xs="24" :sm="12" :md="6" class="filter-col">
          <label class="filter-label">Categoría:</label>
          <el-select
            v-model="categoryModel"
            placeholder="Selecciona categoría"
            class="full-width custom-select"
            data-cy="category-select"
          >
            <el-option label="Todas las categorías" value="all" data-cy="category-option-all" />
            <el-option
              v-for="cat in allCategories"
              :key="cat"
              :label="formatCategoryLabel(cat)"
              :value="cat"
              :data-cy="`category-option-${cat.replace(/\s+/g, '-').replace(/'+/g, '')}`"
            />
          </el-select>
        </el-col>

        <!-- Ordenamiento -->
        <el-col :xs="12" :sm="12" :md="5" class="filter-col">
          <label class="filter-label">Ordenar:</label>
          <el-select
            v-model="sortByModel"
            placeholder="Ordenar por"
            class="full-width custom-select"
            data-cy="sort-select"
          >
            <el-option label="Por defecto" value="default" />
            <el-option label="Precio: Menor a Mayor" value="price-asc" />
            <el-option label="Precio: Mayor a Menor" value="price-desc" />
            <el-option label="Mejor Calificación" value="rating" />
          </el-select>
        </el-col>

        <!-- Filtro Solo Favoritos con icono SVG -->
        <el-col :xs="12" :sm="12" :md="5" class="filter-col filter-actions-col">
          <label class="filter-label">&nbsp;</label>
          <button
            type="button"
            class="btn btn-filter-fav"
            :class="{ active: onlyFavorites }"
            data-cy="only-favorites-btn"
            @click="toggleOnlyFavorites"
          >
            <svg
              class="heart-svg"
              :class="{ 'is-active': onlyFavorites }"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span>{{ onlyFavorites ? 'Ver Todos' : 'Solo Favoritos' }}</span>
          </button>
        </el-col>
      </el-row>

      <!-- Resumen de filtros -->
      <div class="filter-summary">
        <span class="catalogo-conteo" data-cy="product-count">
          Mostrando <strong>{{ filteredProducts.length }}</strong> de {{ totalProductsCount }} productos
        </span>

        <div class="summary-actions">
          <div class="active-category-chip" v-if="selectedCategory !== 'all'">
            <span class="active-tag" data-cy="active-category-tag">
              Categoría: <strong>{{ formatCategoryLabel(selectedCategory) }}</strong>
              <button type="button" class="chip-close" @click="setCategory('all')" title="Quitar filtro">×</button>
            </span>
          </div>

          <button
            v-if="hasActiveFilters"
            type="button"
            class="btn-link-restaurar"
            data-cy="reset-filters-btn"
            @click="resetFilters"
          >
            Limpiar filtros
          </button>
        </div>
      </div>
    </div>

    <!-- Estado: Carga -->
    <div v-if="isLoading" class="loading-state panel-card" data-cy="loading-indicator">
      <el-skeleton :rows="5" animated />
      <div class="loading-text">Cargando productos...</div>
    </div>

    <!-- Estado: Error -->
    <div v-else-if="errorMessage" class="error-container" data-cy="error-container">
      <div class="error-card" data-cy="error-alert">
        <div class="error-icon-box">
          <svg class="error-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>
        <div class="error-content">
          <h3 class="error-title">Error al cargar productos</h3>
          <p class="error-desc">{{ errorMessage }}</p>
        </div>
      </div>
      <div class="error-actions">
        <button
          type="button"
          class="btn btn-retry"
          @click="retryFetch"
          data-cy="retry-btn"
        >
          Reintentar conexión
        </button>
      </div>
    </div>

    <!-- Estado: Vacío -->
    <div
      v-else-if="filteredProducts.length === 0"
      class="empty-state"
      data-cy="empty-container"
    >
      <div class="empty-icon-box">
        <svg class="empty-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
          <line x1="12" y1="22.08" x2="12" y2="12"></line>
        </svg>
      </div>
      <h3>No se encontraron productos</h3>
      <p>
        No hay artículos que coincidan con los filtros aplicados.
        Prueba con otra palabra clave o restablece los filtros para ver el catálogo completo.
      </p>
      <button
        type="button"
        class="btn btn-restaurar"
        @click="resetFilters"
        data-cy="empty-reset-btn"
      >
        Ver todos los productos
      </button>
    </div>

    <!-- Catálogo de productos -->
    <div v-else class="product-grid" data-cy="products-grid">
      <el-row :gutter="20">
        <el-col
          v-for="product in filteredProducts"
          :key="product.id"
          :xs="24"
          :sm="12"
          :md="8"
          :lg="6"
          class="product-grid-col"
        >
          <ProductCard :product="product" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import { Search } from '@element-plus/icons-vue';
import ProductCard from './ProductCard.vue';

export default {
  name: 'ProductList',
  components: {
    ProductCard,
    Search
  },
  data() {
    return {
      initialFetchComplete: false
    };
  },
  computed: {
    ...mapState('products', ['loading', 'error']),
    ...mapGetters('products', ['isLoading', 'errorMessage', 'allCategories']),
    ...mapGetters('filters', ['selectedCategory', 'searchQuery', 'sortBy', 'onlyFavorites', 'hasActiveFilters']),
    ...mapGetters(['filteredProducts', 'totalProductsCount']),

    categoryModel: {
      get() {
        return this.selectedCategory;
      },
      set(val) {
        this.setCategory(val);
      }
    },
    searchQueryModel: {
      get() {
        return this.searchQuery;
      },
      set(val) {
        this.setSearchQuery(val);
      }
    },
    sortByModel: {
      get() {
        return this.sortBy;
      },
      set(val) {
        this.setSortBy(val);
      }
    }
  },
  created() {},
  async mounted() {
    if (this.$store) {
      await Promise.all([
        this.fetchProducts(),
        this.fetchCategories()
      ]);
      this.initialFetchComplete = true;
    }
  },
  methods: {
    ...mapActions('products', ['fetchProducts', 'fetchCategories', 'retryFetch']),
    ...mapActions('filters', ['setCategory', 'setSearchQuery', 'setSortBy', 'toggleOnlyFavorites', 'resetFilters']),

    formatCategoryLabel(cat) {
      if (!cat) return '';
      return cat
        .split(' ')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
    }
  }
};
</script>

<style scoped>
.product-list-container {
  width: 100%;
}

.panel-card {
  background-color: var(--color-surface, #ffffff);
  border: 1px solid var(--color-border, #eedfd5);
  border-radius: 16px;
  padding: 1.5rem 1.8rem;
  box-shadow: var(--color-shadow);
  margin-bottom: 2rem;
  transition: background-color 0.25s ease, border-color 0.25s ease;
}

.panel-title {
  margin: 0 0 0.35rem 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text-title, #4a2822);
}

.panel-subtitle {
  margin: 0 0 1.25rem 0;
  font-size: 0.95rem;
  color: var(--color-text-subtle, #8d6e63);
}

.filter-controls-row {
  margin-bottom: 0.5rem;
}

.filter-col {
  margin-bottom: 0.85rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.filter-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text-muted, #6d4c41);
}

.full-width {
  width: 100%;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  height: 40px;
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s ease;
  border: none;
  box-sizing: border-box;
}

.btn-filter-fav {
  width: 100%;
  height: 40px;
  background-color: #fcf4f0;
  color: #726266;
  border: 1px solid var(--color-border, #eedfd5);
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-filter-fav:hover {
  background-color: #f7ede8;
  color: #4a2822;
  border-color: #e5c2bc;
}

.btn-filter-fav.active {
  background-color: #f7eceb;
  border-color: #f6ccd2;
  color: #964955;
  font-weight: 700;
}

.heart-svg {
  width: 16px;
  height: 16px;
  stroke: currentColor;
  stroke-width: 2;
  fill: none;
  transition: all 0.2s ease;
}

.heart-svg.is-active {
  fill: #b76e79;
  stroke: #b76e79;
}

.filter-summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  padding-top: 1rem;
  margin-top: 0.5rem;
  border-top: 1px dashed var(--color-border-hover, #d7ccc8);
  font-size: 0.95rem;
  color: var(--color-text-muted, #6d4c41);
}

.catalogo-conteo strong {
  color: var(--color-primary, #b76e79);
  font-weight: 800;
}

.summary-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.active-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background-color: #fcf4f0;
  color: #726266;
  border: 1px solid var(--color-border, #eedfd5);
  padding: 0.25rem 0.65rem;
  border-radius: 20px;
  font-size: 0.85rem;
}

.chip-close {
  background: none;
  border: none;
  color: #a0675b;
  font-size: 1.1rem;
  line-height: 1;
  cursor: pointer;
  padding: 0 0 0 4px;
}

.chip-close:hover {
  color: #992336;
}

.btn-link-restaurar {
  background: none;
  border: none;
  color: var(--color-primary, #b76e79);
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
  transition: color 0.15s ease;
}

.btn-link-restaurar:hover {
  color: var(--color-primary-hover, #9e5863);
}

.loading-state {
  text-align: center;
  padding: 3rem 2rem;
}

.loading-text {
  margin-top: 1.5rem;
  color: var(--color-text-subtle, #8d6e63);
  font-weight: 600;
}

.error-container {
  max-width: 650px;
  margin: 2rem auto;
  text-align: center;
}

.error-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: #faecee;
  border: 1px solid #f6ccd2;
  border-radius: 12px;
  padding: 1.25rem 1.5rem;
  text-align: left;
  margin-bottom: 1.25rem;
}

.error-icon-box {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f7dbe0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.error-svg {
  width: 22px;
  height: 22px;
  stroke: #992336;
}

.error-title {
  margin: 0 0 0.25rem 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: #992336;
}

.error-desc {
  margin: 0;
  font-size: 0.95rem;
  color: #7d1a29;
}

.btn-retry {
  padding: 0.8rem 1.8rem;
  background-color: var(--color-secondary-btn, #726266);
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-retry:hover {
  background-color: var(--color-secondary-btn-hover, #5a4d51);
  transform: translateY(-1px);
}

.empty-state {
  background-color: var(--color-surface, #ffffff);
  border: 2px dashed var(--color-border-hover, #d7ccc8);
  border-radius: 14px;
  padding: 3rem 1.5rem;
  text-align: center;
  margin-bottom: 2rem;
}

.empty-icon-box {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #f5ede6;
  margin: 0 auto 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-svg {
  width: 28px;
  height: 28px;
  stroke: #726266;
}

.empty-state h3 {
  font-size: 1.25rem;
  color: var(--color-text-title, #4a2822);
  margin: 0 0 0.5rem;
  font-weight: 700;
}

.empty-state p {
  font-size: 1rem;
  color: var(--color-text-muted, #6d4c41);
  max-width: 480px;
  margin: 0 auto 1.5rem;
  line-height: 1.5;
}

.btn-restaurar {
  padding: 0.8rem 1.6rem;
  background-color: var(--color-secondary-btn, #726266);
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-restaurar:hover {
  background-color: var(--color-secondary-btn-hover, #5a4d51);
  transform: translateY(-1px);
}

.product-grid {
  width: 100%;
}

.product-grid-col {
  margin-bottom: 1.35rem;
  display: flex;
}
</style>
