import api from './axiosInstance'
import { JurusanBodyType, JurusanType } from '@/lib/types/jurusan.type'

export const getJurusanFn = async (): Promise<JurusanType[]> => {
  const response = await api.get('/jurusan')
  return response.data?.data
}

export const createJurusanFn = async (body: JurusanBodyType) => {
  return await api.post('/jurusan', body)
}

export const updateJurusanFn = async (body: JurusanBodyType & { id: string }) => {
  return await api.put(`/jurusan/${body.id}`, body)
}

export const deleteJurusanFn = async (id: string) => {
  return await api.delete(`/jurusan/${id}`)
}
