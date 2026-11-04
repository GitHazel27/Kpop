<template>
  <section class="welcome">
    <div class="welcome-copy">
      <p class="eyebrow">TU ESPACIO PARA EL K-POP</p>
      <h1>El universo del <span>K-POP</span> en un solo lugar</h1>
      <p>Descubre tus grupos favoritos y mantente al día con todo lo que amas del K-pop.</p>
    </div>
    <div class="welcome-collage" aria-label="Algunos de tus grupos favoritos">
      <div class="collage-card collage-card-1" aria-label="Espacio para la imagen 1">
        <span class="collage-placeholder" aria-hidden="true">Imagen 1</span>
      </div>
      <div class="collage-card collage-card-2" aria-label="Espacio para la imagen 2">
        <span class="collage-placeholder" aria-hidden="true">Imagen 2</span>
      </div>
      <div class="collage-card collage-card-3" aria-label="Espacio para la imagen 3">
        <span class="collage-placeholder" aria-hidden="true">Imagen 3</span>
      </div>
      <span class="collage-sparkle sparkle-one" aria-hidden="true">✦</span>
      <span class="collage-sparkle sparkle-two" aria-hidden="true">✦</span>
    </div>
  </section>
  <section class="favs">
    <div class="favs-heading">
      <div>
        <h2>Mi Favs</h2>
        <p class="favs-intro">
          Descubre nuevos grupos, encuentra tu próximo favorito.
        </p>
      </div>
      <RouterLink class="more-button" :to="{ name: 'grupos' }">Ver más</RouterLink>
    </div>
    <div class="top-groups">
      <RouterLink
        v-for="grupo in topGrupos"
        :key="grupo.id"
        class="group-card"
        :to="`/grupos/${grupo.id}`"
      >
        <img
          v-if="grupo.image"
          class="group-image"
          :src="grupo.image"
          :alt="`Imagen de ${grupo.nombre}`"
          loading="lazy"
        >
        <span class="group-name">{{ grupo.nombre }}</span>
      </RouterLink>
    </div>
  </section>
  <Knews />
  <section class="merch">
    <div class="merch-heading">
      <div>
        <h2>Merch</h2>
        <p class="merch-intro">
          Encuentra el merch oficial de tus grupos favoritos.
        </p>
      </div>
      <RouterLink class="more-button" :to="{ name: 'merch' }">Ver catálogo</RouterLink>
    </div>
    <div v-if="featuredMerch.length" class="merch-grid">
      <article v-for="producto in featuredMerch" :key="producto.id" class="merch-card">
        <div class="merch-image-wrap">
          <img
            v-if="producto.image"
            :src="producto.image"
            :alt="producto.titulo"
            class="merch-image"
            loading="lazy"
          >
          <div v-else class="merch-image-placeholder" aria-hidden="true">K-POP MERCH</div>
          <span class="merch-category">{{ producto.categoria }}</span>
        </div>
        <div class="merch-card-info">
          <p class="merch-group">{{ producto.grupo }}</p>
          <h3>{{ producto.titulo }}</h3>
          <div class="merch-card-purchase">
            <strong>{{ producto.precio }}</strong>
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
            <RouterLink v-else class="merch-login-link" :to="{ name: 'sesion' }">
              Inicia sesión para comprar
            </RouterLink>
          </div>
        </div>
      </article>
    </div>
    <p v-else class="merch-empty">Pronto agregaremos nuevos productos.</p>
  </section>
</template>

<script setup lang="ts">
import {group} from '@/data/grupos';
import {catalogo} from '@/data/catalogo';
import {isRegistered} from '@/stores/session';
import Knews from '@/views/Knews.vue';
import { useContador } from '@/composables/useContador'

const topGrupos = group.slice(0, 3);
const featuredMerch = catalogo.slice(0, 4);
const { quantities, incrementar, decrementar } = useContador()
</script>

<style scoped>
.welcome {
  position: relative;
  display: grid;
  width: calc(100% + 4rem);
  min-height: 21rem;
  grid-template-columns: minmax(15rem, 0.9fr) minmax(0, 1.1fr);
  align-items: center;
  gap: 1.5rem;
  overflow: hidden;
  margin: -3rem 0 0 -2rem;
  padding: clamp(2rem, 5vw, 3.5rem);
  border: 1px solid rgb(255 255 255 / 10%);
  background: #09070c;
  color: #fff;
}

.welcome-copy {
  z-index: 1;
  max-width: 32rem;
}

.eyebrow {
  margin: 0 0 0.85rem;
  color: #f42c84;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.18em;
}

.welcome h1 {
  max-width: 12ch;
  margin: 0 0 1rem;
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 900;
  line-height: 0.98;
  text-transform: uppercase;
}

.welcome h1 span {
  color: #f42c84;
}

.welcome-copy > p:not(.eyebrow) {
  max-width: 28rem;
  margin: 0 0 1.5rem;
  color: rgb(255 255 255 / 78%);
  font-size: clamp(0.9rem, 1.4vw, 1.05rem);
  line-height: 1.6;
}

.welcome-collage {
  position: relative;
  width: 100%;
  min-height: 16rem;
}

.collage-card {
  position: absolute;
  display: grid;
  overflow: hidden;
  place-items: center;
  border: 3px solid #f42c84;
  background: #211b30;
  color: #f42c84;
  text-decoration: none;
  box-shadow: 0 0.5rem 1.5rem rgb(0 0 0 / 45%), 0 0 1rem rgb(244 44 132 / 35%);
  transform: rotate(-5deg);
  transition: transform 0.25s ease, z-index 0s;
}

.collage-card:focus-visible {
  outline: 3px solid #fff;
  outline-offset: 3px;
}

.collage-placeholder {
  font-size: 0.9rem;
  font-weight: 700;
}

.collage-card:hover {
  z-index: 2;
  transform: rotate(0) scale(1.05);
}

.collage-card img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.collage-card-1 {
  top: 8%;
  left: 3%;
  width: 48%;
  height: 53%;
}

.collage-card-2 {
  top: 0;
  right: 4%;
  width: 43%;
  height: 48%;
  transform: rotate(5deg);
}

.collage-card-3 {
  right: 13%;
  bottom: 1%;
  width: 51%;
  height: 49%;
}

.collage-sparkle {
  position: absolute;
  z-index: 1;
  color: #fff;
  text-shadow: 0 0 0.75rem #f42c84, 0 0 1.25rem #f42c84;
}

.sparkle-one {
  top: 3%;
  left: 47%;
  font-size: 2rem;
}

.sparkle-two {
  right: 3%;
  bottom: 12%;
  font-size: 1.5rem;
}

.favs {
  width: calc(100% + 4rem);
  margin-left: -2rem;
  padding: 2rem clamp(1.5rem, 5vw, 4rem) 2.5rem;
  background: #f8eef5;
}

.favs-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.75rem;
}

.favs h2 {
  margin: 0;
  color: #171321;
  font-size: clamp(2.25rem, 6vw, 3.5rem);
  font-weight: 900;
  line-height: 1.1;
}

.favs-intro {
  margin: 0.35rem 0 0;
  color: #625a68;
  font-size: 0.95rem;
  line-height: 1.5;
}

.top-groups {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(1.25rem, 3vw, 3rem);
}

.group-card {
  position: relative;
  display: flex;
  height: clamp(12rem, 18vw, 16rem);
  overflow: hidden;
  align-items: flex-end;
  border: 0;
  border-radius: 1rem;
  background: #211b30;
  color: #fff;
  text-decoration: none;
  box-shadow: 0 0.5rem 1.5rem rgb(23 19 33 / 12%);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.group-card:hover {
  transform: translateY(-0.25rem);
  box-shadow: 0 0.85rem 2rem rgb(23 19 33 / 20%);
}

.group-card:focus-visible {
  outline: 3px solid #f42c84;
  outline-offset: 3px;
}

.group-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.group-card:hover .group-image {
  transform: scale(1.04);
}

.group-name {
  z-index: 1;
  width: 100%;
  padding: 2.5rem 1rem 1.5rem;
  background: linear-gradient(transparent, rgb(15 12 22 / 88%));
  font-size: 1.2rem;
  font-weight: 700;
  text-align: center;
}

.carousel-control {
  position: absolute;
  top: 50%;
  z-index: 1;
  display: grid;
  width: 3.5rem;
  height: 3.5rem;
  place-items: center;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: #fff;
  cursor: pointer;
  font-size: 3.5rem;
  line-height: 1;
  transform: translateY(-50%);
  transition: color 0.2s ease, transform 0.2s ease;
}

.carousel-control:first-child {
  left: max(0.5rem, calc(50% - 23rem));
}

.carousel-control:last-child {
  right: max(0.5rem, calc(50% - 23rem));
}

.carousel-control:hover {
  color: #f42c84;
  transform: translateY(-50%) scale(1.08);
}

.carousel-control:focus-visible {
  outline: 2px solid #f42c84;
  outline-offset: 3px;
}

.more-button {
  display: inline-flex;
  width: fit-content;
  flex: 0 0 auto;
  align-items: center;
  padding: 0.7rem 1.5rem;
  border: 1px solid #f42c84;
  border-radius: 999px;
  background: #f42c84;
  color: #fff;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
}

.more-button:hover {
  transform: translateY(-2px);
  background: #d91c6c;
}

.more-button:focus-visible {
  outline: 3px solid #f42c84;
  outline-offset: 3px;
}

.merch {
  width: calc(100% + 4rem);
  margin-left: -2rem;
  margin-bottom: -3rem;
  padding: 2rem clamp(1.5rem, 5vw, 4rem) 2rem;
  background: #f8eef5;
}

.merch-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.merch-heading h2 {
  margin: 0;
  color: #171321;
  font-size: clamp(2.25rem, 6vw, 3.5rem);
  font-weight: 900;
  line-height: 1.1;
}

.merch-intro {
  margin: 0.35rem 0 0;
  color: #625a68;
  font-size: 0.95rem;
  line-height: 1.5;
}

.merch-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(1rem, 2vw, 1.5rem);
}

.merch-card {
  overflow: hidden;
  border-radius: 1rem;
  background: #fff;
  box-shadow: 0 0.5rem 1.5rem rgb(23 19 33 / 12%);
}

.merch-image-wrap {
  position: relative;
  height: clamp(12rem, 20vw, 17rem);
  overflow: hidden;
  background: #f8eef5;
}

.merch-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.25s ease;
}

.merch-card:hover .merch-image {
  transform: scale(1.04);
}

.merch-image-placeholder {
  display: grid;
  width: 100%;
  height: 100%;
  place-items: center;
  background: linear-gradient(135deg, #211b30, #49304b);
  color: #f42c84;
  font-weight: 800;
  letter-spacing: 0.12em;
}

.merch-category {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  padding: 0.3rem 0.65rem;
  border-radius: 999px;
  background: #fff;
  color: #171321;
  font-size: 0.75rem;
  font-weight: 700;
}

.merch-card-info {
  display: grid;
  gap: 0.4rem;
  padding: 1rem;
}

.merch-card-purchase {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-top: 0.25rem;
}

.merch-group {
  margin: 0;
  color: #f42c84;
  font-size: 0.8rem;
  font-weight: 700;
}

.merch-card-info h3 {
  margin: 0;
  color: #171321;
  font-size: 0.95rem;
  font-weight: 700;
  line-height: 1.4;
}

.merch-card-info strong {
  color: #171321;
  font-size: 1.05rem;
  white-space: nowrap;
}

.quantity-controls {
  display: flex;
  min-height: 2.5rem;
  align-items: center;
  gap: 0.55rem;
  padding: 0.25rem;
  border: 1px solid #f0d7e9;
  border-radius: 999px;
}

.quantity-button {
  display: grid;
  width: 2rem;
  height: 2rem;
  flex: 0 0 auto;
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

.quantity-button:focus-visible,
.merch-login-link:focus-visible {
  outline: 3px solid #f42c84;
  outline-offset: 3px;
}

.quantity-value {
  min-width: 1ch;
  color: #171321;
  font-weight: 700;
  text-align: center;
}

.merch-login-link {
  color: #a51d5b;
  font-size: 0.75rem;
  font-weight: 700;
  text-align: right;
  text-decoration-color: #f42c84;
  text-underline-offset: 3px;
}

.merch-empty {
  padding: 2rem;
  color: #625a68;
  text-align: center;
}

@media (max-width: 480px) {
  .welcome {
    min-height: auto;
    grid-template-columns: 1fr;
    gap: 0.75rem;
    margin-bottom: 0;
    padding: 2rem 1.25rem 1.25rem;
  }

  .welcome h1 {
    max-width: 14ch;
  }

  .welcome-collage {
    min-height: 12rem;
  }

  .favs {
    padding: 1.5rem 1rem 2rem;
  }

  .favs-heading {
    margin-bottom: 1.25rem;
  }

  .more-button {
    padding: 0.6rem 1rem;
  }

  .top-groups {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }

  .merch {
    padding: 1.5rem 1rem 1.5rem;
  }

  .merch-heading {
    align-items: flex-start;
  }

  .merch-grid {
    grid-template-columns: 1fr 1fr;
    gap: 0.85rem;
  }

  .merch-image-wrap {
    height: 11rem;
  }

  .merch-card-info {
    padding: 0.75rem;
  }

  .group-card {
    height: 13rem;
  }
}

@media (min-width: 481px) and (max-width: 900px) {
  .merch-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>