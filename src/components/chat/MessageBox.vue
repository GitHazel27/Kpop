<script setup lang="ts">
import { ref } from 'vue'

const emits = defineEmits<{
  sendMessage: [text: string]
}>();


const message=ref('');

const sendMessage = () => {
  if(!message.value) return;
  console.log(message.value);
  emits('sendMessage',message.value);
  message.value='';
};
</script>

<template>
    <div class="message-box">
      <input
        type="text"
        placeholder="Type your message..."
        class="message-input"
        v-model="message"
        @keypress.enter="sendMessage"
      />
      <button
        class="send-button"
        type="button"
        aria-label="Enviar mensaje"
        @click="sendMessage"
      >
        <svg
          width="20px"
          height="20px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#ffffff"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M11.5003 12H5.41872M5.24634 12.7972L4.24158 15.7986C3.69128 17.4424 3.41613 18.2643 3.61359 18.7704C3.78506 19.21 4.15335 19.5432 4.6078 19.6701C5.13111 19.8161 5.92151 19.4604 7.50231 18.7491L17.6367 14.1886C19.1797 13.4942 19.9512 13.1471 20.1896 12.6648C20.3968 12.2458 20.3968 11.7541 20.1896 11.3351C19.9512 10.8529 19.1797 10.5057 17.6367 9.81135L7.48483 5.24303C5.90879 4.53382 5.12078 4.17921 4.59799 4.32468C4.14397 4.45101 3.77572 4.78336 3.60365 5.22209C3.40551 5.72728 3.67772 6.54741 4.22215 8.18767L5.24829 11.2793C5.34179 11.561 5.38855 11.7019 5.407 11.8459C5.42338 11.9738 5.42321 12.1032 5.40651 12.231C5.38768 12.375 5.34057 12.5157 5.24634 12.7972Z"
              stroke="#ffffff"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </g>
        </svg>
      </button>
    </div>
</template>

<style scoped>
.message-box {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  gap: 8px;
  padding: 16px;
  background: #fff;
  border-top: 1px solid #e5e7eb;
}

.message-input {
  flex: 1 1 auto;
  min-width: 0;
  padding: 10px 16px;
  border: 1px solid #d1d5db;
  border-radius: 9999px;
  background: #fff;
  color: #111827;
}

.message-input:focus {
  border-color: #f4a7df;
  outline: 2px solid rgb(59 130 246 / 20%);
}

.send-button {
  display: grid;
  flex: 0 0 auto;
  width: 40px;
  height: 40px;
  place-items: center;
  padding: 8px;
  border: 0;
  border-radius: 50%;
  background: #f4a7df;
  color: #fff;
  cursor: pointer;
  transition: background-color 150ms ease;
}

.send-button:hover {
  background: #f77dd6;
}

.send-button:focus-visible {
  outline: 2px solid #93c5fd;
  outline-offset: 2px;
}
</style>