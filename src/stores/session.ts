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
