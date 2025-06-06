import api from './axiosInstance'
import { KelasBodyType, KelasType } from '@/lib/types/kelas.type'

export const getKelasFn = async (idJurusan: string): Promise<KelasType[]> => {
  const response = await api.get(`/kelas/${idJurusan}`)
  return response.data?.data
}

export const createKelasFn = async (body: KelasBodyType) => {
  return await api.post('/kelas', body)
}

export const updateKelasFn = async (body: KelasBodyType & { id: string }) => {
  return await api.put(`/kelas/${body.id}`, body)
}

export const deleteKelasFn = async (id: string) => {
  return await api.delete(`/kelas/${id}`)
}
