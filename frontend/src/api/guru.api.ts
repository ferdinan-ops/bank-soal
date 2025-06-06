import api from './axiosInstance'

import { GuruType } from '@/lib/types/guru.type'
import { GuruBodyType } from '@/lib/validations/guru.validation'

export const getGuruFn = async (): Promise<GuruType[]> => {
  const response = await api.get('/guru')
  return response.data?.data
}

export const createGuruFn = async (body: GuruBodyType) => {
  return await api.post('/guru', body)
}

export const updateGuruFn = async (body: GuruBodyType & { id: string }) => {
  const { id, ...rest } = body
  return await api.put(`/guru/${id}`, rest)
}

export const deleteGuruFn = async (id: string) => {
  return await api.delete(`/guru/${id}`)
}
