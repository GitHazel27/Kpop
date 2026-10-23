<script setup lang="ts">
    interface Props {
        message: string;
        itsMine: boolean;
        image?:string;
    }

    defineProps<Props>();
</script>

<template>
    <div v-if="itsMine" class="chat-message chat-message--mine">
        <div class="chat-bubble chat-bubble--mine">
        {{ message }}
        </div>
    </div>

    <!-- Received Message -->
    <div v-else class="chat-message chat-message--received">
        <div class="chat-bubble chat-bubble--received">
        <span class="capitalize">{{ message }}</span>
        </div>
    </div>
</template>

<style scoped>
.chat-message {
  display: flex;
  width: 100%;
}

.chat-message--mine {
  justify-content: flex-end;
}

.chat-message--received {
  justify-content: flex-start;
}

.chat-bubble {
  max-width: min(80%, 20rem);
  padding: 8px 12px;
  overflow-wrap: anywhere;
  border-radius: 12px;
  color: #111827;
}

.chat-bubble--mine {
  background: #f4cbe9c1;
}

.chat-bubble--received {
  background: #d1d5db;
}

.chat-bubble--received span {
  text-transform: capitalize;
}

.chat-image {
  display: block;
  width: 13rem;
  height: 13rem;
  max-width: 100%;
  margin-top: 8px;
  border-radius: 6px;
  object-fit: cover;
}
</style>