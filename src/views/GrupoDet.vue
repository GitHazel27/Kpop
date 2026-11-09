<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { catalogo } from '@/data/catalogo'
import { useContador } from '@/composables/useContador'
import { group } from '@/data/grupos'
import { isRegistered } from '@/stores/session'

const route = useRoute()
const { quantities, incrementar, decrementar } = useContador()
const artist = computed(() => {
  const id = Number(route.params.id)
  return group.find((item) => item.id === id)
})
const artistProducts = computed(() =>
  catalogo.filter((product) => product.grupo === artist.value?.nombre),
)

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
          <div class="member-photo-wrap">
            <img
              v-if="member.foto"
              class="member-photo"
              :src="member.foto"
              :alt="`Foto de ${member.nombre}`"
              loading="lazy"
            >
            <div v-else class="member-photo-placeholder" aria-hidden="true">{{ member.nombre }}</div>
          </div>
          <div class="member-info">
            <h3>{{ member.nombre }}</h3>
            <p>{{ member.posicion }}</p>
          </div>
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

    <section class="merch-section">
      <div class="section-heading">
        <h2>Merch</h2>
      </div>
      <div v-if="artistProducts.length" class="merch-grid">
        <article
          v-for="product in artistProducts"
          :key="product.id"
          class="merch-card"
        >
          <div class="merch-image-wrap">
            <img
              v-if="product.image"
              class="merch-image"
              :src="product.image"
              :alt="product.titulo"
              loading="lazy"
            >
            <div v-else class="merch-image-placeholder" aria-hidden="true">K-POP MERCH</div>
            <span class="merch-category">{{ product.categoria }}</span>
          </div>
          <div class="merch-info">
            <h3>{{ product.titulo }}</h3>
            <p v-if="product.descripcion">{{ product.descripcion }}</p>
            <div class="merch-purchase">
              <strong>${{ product.precio }}.00</strong>
              <div
                v-if="isRegistered"
                class="quantity-controls"
                :aria-label="`Cantidad de ${product.titulo}`"
              >
                <button
                  class="quantity-button"
                  type="button"
                  :aria-label="`Restar una unidad de ${product.titulo}`"
                  :disabled="(quantities[product.id] ?? 0) === 0"
                  @click="decrementar(product.id)"
                >
                  −
                </button>
                <output class="quantity-value" aria-live="polite">
                  {{ quantities[product.id] ?? 0 }}
                </output>
                <button
                  class="quantity-button"
                  type="button"
                  :aria-label="`Sumar una unidad de ${product.titulo}`"
                  @click="incrementar(product.id)"
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
      <p v-else class="merch-empty">Aún no hay productos de este grupo en el catálogo.</p>
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

.merch-section {
  margin-bottom: 3rem;
}

.merch-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 17rem), 1fr));
  gap: 1.5rem;
}

.merch-card {
  overflow: hidden;
  border: 1px solid rgb(23 19 33 / 9%);
  border-radius: 1rem;
  background: #fff;
  box-shadow: 0 0.75rem 2rem rgb(23 19 33 / 10%);
}

.merch-image-wrap {
  position: relative;
  height: 18rem;
  overflow: hidden;
  background: #f8eef5;
}

.merch-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.merch-image-placeholder {
  display: grid;
  width: 100%;
  height: 100%;
  place-items: center;
  background: linear-gradient(135deg, #211b30, #49304b);
  color: #f4a7df;
  font-weight: 800;
  letter-spacing: 0.12em;
}

.merch-category {
  position: absolute;
  top: 0.8rem;
  left: 0.8rem;
  padding: 0.35rem 0.7rem;
  border: 1px solid #f0d7e9;
  border-radius: 999px;
  background: #fff;
  color: #171321;
  font-size: 0.75rem;
  font-weight: 700;
}

.merch-info {
  padding: 1.25rem;
}

.merch-info h3 {
  margin: 0;
  color: #171321;
  font-size: 1rem;
  font-weight: 750;
  line-height: 1.4;
}

.merch-info > p {
  margin: 0.6rem 0 0;
  color: #625a68;
  font-size: 0.9rem;
}

.merch-purchase {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-top: 1.25rem;
}

.merch-purchase > strong {
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

.quantity-button:focus-visible,
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

.merch-empty {
  padding: 2rem;
  color: #625a68;
  text-align: center;
}

.members-section {
  margin-top: 2rem;
}

.section-heading {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
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
  overflow: hidden;
  border: 1px solid rgb(23 19 33 / 9%);
  border-radius: 0.85rem;
  background: #fff;
  box-shadow: 0 0.5rem 1.5rem rgb(23 19 33 / 7%);
}

.member-photo-wrap {
  display: grid;
  aspect-ratio: 4 / 3;
  place-items: center;
  overflow: hidden;
  background: #f8eef5;
}

.member-photo {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.member-photo-placeholder {
  color: #a51d5b;
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.12em;
}

.member-info {
  padding: 1.25rem;
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