<script setup lang="ts">
import { computed, ref } from 'vue';
import { news } from '@/data/news';

const currentIndex = ref(0);
const currentNews = computed(() => news[currentIndex.value]);

function showPreviousNews() {
  currentIndex.value = (currentIndex.value - 1 + news.length) % news.length;
}

function showNextNews() {
  currentIndex.value = (currentIndex.value + 1) % news.length;
}
</script>

<template>
  <section id="knews" class="knews-page" aria-labelledby="knews-title">
    <header class="knews-heading">
      <h2 id="knews-title">K-news</h2>
      <p>Entérate de las últimas noticias de tus artistas favoritos.</p>
    </header>

    <div v-if="currentNews" class="news-carousel" aria-roledescription="carrusel">
      <article class="news-card" aria-live="polite">
        <div class="news-image-wrap">
          <img
            v-if="currentNews.image"
            class="news-image"
            :src="currentNews.image"
            :alt="currentNews.titulo"
          >
          <div v-else class="news-image-placeholder" aria-hidden="true">K-POP NEWS</div>
        </div>
        <div class="news-content">
          <p class="news-count">NOTICIA {{ currentIndex + 1 }} DE {{ news.length }}</p>
          <h2>{{ currentNews.titulo }}</h2>
          <p class="news-description">{{ currentNews.descripcion }}</p>
          <a
            v-if="currentNews.enlace"
            class="news-button"
            :href="currentNews.enlace"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver noticia <span aria-hidden="true">↗</span>
          </a>
          <button v-else class="news-button" type="button" disabled>
            Enlace no disponible
          </button>
        </div>
      </article>

      <div v-if="news.length > 1" class="carousel-controls" aria-label="Controles de noticias">
        <button
          class="carousel-arrow"
          type="button"
          aria-label="Noticia anterior"
          @click="showPreviousNews"
        >
          <span aria-hidden="true">←</span>
        </button>
        <div class="carousel-indicators" aria-label="Seleccionar noticia">
          <button
            v-for="(item, index) in news"
            :key="item.id"
            class="carousel-indicator"
            :class="{ active: index === currentIndex }"
            type="button"
            :aria-label="`Ver noticia ${index + 1}: ${item.titulo}`"
            :aria-current="index === currentIndex ? 'true' : undefined"
            @click="currentIndex = index"
          ></button>
        </div>
        <button
          class="carousel-arrow"
          type="button"
          aria-label="Siguiente noticia"
          @click="showNextNews"
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
    <p v-else class="empty-news">Aún no hay noticias para mostrar.</p>
  </section>
</template>

<style scoped>
.knews-page {
  width: calc(100% + 4rem);
  min-height: 60vh;
  margin: 0 0 0 -2rem;
  padding: clamp(1rem, 2vw, 1.5rem) clamp(1.5rem, 5vw, 4rem) 3rem;
  scroll-margin-top: 7rem;
}

.knews-heading {
  margin-bottom: 2rem;
  text-align: left;
}

.knews-heading h2 {
  margin: 0;
  color: #171321;
  font-size: clamp(2.25rem, 6vw, 3.5rem);
  font-weight: 900;
  line-height: 1.1;
}

.knews-heading > p:last-child {
  margin: 0.65rem 0 0;
  color: #625a68;
  font-size: 1rem;
}

.news-card {
  display: grid;
  height: 27rem;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  overflow: hidden;
  border: 1px solid rgb(23 19 33 / 9%);
  border-radius: 1.25rem;
  background: #fff;
  box-shadow: 0 1rem 2.5rem rgb(23 19 33 / 12%);
}

.news-image-wrap {
  width: 100%;
  height: 100%;
  min-height: 0;
  overflow: hidden;
  background: #211b30;
}

.news-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.news-image-placeholder {
  display: grid;
  height: 100%;
  place-items: center;
  background: linear-gradient(135deg, #211b30, #49304b);
  color: #f4a7df;
  font-size: 1.25rem;
  font-weight: 800;
  letter-spacing: 0.12em;
}

.news-content {
  display: flex;
  min-width: 0;
  min-height: 0;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: clamp(1.5rem, 4vw, 3.5rem);
  overflow: hidden;
}

.news-count {
  margin: 0 0 0.75rem;
  color: #f42c84;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.12em;
}

.news-content h2 {
  margin: 0;
  color: #171321;
  font-size: clamp(1.4rem, 3vw, 2.1rem);
  font-weight: 800;
  line-height: 1.2;
}

.news-description {
  margin: 1rem 0 1.5rem;
  color: #625a68;
  font-size: 1rem;
  line-height: 1.7;
}

.news-button {
  display: inline-flex;
  min-height: 2.8rem;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.7rem 1.3rem;
  border: 0;
  border-radius: 999px;
  background: #f42c84;
  color: #fff;
  cursor: pointer;
  font: inherit;
  font-weight: 700;
  text-decoration: none;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.news-button:hover:not(:disabled) {
  transform: translateY(-2px);
  background: #d91c6c;
}

.news-button:focus-visible,
.carousel-arrow:focus-visible,
.carousel-indicator:focus-visible {
  outline: 3px solid #f42c84;
  outline-offset: 3px;
}

.news-button:disabled {
  cursor: not-allowed;
  opacity: 0.65;
}

.carousel-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
  margin-top: 1.5rem;
}

.carousel-arrow {
  display: grid;
  width: 2.6rem;
  height: 2.6rem;
  place-items: center;
  border: 1px solid #f42c84;
  border-radius: 50%;
  background: #fff;
  color: #f42c84;
  cursor: pointer;
  font-size: 1.3rem;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.carousel-arrow:hover {
  background: #f42c84;
  color: #fff;
}

.carousel-indicators {
  display: flex;
  align-items: center;
  gap: 0.55rem;
}

.carousel-indicator {
  width: 0.6rem;
  height: 0.6rem;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: #d8cbd5;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.carousel-indicator.active {
  transform: scale(1.25);
  background: #f42c84;
}

.empty-news {
  padding: 2rem;
  color: #625a68;
  text-align: center;
}

@media (max-width: 640px) {
  .knews-page {
    padding-top: 1rem;
    padding-right: 1rem;
    padding-left: 1rem;
  }

  .news-card {
    height: auto;
    grid-template-columns: 1fr;
  }

  .news-image-wrap {
    height: 16rem;
  }

  .news-image-placeholder {
    height: 100%;
  }

  .news-content {
    padding: 1.5rem;
  }
}
</style>