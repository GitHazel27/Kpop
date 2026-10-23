<script setup lang="ts">
import ChatMessages from '../components/chat/ChatMessages.vue'
import MessageBox from '../components/chat/MessageBox.vue'
import { ref } from 'vue'
import type { ChatMessage } from '../interface/chat-interface.ts'

interface SuggestedQuestion {
  question: string
  answer: string
}

const suggestedQuestions: SuggestedQuestion[] = [
  {
    question: '¿Dónde puedo ver las noticias?',
    answer: 'Entra a la sección K-news para ver las noticias de K-pop.'
  },
  {
    question: '¿Qué artistas puedo encontrar?',
    answer: 'Visita la sección Artistas para explorar los perfiles disponibles.'
  },
  {
    question: '¿Dónde puedo ver los eventos?',
    answer: 'En la sección Eventos encontrarás la información disponible.'
  },
  {
    question: '¿Cómo veo el merch?',
    answer: 'Puedes explorar los productos desde la sección Merch.'
  }
]

const messages = ref<ChatMessage[]>([])
const showSuggestedQuestions = ref(true)
let nextId = 0

const addMessage = (message: string, itsMine: boolean) => {
  messages.value.push({ id: nextId++, message, itsMine })
}

const onSuggestedQuestion = ({ question, answer }: SuggestedQuestion) => {
  addMessage(question, true)
  addMessage(answer, false)
  showSuggestedQuestions.value = false
}

addMessage('¡Annyeong! Soy Maknae Bot, ¿en qué puedo ayudarte hoy? 🫰', false)
</script>

<template>
  <div class="chat-container">
    <div class="chat-header">Maknae Bot</div>

    <ChatMessages :messages="messages" />

    <div v-if="showSuggestedQuestions" class="suggested-questions" aria-label="Preguntas sugeridas">
      <button
        v-for="item in suggestedQuestions"
        :key="item.question"
        class="suggested-question"
        type="button"
        @click="onSuggestedQuestion(item)"
      >
        {{ item.question }}
      </button>
    </div>

    <MessageBox @send-message="addMessage($event, true)" />
  </div>
</template>

<style scoped>
.chat-container {
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 0;
  flex-direction: column;
  overflow: hidden;
  background: #f3f4f6;
}

.chat-header {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background: #f4a7df;
  color: #fff;
  font-weight: 600;
}

.suggested-questions {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;
  padding: 0 16px 12px;
}

.suggested-question {
  padding: 8px 12px;
  border: 1px solid #f4a7df;
  border-radius: 16px;
  background: #fff;
  color: #171321;
  cursor: pointer;
}

.suggested-question:hover {
  background: #fce7f5;
}

.suggested-question:focus-visible {
  outline: 2px solid #f77dd6;
  outline-offset: 2px;
}
</style>