import { decrementar, incrementar, quantities } from '@/stores/cart'

export function useContador() {
  return { quantities, incrementar, decrementar }
}