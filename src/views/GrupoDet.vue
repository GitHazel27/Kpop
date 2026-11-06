<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { group } from '@/data/grupos'

const route = useRoute()
const artist = computed(() => {
  const id = Number(route.params.id)
  return group.find((item) => item.id === id)
})

function getYoutubeEmbedUrl(url?: string) {
  if (!url) return ''

  const videoId = url.match(/[?&]v=([^&]+)/)?.[1]
  return videoId ? `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}` : ''
}
</script>

<template>
  <section v-if="artist" class="group-page">
    <RouterLink class="back-link" :to="{ name: 'grupos' }">
      <span aria-hidden="true">←</span> Todos los artistas
    </RouterLink>

    <header class="group-header">
      <div class="group-image-wrap">
        <img
          v-if="artist.image"
          class="group-image"
          :src="artist.image"
          :alt="`Imagen de ${artist.nombre}`"
        >
        <div v-else class="group-image group-image-placeholder" aria-hidden="true">K-POP</div>
      </div>
      <div class="group-heading">
        <p class="eyebrow">Conoce al grupo</p>
        <h1>{{ artist.nombre }}</h1>
        <p v-if="artist.descripcion.trim()">{{ artist.descripcion }}</p>
        <p v-else class="group-description">Descubre a sus integrantes.</p>
      </div>
    </header>

    <section v-if="artist.integrantes?.length" class="members-section">
      <div class="section-heading">
        <h2>Integrantes</h2>
        <span>{{ artist.integrantes.length }}</span>
      </div>
      <div class="members-grid">
        <article
          v-for="member in artist.integrantes"
          :key="member.nombre"
          class="member-card"
        >
          <h3>{{ member.nombre }}</h3>
          <p>{{ member.posicion }}</p>
        </article>
      </div>
    </section>

    <section class="songs-section">
      <div class="section-heading">
        <h2>Canciones</h2>
      </div>
      <div class="songs-grid">
        <article class="song-card">
          <h3>Canción debut</h3>
          <iframe
            v-if="getYoutubeEmbedUrl(artist.videoDebut)"
            class="song-video"
            :src="getYoutubeEmbedUrl(artist.videoDebut)"
            :title="`Canción debut de ${artist.nombre}`"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
          <p v-else class="song-unavailable">Video no disponible.</p>
        </article>
        <article class="song-card">
          <h3>Canción recomendada</h3>
          <iframe
            v-if="getYoutubeEmbedUrl(artist.videoFav)"
            class="song-video"
            :src="getYoutubeEmbedUrl(artist.videoFav)"
            :title="`Canción recomendada de ${artist.nombre}`"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
          <p v-else class="song-unavailable">Video no disponible.</p>
        </article>
      </div>
    </section>
  </section>

  <section v-else class="not-found">
    <p class="eyebrow">Artista no encontrado</p>
    <h1>No encontramos ese grupo</h1>
    <p>El enlace puede ser incorrecto o el grupo ya no está disponible.</p>
    <RouterLink class="back-button" :to="{ name: 'grupos' }">Volver a artistas</RouterLink>
  </section>
</template>

<style scoped>
.group-page,
.not-found {
  width: min(100%, 76rem);
  min-height: 60vh;
  margin: 0 auto;
  padding: clamp(0.75rem, 2vw, 1.25rem) 0;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  color: #a51d5b;
  font-weight: 700;
  text-decoration-color: #f42c84;
  text-underline-offset: 3px;
}

.back-link:focus-visible,
.back-button:focus-visible {
  outline: 3px solid #f42c84;
  outline-offset: 3px;
}

.group-header {
  display: grid;
  grid-template-columns: minmax(0, min(30rem, 45%)) 1fr;
  align-items: center;
  gap: clamp(1.5rem, 5vw, 3rem);
  margin-bottom: 3rem;
}

.group-image-wrap {
  display: grid;
  min-height: 16rem;
  place-items: center;
  overflow: hidden;
  border-radius: 1rem;
  background: #f8eef5;
}

.group-image {
  display: block;
  width: 100%;
  max-height: 30rem;
  object-fit: contain;
  box-shadow: 0 0.75rem 2rem rgb(23 19 33 / 12%);
}

.group-image-placeholder {
  min-height: 16rem;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #211b30, #49304b);
  color: #f4a7df;
  font-weight: 800;
  letter-spacing: 0.12em;
}

.eyebrow {
  margin: 0 0 0.4rem;
  color: #f42c84;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.group-heading h1,
.not-found h1 {
  margin: 0;
  color: #171321;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 900;
  line-height: 1.1;
}

.group-heading > p:last-child,
.not-found > p:not(.eyebrow) {
  margin: 0.75rem 0 0;
  color: #625a68;
  font-size: 1.15rem;
  line-height: 1.6;
}

.songs-section {
  margin-bottom: 3rem;
}

.songs-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.song-card {
  overflow: hidden;
  padding: 1rem;
  border: 1px solid rgb(23 19 33 / 9%);
  border-radius: 0.85rem;
  background: #fff;
  box-shadow: 0 0.5rem 1.5rem rgb(23 19 33 / 7%);
}

.song-card h3 {
  margin: 0 0 0.75rem;
  color: #171321;
  font-size: 1rem;
  font-weight: 800;
}

.song-video {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  border: 0;
  border-radius: 0.5rem;
  background: #211b30;
}

.song-unavailable {
  margin: 0;
  color: #625a68;
  font-size: 0.95rem;
}

.members-section {
  margin-top: 2rem;
}

.section-heading {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.section-heading h2 {
  margin: 0;
  color: #171321;
  font-size: 1.6rem;
  font-weight: 850;
}

.section-heading span {
  display: grid;
  min-width: 1.8rem;
  height: 1.8rem;
  place-items: center;
  padding: 0 0.4rem;
  border-radius: 999px;
  background: #fbe4f0;
  color: #a51d5b;
  font-size: 0.8rem;
  font-weight: 800;
}

.members-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 15rem), 1fr));
  gap: 1rem;
}

.member-card {
  padding: 1.25rem;
  border: 1px solid rgb(23 19 33 / 9%);
  border-radius: 0.85rem;
  background: #fff;
  box-shadow: 0 0.5rem 1.5rem rgb(23 19 33 / 7%);
}

.member-card h3 {
  margin: 0;
  color: #171321;
  font-size: 1rem;
  font-weight: 800;
}

.member-card p {
  margin: 0.5rem 0 0;
  color: #625a68;
  font-size: 0.9rem;
  line-height: 1.5;
}

.not-found {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}

.back-button {
  display: inline-flex;
  margin-top: 1.5rem;
  padding: 0.7rem 1rem;
  border-radius: 0.5rem;
  background: #f42c84;
  color: #fff;
  font-weight: 700;
  text-decoration: none;
}

.back-button:hover {
  background: #d91c6c;
}

@media (max-width: 640px) {
  .group-header {
    grid-template-columns: 1fr;
  }

  .group-image-wrap {
    min-height: 12rem;
  }

  .group-image {
    max-height: 22rem;
  }

  .songs-grid {
    grid-template-columns: 1fr;
  }
}
</style>