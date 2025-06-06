import api from './axiosInstance'
import { MengajarBodyType, MengajarType } from '@/lib/types/mengajar.type'

export const getMengajarFn = async (): Promise<MengajarType[]> => {
  const response = await api.get('/mengajar')
  return response.data?.data
}

export const createMengajarFn = async (body: MengajarBodyType) => {
  return await api.post('/mengajar', body)
}

export const updateMengajarFn = async (body: MengajarBodyType & { id: string }) => {
  return await api.put(`/mengajar/${body.id}`, body)
}

export const deleteMengajarFn = async (id: string) => {
  return await api.delete(`/mengajar/${id}`)
}
