import { ref } from 'vue'

export function useContador() {
  const quantities = ref<Record<number, number>>({})

  function incrementar(productId: number) {
    quantities.value[productId] = (quantities.value[productId] ?? 0) + 1
  }

  function decrementar(productId: number) {
    quantities.value[productId] = Math.max(0, (quantities.value[productId] ?? 0) - 1)
  }

  return { quantities, incrementar, decrementar }
}