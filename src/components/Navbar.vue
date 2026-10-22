<script setup lang="ts">
</script>

<template>
  <header class="site-header">
    <nav class="navbar" aria-label="Navegación principal">
      <RouterLink class="brand" to="/">K-POP</RouterLink>
      <RouterLink class="nav-link" :to="{ name: 'inicio' }">Inicio</RouterLink>
    </nav>
  </header>
</template>

<style scoped>
.site-header {
  background: #171321;
  color: #fff;
}

.navbar {
  width: 100%;
  min-height: 4.5rem;
  padding: 0 1rem;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 2rem;
}

.brand {
  color: #f4a7df;
  font-size: 1.25rem;
  font-weight: 800;
  letter-spacing: 0.08em;
}

.nav-link {
  color: #fff;
}

.brand,
.nav-link {
  text-decoration: none;
  transition: color 0.2s ease;
}

.brand:hover,
.nav-link:hover,
.nav-link.router-link-active {
  color: #f4a7df;
}

.nav-link.router-link-active {
  font-weight: 600;
}
</style>