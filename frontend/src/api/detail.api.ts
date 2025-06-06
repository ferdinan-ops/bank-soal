import api from './axiosInstance'
import { DetailSoalFormFieldsType, DetailSoalType } from '@/lib/types/detail.type'

export const getDetailSoalFn = async (idSoal: string): Promise<DetailSoalType[]> => {
  const response = await api.get(`/detail-soal/soal/${idSoal}`)
  return response.data?.data
}

export const getDetailSoalForUserFn = async (idSoal: string): Promise<DetailSoalType[]> => {
  const response = await api.get(`/detail-soal/soal/${idSoal}/user`)
  return response.data?.data
}

export const createDetailSoalFn = async (payload: DetailSoalFormFieldsType) => {
  const { correctAnswer, ...rest } = payload
  const fields = { ...rest, correct_answers: correctAnswer }

  return await api.post('/detail-soal', fields)
}

type UpdateParamsType = {
  id_soal: string
} & DetailSoalFormFieldsType

export const updateDetailSoalFn = async (payload: UpdateParamsType) => {
  const { id_soal, correctAnswer, ...rest } = payload
  const fields = { ...rest, correct_answers: correctAnswer }

  return await api.put(`/detail-soal/${id_soal}`, fields)
}

export const deleteDetailSoalFn = async (id: string) => {
  return await api.delete(`/detail-soal/${id}`)
}
