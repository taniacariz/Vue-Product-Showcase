<template>
  <header class="navbar-header" data-cy="app-header">
    <div class="navbar-container">
      <!-- Logotipo de marca -->
      <div class="brand-section">
        <img
          :src="arbolLogo"
          alt="Logo de Vue Product Showcase"
          class="brand-icon"
        />
        <div class="brand-text">
          <h1 class="brand-name app-title" data-cy="app-title">Vue Product Showcase</h1>
        </div>
      </div>

      <!-- Acciones de cabecera -->
      <div class="header-actions">
        <!-- Simular error de API -->
        <button
          type="button"
          class="btn-nav-action btn-simulate-error"
          :class="{ active: isSimulatedErrorActive }"
          data-cy="simulate-error-btn"
          title="Probar respuesta ante error"
          @click="toggleSimulatedError"
        >
          <span>{{ isSimulatedErrorActive ? 'Quitar Error Simulado' : 'Simular Error API' }}</span>
        </button>

        <!-- Contador de favoritos -->
        <div class="favorites-badge-wrapper" data-cy="favorites-header-indicator">
          <el-badge :value="favoritesCount" :max="99" class="badge-item">
            <button
              type="button"
              class="btn-favoritos-nav"
              :class="{ 'has-favs': favoritesCount > 0, active: onlyFavorites }"
              title="Filtrar por favoritos"
              @click="handleFavoritesClick"
            >
              <svg
                class="heart-svg"
                :class="{ 'is-active': favoritesCount > 0 || onlyFavorites }"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <span class="fav-text">Favoritos</span>
            </button>
          </el-badge>
        </div>

        <!-- Selector de tema claro / oscuro -->
        <div class="theme-switch-wrapper" data-cy="theme-switch-wrapper">
          <el-switch
            v-model="isDarkMode"
            inline-prompt
            active-text="🌙"
            inactive-text="☀️"
            @change="handleThemeChange"
            data-cy="theme-switch"
          />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import arbolLogo from '@/assets/arbol-logo.svg';

export default {
  name: 'Header',
  props: {
    darkMode: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      arbolLogo,
      isDarkMode: this.darkMode
    };
  },
  watch: {
    darkMode(newVal) {
      this.isDarkMode = newVal;
    }
  },
  computed: {
    ...mapGetters('favoritos', ['favoritesCount']),
    ...mapGetters('products', ['isSimulatedErrorActive']),
    ...mapGetters('filters', ['onlyFavorites'])
  },
  mounted() {
    const savedTheme = localStorage.getItem('theme_mode');
    if (savedTheme === 'dark') {
      this.isDarkMode = true;
    }
  },
  methods: {
    ...mapActions('products', ['toggleSimulatedError']),
    ...mapActions('filters', ['toggleOnlyFavorites']),

    handleThemeChange(val) {
      this.$emit('toggle-theme', val);
    },
    handleFavoritesClick() {
      this.toggleOnlyFavorites();
    }
  }
};
</script>

<style scoped>
.navbar-header {
  background-color: var(--color-surface, #ffffff);
  border-bottom: 1px solid var(--color-border, #eedfd5);
  position: sticky;
  top: 0;
  z-index: 50;
  box-shadow: var(--color-shadow);
  transition: background-color 0.25s ease, border-color 0.25s ease;
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.9rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.brand-section {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  text-decoration: none;
  color: inherit;
}

.brand-icon {
  height: 3.2rem;
  width: auto;
  object-fit: contain;
}

.brand-text {
  display: flex;
  flex-direction: column;
}

.brand-name {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--color-text-title, #4a2822);
  letter-spacing: -0.02em;
  margin: 0;
  line-height: 1.25;
}

.brand-tagline {
  font-size: 0.75rem;
  color: #a0675b;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  flex-wrap: wrap;
}

.btn-nav-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 38px;
  padding: 0 1rem;
  font-size: 0.88rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.btn-simulate-error {
  background-color: #faecee;
  color: #992336;
  border: 1px solid #f6ccd2;
}

.btn-simulate-error:hover {
  background-color: #f7dbe0;
  color: #7d1a29;
  border-color: #f1b8c1;
  transform: translateY(-1px);
}

.btn-simulate-error.active {
  background-color: #992336;
  color: #ffffff;
  border-color: #992336;
}

.btn-favoritos-nav {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  height: 38px;
  padding: 0 0.95rem;
  background-color: #fcf4f0;
  color: #726266;
  border: 1px solid var(--color-border, #eedfd5);
  border-radius: 8px;
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-favoritos-nav:hover {
  background-color: #f7ede8;
  color: #4a2822;
  border-color: #e5c2bc;
}

.btn-favoritos-nav.active {
  background-color: #f6e8e5;
  border-color: #e5c2bc;
  color: #4a2822;
  font-weight: 700;
}

.heart-svg {
  width: 17px;
  height: 17px;
  stroke: currentColor;
  stroke-width: 2;
  fill: none;
  transition: all 0.2s ease;
}

.heart-svg.is-active {
  fill: #b76e79;
  stroke: #b76e79;
}

.fav-text {
  font-size: 0.85rem;
}

.theme-switch-wrapper {
  display: flex;
  align-items: center;
  margin-left: 0.25rem;
}

@media (max-width: 600px) {
  .navbar-container {
    flex-direction: column;
    align-items: flex-start;
  }
  .header-actions {
    width: 100%;
    justify-content: space-between;
  }
  .fav-text {
    display: none;
  }
}
</style>
