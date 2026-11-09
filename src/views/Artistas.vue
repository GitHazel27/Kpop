<script setup lang="ts">
import { group } from '@/data/grupos'
</script>

<template>
  <section class="artists-page">
    <header class="artists-heading">
      <p class="eyebrow">Descubre tus favoritos</p>
      <h1>Grupos</h1>
      <p>Explora los grupos y conoce a cada uno de sus integrantes.</p>
    </header>

    <div v-if="group.length" class="artists-grid">
      <RouterLink
        v-for="artist in group"
        :key="artist.id"
        class="artist-card"
        :to="{ name: 'grupo-det', params: { id: artist.id } }"
      >
        <img
          v-if="artist.image"
          class="artist-image"
          :src="artist.image"
          :alt="`Imagen de ${artist.nombre}`"
          loading="lazy"
        >
        <span class="artist-name">{{ artist.nombre }}</span>
      </RouterLink>
    </div>

    <p v-else class="empty-catalog">Pronto agregaremos nuevos artistas.</p>
  </section>
</template>

<style scoped>
.artists-page {
  width: min(100%, 76rem);
  min-height: 60vh;
  margin: 0 auto;
  padding: clamp(0.75rem, 2vw, 1.25rem) 0;
}

.artists-heading {
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

.artists-heading h1 {
  margin: 0;
  color: #171321;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 900;
  line-height: 1.1;
}

.artists-heading > p:last-child {
  margin: 0.65rem 0 0;
  color: #625a68;
}

.artists-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(1.25rem, 3vw, 3rem);
}

.artist-card {
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

.artist-card:hover {
  transform: translateY(-0.25rem);
  box-shadow: 0 0.85rem 2rem rgb(23 19 33 / 20%);
}

.artist-card:focus-visible {
  outline: 3px solid #f42c84;
  outline-offset: 3px;
}

.artist-image {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.artist-card:hover .artist-image {
  transform: scale(1.04);
}

.artist-name {
  z-index: 1;
  width: 100%;
  padding: 2.5rem 1rem 1.5rem;
  background: linear-gradient(transparent, rgb(15 12 22 / 88%));
  font-size: 1.2rem;
  font-weight: 700;
  text-align: center;
}

.empty-catalog {
  padding: 2rem;
  color: #625a68;
  text-align: center;
}

@media (max-width: 900px) {
  .artists-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 480px) {
  .artists-grid {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }

  .artist-card {
    height: 13rem;
  }
}
</style>