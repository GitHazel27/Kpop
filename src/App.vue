<script setup lang="ts">
import { ref } from 'vue'
import Navbar from './components/Navbar.vue'
import Chat from './components/Chat.vue'

const isChatOpen = ref(false)
</script>

<template>
  <Navbar />
  <main>
    <RouterView />
  </main>

  <section class="chat-widget" aria-label="Chat">
    <div v-if="isChatOpen" class="chat-window">
      <Chat />
    </div>
    <button
      class="chat-toggle"
      type="button"
      :aria-expanded="isChatOpen"
      :aria-label="isChatOpen ? 'Cerrar chat' : 'Abrir chat'"
      @click="isChatOpen = !isChatOpen"
    >
      <svg
        v-if="!isChatOpen"
        viewBox="0 0 24 24"
        width="26"
        height="26"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H5l1.7-3.4A7.5 7.5 0 1 1 20 11.5Z"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <svg
        v-else
        viewBox="0 0 24 24"
        width="26"
        height="26"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="m6 6 12 12M18 6 6 18"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>
    </button>
  </section>
</template>

<style scoped>
main {
  width: 100%;
  padding: 0 2rem;
  margin: 3rem 0;
}

.chat-widget {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
}

.chat-window {
  width: min(350px, calc(100vw - 32px));
  min-height: 180px;
  max-height: min(500px, calc(100vh - 110px));
  overflow-y: auto;
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  background: #fff;
  color: #111827;
  box-shadow: 0 8px 30px rgb(0 0 0 / 16%);
}

.chat-toggle {
  display: grid;
  width: 58px;
  height: 58px;
  place-items: center;
  border: 0;
  border-radius: 50%;
  background: #f4a7df;
  color: #fff;
  cursor: pointer;
  box-shadow: 0 4px 14px rgb(0 0 0 / 22%);
  transition: background-color 150ms ease, transform 150ms ease;
}

.chat-toggle:hover {
  transform: translateY(-2px);
  background: #f4a7df;
}

.chat-toggle:focus-visible {
  outline: 3px solid #93c5fd;
  outline-offset: 3px;
}

@media (max-width: 480px) {
  .chat-widget {
    right: 16px;
    bottom: 16px;
  }
}
</style>
