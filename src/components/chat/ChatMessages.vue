<script setup lang="ts">
import type { ChatMessage } from '../../interface/chat-interface.ts';
import Bubble from './Bubble.vue';
interface Props {
    messages: ChatMessage[]
}
defineProps<Props>();
</script>

<template>
    <div class="chat-messages">
        <div class="chat-messages-list">
        <!-- Messages go here -->
        <!-- Example Message -->
         <Bubble
         v-for="message in messages" 
         :key="message.id" 
         v-bind="message" />
        <!-- 
         El v-bind sustituye todo lo que se tiene en la parte de abajo
         :its-mine="message.itsMine" 
         :message="message.message" 
         :image="message.image"-->
        </div>
    </div>
</template>

<style scoped>
.chat-messages {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  padding: 16px;
}

.chat-messages-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>