# Vue Product Showcase — Módulo 7 Alkemy

Aplicación SPA desarrollada para el catálogo interactivo de productos Vue Product Showcase. Permite consultar artículos en tiempo real, filtrar dinámicamente por categoría, buscar por palabra clave, gestionar productos favoritos con persistencia local y alternar entre tema claro y oscuro.

---

## 🌐 Enlaces del Proyecto

- **Sitio Web (GitHub Pages):** [https://taniacariz.github.io/Vue-Product-Showcase/](https://taniacariz.github.io/Vue-Product-Showcase/)
- **Repositorio en GitHub:** [https://github.com/taniacariz/Vue-Product-Showcase](https://github.com/taniacariz/Vue-Product-Showcase)

---

## 📄 Documentación

El proyecto incluye el informe técnico completo en formato PDF:
- [Documentación de Proyecto - Vue Product Showcase.pdf](./Documentación%20de%20Proyecto%20-%20Vue%20Product%20Showcase.pdf)

---

## 🛠 Stack Tecnológico

- **Vue.js 3** (Componentes modulares SFC y ciclo de vida)
- **Vuex 4** (Estado global centralizado con módulos: `products`, `filters` y `favoritos`)
- **Axios** (Consumo de API REST con manejo de estados de carga, error y vacío)
- **Element Plus** (Componentes de interfaz y soporte de tema claro/oscuro)
- **Jest & Vue Test Utils** (Pruebas unitarias para componentes y respuestas de UI)
- **Cypress** (Pruebas End-to-End para flujos de filtrado dinámico)
- **Vue CLI 5** (`@vue/cli-service`)

---

## 🚀 Instalación y Ejecución

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run serve
```

La aplicación se ejecutará en: `http://localhost:8080/` (o puerto disponible asignado)

### Comandos de Testing

```bash
# Ejecutar pruebas unitarias (Jest + Vue Test Utils)
npm run test:unit

# Ejecutar pruebas End-to-End (Cypress en consola)
npm run test:e2e

# Abrir interfaz gráfica de Cypress
npm run cypress:open

# Compilar para producción
npm run build
```

---

## 📂 Estructura del Proyecto

```text
src/
├── assets/                  # Recursos gráficos y logotipo oficial
├── components/
│   ├── Header.vue           # Barra de navegación, favoritos y selector de tema
│   ├── ProductCard.vue      # Tarjeta individual reutilizable de producto
│   ├── ProductList.vue      # Barra de búsqueda, filtros por categoría y cuadrícula
│   └── Footer.vue           # Pie de página institucional limpio
├── services/
│   ├── api.js               # Cliente Axios y servicio de productos
│   └── mockData.js          # Datos de respaldo con URLs de alta disponibilidad
├── store/
│   ├── index.js             # Configuración central de Vuex y getters combinados
│   └── modules/
│       ├── products.js      # Catálogo, peticiones Axios y estados de carga/error
│       ├── filters.js       # Filtros activos, ordenamiento y búsqueda
│       └── favoritos.js     # Gestión y persistencia de favoritos en LocalStorage
├── App.vue                  # Layout base, banner de bienvenida y gestor de tema
└── main.js                  # Inicialización de la aplicación y Element Plus

tests/
├── unit/
│   ├── ProductCard.spec.js      # Prueba unitaria: renderizado correcto de tarjeta
│   └── ProductListError.spec.js # Prueba unitaria: respuesta visual ante error de API
└── e2e/
    └── filter_products.cy.js    # Prueba E2E: filtrado interactivo por categoría
```

---

**Autora:** Tania Cariz — 2026
