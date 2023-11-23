import { defineStore } from 'pinia'

const TOKEN_STORE_KEY = 'TOKEN_STORE_KEY'

export function getToken() {
  const token = localStorage.getItem(TOKEN_STORE_KEY) || ''
  return token ? `Bearer ${token}` : ''
}
export function setToken(token: string) {
  localStorage.setItem(TOKEN_STORE_KEY, token)
}

export const userStore = defineStore('user', {})
