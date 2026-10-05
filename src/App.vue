<template>
  <div id="app" :class="['app-layout', { 'dark-theme': isDarkMode }]">
    <!-- Barra de navegación -->
    <Header :dark-mode="isDarkMode" @toggle-theme="handleToggleTheme" />

    <!-- Contenido principal -->
    <main class="main-content">
      <div class="content-wrapper">
        <!-- Banner de catálogo -->
        <section class="hero-section">
          <div class="hero-badge">Colección 2026</div>
          <h1 class="hero-title">Catálogo de Productos</h1>
          <p class="hero-subtitle">
            Descubre nuestra selección de artículos en tecnología, joyería y moda.
            Explora las diferentes categorías, filtra en tiempo real y guarda tus preferidos en tu lista de favoritos.
          </p>
        </section>

        <!-- Lista de productos -->
        <ProductList />
      </div>
    </main>

    <!-- Pie de página -->
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue';
import ProductList from './components/ProductList.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    Header,
    ProductList,
    Footer
  },
  data() {
    return {
      isDarkMode: false
    };
  },
  created() {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme_mode');
      if (savedTheme === 'dark') {
        this.isDarkMode = true;
        this.applyTheme(true);
      } else if (!savedTheme && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.isDarkMode = true;
        this.applyTheme(true);
      }
    }
  },
  mounted() {
    this.applyTheme(this.isDarkMode);
  },
  methods: {
    handleToggleTheme(val) {
      this.isDarkMode = val;
      this.applyTheme(val);
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme_mode', val ? 'dark' : 'light');
      }
    },
    applyTheme(isDark) {
      if (typeof document !== 'undefined') {
        const root = document.documentElement;
        if (isDark) {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      }
    }
  }
};
</script>

<style>
/* Estilos globales */
*,
*::before,
*::after {
  box-sizing: border-box;
}

:root {
  --color-bg-page: #fbf8f5;
  --color-surface: #ffffff;
  --color-text-main: #3e2723;
  --color-text-title: #4a2822;
  --color-text-muted: #6d4c41;
  --color-text-subtle: #8d6e63;
  --color-border: #eedfd5;
  --color-border-hover: #d7ccc8;
  --color-primary: #b76e79;
  --color-primary-hover: #a25c67;
  --color-primary-light: #f7ede8;
  --color-secondary-btn: #726266;
  --color-secondary-btn-hover: #5a4d51;
  --color-hero-bg: #4a2822;
  --color-shadow: 0 4px 20px rgba(74, 40, 34, 0.06);
}

html.dark {
  --color-bg-page: #1a1716;
  --color-surface: #272322;
  --color-text-main: #f5ece8;
  --color-text-title: #fdf5f2;
  --color-text-muted: #d0c0ba;
  --color-text-subtle: #a89892;
  --color-border: #3d3533;
  --color-border-hover: #544946;
  --color-primary: #c9828d;
  --color-primary-hover: #d896a0;
  --color-primary-light: #36282a;
  --color-secondary-btn: #8a7a7e;
  --color-secondary-btn-hover: #a09094;
  --color-hero-bg: #2d1916;
  --color-shadow: 0 4px 24px rgba(0, 0, 0, 0.35);
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--color-bg-page);
  color: var(--color-text-main);
  line-height: 1.5;
  transition: background-color 0.25s ease, color 0.25s ease;
}

.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1 0 auto;
  padding: 1.75rem 1rem 3rem;
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

.hero-section {
  background: linear-gradient(135deg, var(--color-hero-bg) 0%, #683830 100%);
  border-radius: 18px;
  padding: 3rem 2rem;
  text-align: center;
  box-shadow: var(--color-shadow);
  margin-bottom: 2rem;
  transition: background-color 0.25s ease;
}

.hero-badge {
  display: inline-block;
  background-color: rgba(255, 255, 255, 0.16);
  color: #f7deda;
  font-size: 0.95rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 0.35rem 1.1rem;
  border-radius: 20px;
  margin-bottom: 1.25rem;
}

.hero-title {
  font-size: 2.6rem;
  font-weight: 800;
  margin: 0 0 1rem;
  letter-spacing: -0.02em;
  color: #ffffff;
}

.hero-subtitle {
  font-size: 1.1rem;
  color: #eedcd7;
  max-width: 680px;
  margin: 0 auto;
  line-height: 1.65;
}

/* Modal de detalle de producto */
.quick-dialog {
  max-width: 600px !important;
  width: 90% !important;
  border-radius: 16px !important;
  overflow: hidden;
}

.quick-dialog .el-dialog__header {
  padding: 1.5rem 2rem 0 !important;
  margin-right: 0 !important;
}

.quick-dialog .el-dialog__body {
  padding: 2rem !important;
}

.category-tag {
  max-width: fit-content !important;
}

@media (max-width: 600px) {
  .hero-section {
    padding: 2.2rem 1.25rem;
  }
  .hero-title {
    font-size: 1.8rem;
  }
  .hero-subtitle {
    font-size: 0.95rem;
  }
  .quick-dialog .el-dialog__body {
    padding: 1.25rem !important;
  }
}
</style>
