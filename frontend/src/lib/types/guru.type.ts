import { GuruBodyType } from '../validations/guru.validation'

export type GuruType = {
  id: string
  guru: {
    id: string
    nip: string
    id_user: string
  }
} & Omit<GuruBodyType, 'nip'>
