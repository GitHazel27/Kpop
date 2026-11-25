import { computed, ref } from 'vue'

export interface AccountInfo {
  name: string
  email: string
}

export const userAccount = ref<AccountInfo | null>(null)
export const isRegistered = computed(() => userAccount.value !== null)

export function markUserAsRegistered(account: AccountInfo) {
  userAccount.value = account
}

// Página en la que estaba el usuario antes de entrar a /sesion
export const paginaAnterior = ref<string | null>(null)

export function guardarPaginaAnterior(ruta: string) {
  paginaAnterior.value = ruta
}

// Devuelve la ruta guardada (o null) y la limpia para que no se reutilice.
export function tomarPaginaAnterior(): string | null {
  const ruta = paginaAnterior.value
  paginaAnterior.value = null
  return ruta
}