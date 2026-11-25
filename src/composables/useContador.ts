import { decrementar, incrementar, quantities } from '@/composables/cart'

export function useContador() {
  return { quantities, incrementar, decrementar }
}