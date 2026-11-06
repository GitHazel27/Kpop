<script setup lang="ts">
import { catalogo } from '@/data/catalogo';
import { useFiltro } from '@/composables/useFiltro';
import { isRegistered } from '@/stores/session';
import { useContador } from '@/composables/useContador'

const { quantities, incrementar, decrementar } = useContador()
const { grupoSeleccionado, grupos, productosFiltrados } = useFiltro(catalogo);
</script>

<template>
  <section class="merch-page">
    <header class="merch-heading">
      <p class="eyebrow">Tienda oficial</p>
      <h1>Catálogo de merch</h1>
      <p>Encuentra artículos de tus grupos favoritos.</p>
    </header>

    <div v-if="catalogo.length" class="group-filter">
      <label for="group-filter">Filtrar por grupo</label>
      <select id="group-filter" v-model="grupoSeleccionado">
        <option value="Todos">Todos los grupos</option>
        <option v-for="grupo in grupos" :key="grupo" :value="grupo">
          {{ grupo }}
        </option>
      </select>
    </div>

    <div v-if="productosFiltrados.length" class="product-grid">
      <article v-for="producto in productosFiltrados" :key="producto.id" class="product-card">
        <div class="product-image-wrap">
          <img
            v-if="producto.image"
            class="product-image"
            :src="producto.image"
            :alt="producto.titulo"
            loading="lazy"
          >
          <div v-else class="product-image-placeholder" aria-hidden="true">K-POP MERCH</div>
          <span class="product-category">{{ producto.categoria }}</span>
        </div>
        <div class="product-info">
          <p class="product-group">{{ producto.grupo }}</p>
          <h2>{{ producto.titulo }}</h2>
          <p v-if="producto.descripcion" class="product-description">{{ producto.descripcion }}</p>
          <div class="product-purchase">
            <strong class="product-price">${{ producto.precio }}.00</strong>
            <div v-if="isRegistered" class="quantity-controls" :aria-label="`Cantidad de ${producto.titulo}`">
              <button
                class="quantity-button"
                type="button"
                :aria-label="`Restar una unidad de ${producto.titulo}`"
                :disabled="(quantities[producto.id] ?? 0) === 0"
                @click="decrementar(producto.id)"
              >
                −
              </button>
              <output class="quantity-value" aria-live="polite">
                {{ quantities[producto.id] ?? 0 }}
              </output>
              <button
                class="quantity-button"
                type="button"
                :aria-label="`Sumar una unidad de ${producto.titulo}`"
                @click="incrementar(producto.id)"
              >
                +
              </button>
            </div>
            <RouterLink v-else class="login-link" :to="{ name: 'sesion' }">
              Inicia sesión para comprar
            </RouterLink>
          </div>
        </div>
      </article>
    </div>
    <p v-else-if="catalogo.length" class="empty-catalog">
      No hay productos disponibles para este grupo.
    </p>
    <p v-else class="empty-catalog">Pronto agregaremos nuevos productos.</p>
  </section>
</template>

<style scoped>
.merch-page {
  width: min(100%, 76rem);
  min-height: 60vh;
  margin: 0 auto;
  padding: clamp(1.5rem, 4vw, 3rem) 0;
}

.merch-heading {
  margin-bottom: 2rem;
}

.eyebrow {
  margin: 0 0 0.4rem;
  color: #f42c84;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.merch-heading h1 {
  margin: 0;
  color: #171321;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 900;
  line-height: 1.1;
}

.merch-heading > p:last-child {
  margin: 0.65rem 0 0;
  color: #625a68;
}

.group-filter {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.group-filter label {
  color: #171321;
  font-weight: 700;
}

.group-filter select {
  min-width: 12rem;
  padding: 0.65rem 2rem 0.65rem 0.8rem;
  border: 1px solid #f0d7e9;
  border-radius: 0.5rem;
  background: #fff;
  color: #171321;
  font: inherit;
}

.group-filter select:focus-visible {
  outline: 3px solid #f42c84;
  outline-offset: 2px;
}

.group-filter select option {
  color: #171321;
  font-weight: 500;
}


.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 17rem), 1fr));
  gap: 1.5rem;
}

.product-card {
  overflow: hidden;
  border: 1px solid rgb(23 19 33 / 9%);
  border-radius: 1rem;
  background: #fff;
  box-shadow: 0 0.75rem 2rem rgb(23 19 33 / 10%);
}

.product-image-wrap {
  position: relative;
  height: 18rem;
  overflow: hidden;
  background: #f8eef5;
}

.product-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-image-placeholder {
  display: grid;
  width: 100%;
  height: 100%;
  place-items: center;
  background: linear-gradient(135deg, #211b30, #49304b);
  color: #f4a7df;
  font-weight: 800;
  letter-spacing: 0.12em;
}

.product-category {
  position: absolute;
  top: 0.8rem;
  left: 0.8rem;
  padding: 0.35rem 0.7rem;
  border-radius: 999px;
  background: #fff;
  color: #171321;
  font-size: 0.75rem;
  font-weight: 700;
  border: 1px solid #f0d7e9;
}

.product-info {
  padding: 1.25rem;
}

.product-group {
  margin: 0 0 0.35rem;
  color: #f42c84;
  font-size: 0.8rem;
  font-weight: 700;
}

.product-info h2 {
  margin: 0;
  color: #171321;
  font-size: 1.05rem;
  font-weight: 750;
  line-height: 1.4;
}

.product-description {
  margin: 0.6rem 0 0;
  color: #625a68;
  font-size: 0.9rem;
}

.product-purchase {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-top: 1.25rem;
}

.product-price {
  color: #171321;
  font-size: 1.15rem;
  white-space: nowrap;
}

.quantity-controls {
  display: flex;
  min-height: 2.5rem;
  align-items: center;
  gap: 0.8rem;
  padding: 0.25rem;
  border: 1px solid #f0d7e9;
  border-radius: 999px;
}

.quantity-button {
  display: grid;
  width: 2rem;
  height: 2rem;
  place-items: center;
  border: 0;
  border-radius: 50%;
  background: #f42c84;
  color: #fff;
  cursor: pointer;
  font-size: 1.25rem;
  line-height: 1;
}

.quantity-button:hover:not(:disabled) {
  background: #d91c6c;
}

.quantity-button:disabled {
  cursor: not-allowed;
  opacity: 0.45;
}

.quantity-button:focus-visible {
  outline: 3px solid #f42c84;
  outline-offset: 3px;
}

.login-link:focus-visible {
  outline: 3px solid #f42c84;
  outline-offset: 3px;
}

.quantity-value {
  min-width: 1ch;
  color: #171321;
  font-weight: 700;
  text-align: center;
}

.login-link {
  color: #a51d5b;
  font-size: 0.82rem;
  font-weight: 700;
  text-align: right;
  text-decoration-color: #f42c84;
  text-underline-offset: 3px;
}

.empty-catalog {
  padding: 2rem;
  color: #625a68;
  text-align: center;
}

@media (max-width: 480px) {
  .product-image-wrap {
    height: 15rem;
  }
}
</style>
