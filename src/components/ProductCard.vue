<template>
  <article
    class="product-card"
    data-cy="product-card"
    :data-product-id="product.id"
    :data-category="product.category"
  >
    <!-- Categoría y favoritos -->
    <header class="card-header">
      <span class="category-tag" :class="categoryClass">
        {{ product.category }}
      </span>

      <button
        type="button"
        class="favorite-btn"
        :class="{ active: isFavorite }"
        :aria-label="isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'"
        data-cy="favorite-btn"
        @click.stop="toggleFavorite"
      >
        <svg class="heart-svg" :class="{ 'is-active': isFavorite }" viewBox="0 0 24 24">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>
    </header>

    <!-- Imagen de portada -->
    <div class="card-image-box">
      <img
        :src="product.image"
        :alt="product.title"
        class="product-image"
        loading="lazy"
        @error="handleImageError"
      />
    </div>

    <!-- Información de producto -->
    <div class="card-body">
      <h3 class="product-title" :title="product.title" data-cy="product-title">
        {{ product.title }}
      </h3>

      <div class="rating-box" v-if="product.rating">
        <el-rate
          :model-value="product.rating.rate"
          disabled
          show-score
          text-color="#b76e79"
          score-template="{value}"
        />
        <span class="rating-count">({{ product.rating.count }})</span>
      </div>

      <p class="product-description">
        {{ truncatedDescription }}
      </p>
    </div>

    <!-- Precio y detalle -->
    <footer class="card-footer">
      <div class="price-box">
        <span class="price-label">Precio</span>
        <span class="product-price" data-cy="product-price">{{ formattedPrice }}</span>
      </div>

      <button
        type="button"
        class="btn-detail"
        data-cy="details-btn"
        @click="showDetails = true"
      >
        Ver detalle
      </button>
    </footer>

    <!-- Modal de vista rápida -->
    <el-dialog
      v-model="showDetails"
      :title="product.title"
      width="600px"
      class="quick-dialog"
      append-to-body
    >
      <div class="dialog-grid">
        <div class="dialog-image-box">
          <img :src="product.image" :alt="product.title" class="dialog-img" @error="handleImageError" />
        </div>
        <div class="dialog-info">
          <span class="category-tag" :class="categoryClass">{{ product.category }}</span>
          <h2 class="dialog-title">{{ product.title }}</h2>
          <p class="dialog-price">{{ formattedPrice }}</p>
          <p class="dialog-desc">{{ product.description }}</p>
          <div class="dialog-actions">
            <button
              type="button"
              class="btn-dialog-fav"
              :class="{ active: isFavorite }"
              @click="toggleFavorite"
            >
              <svg class="heart-svg" :class="{ 'is-active': isFavorite }" viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <span>{{ isFavorite ? 'En favoritos' : 'Agregar a favoritos' }}</span>
            </button>
            <button type="button" class="btn-dialog-cart" @click="handleAddToCart">
              Agregar al Carrito
            </button>
          </div>
        </div>
      </div>
    </el-dialog>
  </article>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { ElMessage } from 'element-plus';

export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showDetails: false
    };
  },
  computed: {
    ...mapGetters('favoritos', ['isFavorite']),
    isFavorite() {
      const checkFn = this.$store?.getters['favoritos/isFavorite'];
      return checkFn ? checkFn(this.product.id) : false;
    },
    formattedPrice() {
      const val = Number(this.product.price);
      return isNaN(val) ? '$0.00' : `$${val.toFixed(2)}`;
    },
    truncatedDescription() {
      const text = this.product.description || '';
      return text.length > 95 ? `${text.slice(0, 95)}...` : text;
    },
    categoryClass() {
      const raw = (this.product.category || '').toLowerCase().replace(/[^a-z0-9]/g, '-');
      return `cat-${raw}`;
    }
  },
  mounted() {
    /* Elemento montado */
    if (this.$el) {
      this.$el.setAttribute('data-mounted', 'true');
    }
  },
  methods: {
    ...mapActions('favoritos', ['toggleFavorite']),
    toggleFavorite() {
      if (this.$store) {
        this.$store.dispatch('favoritos/toggleFavorite', this.product.id);
      }
      this.$emit('favorite-toggled', {
        productId: this.product.id,
        isFavorite: !this.isFavorite
      });
    },
    handleAddToCart() {
      ElMessage.success(`¡${this.product.title.slice(0, 25)}... agregado al carrito!`);
      this.showDetails = false;
    },
    handleImageError(event) {
      event.target.src = "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300' width='300' height='300'%3E%3Crect width='300' height='300' fill='%23fbf8f5'/%3E%3Cpath d='M150 100a35 35 0 100 70 35 35 0 000-70zm-70 120h140v-10c0-25-35-35-70-35s-70 10-70 35v10z' fill='%23d7ccc8'/%3E%3Ctext x='50%25' y='88%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='13' font-weight='600' fill='%238d6e63'%3EImagen no disponible%3C/text%3E%3C/svg%3E";
    }
  }
};
</script>

<style scoped>
.product-card {
  background-color: var(--color-surface, #ffffff);
  border: 1px solid var(--color-border, #eedfd5);
  border-radius: 14px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  height: 100%;
  position: relative;
  box-shadow: 0 2px 8px rgba(74, 40, 34, 0.04);
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 24px rgba(74, 40, 34, 0.09);
  border-color: #d7ccc8;
}

/* 1. Cabecera */
.card-header {
  padding: 0.85rem 1rem 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
}

.category-tag {
  max-width: fit-content;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  background-color: #f7ede8;
  color: var(--color-primary, #b76e79);
  border: 1px solid #eedcd7;
  white-space: nowrap;
}

.favorite-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 6px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: #a89793;
  transition: transform 0.15s ease, color 0.15s ease, background-color 0.15s ease;
}

.favorite-btn:hover {
  transform: scale(1.15);
  color: var(--color-primary, #b76e79);
  background-color: #fdf3f2;
}

.favorite-btn.active {
  color: #b76e79;
}

.heart-svg {
  width: 20px;
  height: 20px;
  stroke: currentColor;
  stroke-width: 2;
  fill: none;
  transition: all 0.2s ease;
}

.heart-svg.is-active {
  fill: #b76e79;
  stroke: #b76e79;
}

/* 2. Imagen */
.card-image-box {
  width: 100%;
  height: 220px;
  background-color: var(--color-bg-page, #fbf8f5);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  border-bottom: 1px solid var(--color-border, #eedfd5);
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image {
  transform: scale(1.04);
}

/* 3. Cuerpo */
.card-body {
  padding: 1rem 1.15rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.product-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--color-text-title, #4a2822);
  margin: 0 0 0.5rem;
  line-height: 1.35;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 2.7rem;
}

.rating-box {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 0.6rem;
}

.rating-count {
  font-size: 0.8rem;
  color: var(--color-text-subtle, #8d6e63);
}

.product-description {
  font-size: 0.88rem;
  color: var(--color-text-muted, #6d4c41);
  line-height: 1.5;
  margin: 0 0 0.75rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 4. Pie */
.card-footer {
  padding: 0.85rem 1.15rem 1.1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  border-top: 1px dashed var(--color-border, #eedfd5);
}

.price-box {
  display: flex;
  flex-direction: column;
}

.price-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  color: var(--color-text-subtle, #8d6e63);
  font-weight: 600;
  letter-spacing: 0.04em;
}

.product-price {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--color-primary, #b76e79);
}

.btn-detail {
  padding: 0.5rem 0.95rem;
  background-color: var(--color-surface, #ffffff);
  color: var(--color-text-main, #3e2723);
  border: 1px solid var(--color-border, #eedfd5);
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-detail:hover {
  background-color: #f7ede8;
  border-color: #d7ccc8;
  color: var(--color-text-title, #4a2822);
}

/* Modal de detalle de producto */
.dialog-grid {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.dialog-image-box {
  width: 100%;
  height: 250px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--color-border, #eedfd5);
  background: var(--color-bg-page, #fbf8f5);
}

.dialog-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.dialog-info {
  display: flex;
  flex-direction: column;
}

.dialog-info .category-tag {
  max-width: fit-content;
  margin-bottom: 0.25rem;
}

.dialog-title {
  font-size: 1.25rem;
  color: var(--color-text-title, #4a2822);
  margin: 0.6rem 0;
  line-height: 1.4;
}

.dialog-price {
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--color-primary, #b76e79);
  margin: 0.35rem 0 0.75rem;
}

.dialog-desc {
  line-height: 1.6;
  color: var(--color-text-muted, #6d4c41);
  margin-bottom: 1.25rem;
  font-size: 0.95rem;
}

.dialog-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.btn-dialog-fav {
  padding: 0.7rem 1.2rem;
  background-color: #fcf4f0;
  color: #726266;
  border: 1px solid var(--color-border, #eedfd5);
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  transition: all 0.2s ease;
}

.btn-dialog-fav.active {
  background-color: #faecee;
  color: #992336;
  border-color: #f6ccd2;
}

.btn-dialog-cart {
  padding: 0.7rem 1.4rem;
  background-color: var(--color-secondary-btn, #726266);
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-dialog-cart:hover {
  background-color: var(--color-secondary-btn-hover, #5a4d51);
  transform: translateY(-1px);
}
</style>
