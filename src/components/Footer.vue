<template>
  <footer class="app-footer" data-cy="app-footer">
    <div class="footer-container">
      <p class="footer-copy">
        Todos los derechos reservados - Tania Cariz © 2026
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      mountedAt: null
    };
  },
  mounted() {
    this.mountedAt = new Date().toISOString();
  }
};
</script>

<style scoped>
/* Pie de página */
.app-footer {
  background-color: var(--color-surface, #ffffff);
  border-top: 1px solid var(--color-border, #eedfd5);
  padding: 2rem 1rem;
  margin-top: auto;
  text-align: center;
  transition: background-color 0.25s ease, border-color 0.25s ease;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-copy {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text-muted, #6d4c41);
}
</style>
