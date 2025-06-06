import { create } from 'zustand'

interface TokenStore {
  accessToken: string
  storeAccessToken: (token: string) => void
  removeAccessToken: () => void
  refreshToken: string
  storeRefreshToken: (token: string) => void
  removeRefreshToken: () => void
}

export const useToken = create<TokenStore>((set) => ({
  accessToken: JSON.parse(localStorage.getItem('access-token') ?? '""'),
  storeAccessToken: (accessToken) => {
    localStorage.setItem('access-token', JSON.stringify(accessToken))
    set({ accessToken })
  },
  removeAccessToken: () => {
    localStorage.removeItem('access-token')
    set({ accessToken: '' })
  },
  refreshToken: JSON.parse(localStorage.getItem('refresh-token') ?? '""'),
  storeRefreshToken: (refreshToken) => {
    localStorage.setItem('refresh-token', JSON.stringify(refreshToken))
    set({ refreshToken })
  },
  removeRefreshToken: () => {
    localStorage.removeItem('refresh-token')
    set({ refreshToken: '' })
  }
}))
