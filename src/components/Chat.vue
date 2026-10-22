<script setup lang="ts">
import ChatMessages from '../components/chat/ChatMessages.vue';
import MessageBox from '../components/chat/MessageBox.vue';
import { ref } from 'vue';
import type { ChatMessage } from '../interface/chat-interface.ts';
const messages=ref<ChatMessage[]>([
    {
        id: new Date().getTime(),
        message: '¡Annyeong! Soy Maknae Bot, ¿en qué puedo ayudarte hoy? 🫰',
        itsMine: false
    },
]);

const onMessage = (text: string) => {
  messages.value.push({
    id: new Date().getTime(),
    itsMine: true,
    message: text,
  })
}
</script>

<template>
    <div class="chat-container">
    <div class="chat-header">
      <span>Maknae Bot</span>
    </div>

    <ChatMessages :messages="messages"/>
    <MessageBox @send-message="onMessage($event)"/>

    
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
</style>