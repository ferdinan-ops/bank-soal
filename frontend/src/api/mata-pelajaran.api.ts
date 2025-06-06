import api from './axiosInstance'
import { MataPelajaranBodyType, MataPelajaranType } from '@/lib/types/mata-pelajaran.type'

export const getMataPelajaranFn = async (): Promise<MataPelajaranType[]> => {
  const response = await api.get('/mata-pelajaran')
  return response.data?.data
}

export const createMataPelajaranFn = async (data: MataPelajaranBodyType) => {
  return await api.post('/mata-pelajaran', data)
}

export const updateMataPelajaranFn = async (data: MataPelajaranBodyType & { id: string }) => {
  return await api.put(`/mata-pelajaran/${data.id}`, data)
}

export const deleteMataPelajaranFn = async (id: string) => {
  return await api.delete(`/mata-pelajaran/${id}`)
}
