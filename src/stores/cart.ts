import { computed, ref } from 'vue'
import type { AccountInfo } from '@/stores/session'

export interface CheckoutRequest {
  account: AccountInfo
  total: number
}

export const quantities = ref<Record<number, number>>({})
export const isCartOpen = ref(false)

export const cartItemCount = computed(() =>
  Object.values(quantities.value).reduce((total, quantity) => total + quantity, 0),
)

export function incrementar(productId: number) {
  quantities.value[productId] = (quantities.value[productId] ?? 0) + 1
}

export function decrementar(productId: number) {
  quantities.value[productId] = Math.max(0, (quantities.value[productId] ?? 0) - 1)
}

export function limpiarCarrito() {
  quantities.value = {}
}
