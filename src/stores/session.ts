import { ref } from 'vue'

export const isRegistered = ref(false)

export function markUserAsRegistered() {
  isRegistered.value = true
}
