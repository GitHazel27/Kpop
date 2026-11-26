<template>
  <div class="music-player" role="group" aria-label="Reproductor de música">
    <div class="mp-controls">
      <button class="mp-btn" type="button" aria-label="Canción anterior" :disabled="!ready" @click="prev">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 6h2v12H6zM9.5 12 18 6v12z" /></svg>
      </button>
      <button
        class="mp-btn mp-btn-main"
        type="button"
        :aria-label="playing ? 'Pausar' : 'Reproducir'"
        :disabled="!ready"
        @click="toggle"
      >
        <svg v-if="!playing" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
        <svg v-else viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 5h4v14H6zM14 5h4v14h-4z" /></svg>
      </button>
      <button class="mp-btn" type="button" aria-label="Siguiente canción" :disabled="!ready" @click="next">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16 6h2v12h-2zM6 18V6l8.5 6z" /></svg>
      </button>
    </div>

    <button
      class="mp-info"
      type="button"
      aria-controls="mp-panel-yt"
      :aria-expanded="open"
      title="Mostrar u ocultar el video"
      @click="open = !open"
    >
      <span class="mp-title">{{ cancion.titulo }}</span>
      <span class="mp-artist">{{ cancion.artista }}</span>
    </button>

    <div id="mp-panel-yt" class="mp-panel" v-show="open">
      <div ref="host" class="mp-video"></div>
      <label class="mp-volume">
        <span>Vol</span>
        <input v-model.number="volume" type="range" min="0" max="100" aria-label="Volumen" @input="changeVolume" />
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { canciones } from '@/data/canciones'

interface YTPlayer {
  playVideo(): void
  pauseVideo(): void
  loadVideoById(id: string): void
  setVolume(volume: number): void
  destroy(): void
}
interface YTEvent {
  data: number
}
type YTWindow = Window & {
  YT?: {
    Player: new (
      el: HTMLElement,
      opts: {
        width: string
        height: string
        videoId: string
        playerVars: Record<string, number>
        events: { onReady: () => void; onStateChange: (e: YTEvent) => void; onError: () => void }
      },
    ) => YTPlayer
    PlayerState: { ENDED: number; PLAYING: number }
  }
  onYouTubeIframeAPIReady?: () => void
}

const host = ref<HTMLDivElement | null>(null)
const open = ref(false)
const ready = ref(false)
const playing = ref(false)
const volume = ref(70)
const current = ref(0)
const cancion = computed(() => canciones[current.value]!)

let player: YTPlayer | null = null
let errores = 0

// Carga el script de la API de YouTube una sola vez.
function cargarApi(): Promise<void> {
  return new Promise((resolve) => {
    const w = window as YTWindow
    if (w.YT?.Player) return resolve()
    const anterior = w.onYouTubeIframeAPIReady
    w.onYouTubeIframeAPIReady = () => {
      anterior?.()
      resolve()
    }
    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const s = document.createElement('script')
      s.src = 'https://www.youtube.com/iframe_api'
      document.head.appendChild(s)
    }
  })
}

onMounted(async () => {
  await cargarApi()
  const YT = (window as YTWindow).YT
  if (!YT || !host.value) return

  // La API reemplaza el elemento por un iframe, así que se le da uno propio
  // para que Vue no pierda la referencia de `host`.
  const el = document.createElement('div')
  host.value.appendChild(el)

  player = new YT.Player(el, {
    width: '100%',
    height: '100%',
    videoId: canciones[0]!.youtubeId,
    playerVars: { playsinline: 1, rel: 0, modestbranding: 1 },
    events: {
      onReady: () => {
        ready.value = true
        player?.setVolume(volume.value)
      },
      onStateChange: (e) => {
        playing.value = e.data === YT.PlayerState.PLAYING
        if (e.data === YT.PlayerState.PLAYING) errores = 0
        if (e.data === YT.PlayerState.ENDED) next()
      },
      // Si un video no se puede reproducir, salta al siguiente (máx. una vuelta).
      onError: () => {
        if (++errores < canciones.length) next()
      },
    },
  })
})

onBeforeUnmount(() => player?.destroy())

function irA(indice: number) {
  current.value = (indice + canciones.length) % canciones.length
  player?.loadVideoById(canciones[current.value]!.youtubeId)
}
const next = () => irA(current.value + 1)
const prev = () => irA(current.value - 1)

function toggle() {
  if (playing.value) player?.pauseVideo()
  else player?.playVideo()
}

function changeVolume() {
  player?.setVolume(volume.value)
}
</script>

<style scoped>
.music-player {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.75rem 0.25rem 0.4rem;
  border: 1px solid rgb(255 255 255 / 12%);
  border-radius: 999px;
  background: #211b30;
}

.mp-controls {
  display: flex;
  align-items: center;
  gap: 0.15rem;
}

.mp-btn {
  display: grid;
  width: 1.9rem;
  height: 1.9rem;
  place-items: center;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: #fff;
  cursor: pointer;
  transition: color 0.2s ease, background-color 0.2s ease;
}

.mp-btn svg {
  width: 1.15rem;
  height: 1.15rem;
}

.mp-btn:hover:not(:disabled) {
  color: #f42c84;
}

.mp-btn:focus-visible,
.mp-info:focus-visible {
  outline: 2px solid #f42c84;
  outline-offset: 2px;
}

.mp-btn:disabled {
  cursor: default;
  opacity: 0.45;
}

.mp-btn-main {
  background: #f42c84;
}

.mp-btn-main:hover:not(:disabled) {
  background: #fff;
  color: #f42c84;
}

.mp-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 9rem;
  padding: 0;
  border: 0;
  background: transparent;
  color: #fff;
  cursor: pointer;
  font: inherit;
  line-height: 1.15;
  text-align: left;
}

.mp-title {
  overflow: hidden;
  max-width: 100%;
  font-size: 0.85rem;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mp-artist {
  font-size: 0.7rem;
  color: #f77dd6;
}

.mp-panel {
  position: absolute;
  top: calc(100% + 0.6rem);
  left: 0;
  z-index: 20;
  width: 22.5rem;
  max-width: 92vw;
  padding: 0.5rem;
  border: 1px solid rgb(255 255 255 / 12%);
  border-radius: 0.85rem;
  background: #211b30;
  box-shadow: 0 0.75rem 1.75rem rgb(0 0 0 / 30%);
}

.mp-video {
  width: 100%;
  aspect-ratio: 16 / 9;
  min-height: 200px;
  overflow: hidden;
  border-radius: 0.6rem;
  background: #000;
}

.mp-video :deep(iframe) {
  width: 100%;
  height: 100%;
  border: 0;
}

.mp-volume {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6rem 0.25rem 0.1rem;
  color: #fff;
  font-size: 0.75rem;
}

.mp-volume input {
  flex: 1;
  accent-color: #f42c84;
}

@media (max-width: 768px) {
  .music-player {
    margin-right: 0;
  }

  .mp-artist {
    display: none;
  }

  .mp-info {
    max-width: 5.5rem;
  }

  .mp-panel {
    right: 0;
    left: auto;
  }
}
</style>