import api from './axiosInstance'

import { SoalPayloadType } from '@/lib/validations/soal.validation'
import { DetailSoalType, IGetParams, SoalType } from '@/lib/types/soal.type'

export const createSoalFn = async (payload: SoalPayloadType) => {
  return await api.post('/soal', payload)
}

export const updateSoalFn = async (payload: { id: string } & SoalPayloadType) => {
  const { id, ...rest } = payload
  return await api.put(`/soal/${id}`, rest)
}

export const deleteSoalFn = async (id: string) => {
  return await api.delete(`/soal/${id}`)
}

export const getSoalFn = async ({ page, q }: IGetParams): Promise<SoalType> => {
  const response = await api.get('/soal', {
    params: {
      page,
      q,
      limit: 9
    }
  })

  return response.data
}

export const getDetailSoalFn = async (id: string): Promise<DetailSoalType> => {
  const response = await api.get(`/soal/${id}`)
  return response.data?.data
}

export const getSoalByMengajarFn = async (id: string): Promise<DetailSoalType[]> => {
  const response = await api.get(`/soal/mengajar/${id}`)
  return response.data?.data
}
