import { AxiosError } from 'axios'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import {
  createDetailSoalFn,
  deleteDetailSoalFn,
  getDetailSoalFn,
  getDetailSoalForUserFn,
  updateDetailSoalFn
} from '@/api/detail.api'
import { handleOnError } from '@/lib/services/handleToast'

import { toast } from '@/components/ui/use-toast'

export const useGetAllDetailSoal = (idSoal: string) => {
  return useQuery('detail-soal', async () => await getDetailSoalFn(idSoal))
}
export const useGetAllDetailSoalForUser = (idSoal: string) => {
  return useQuery(['detail-soal', idSoal], async () => await getDetailSoalForUserFn(idSoal))
}

export const useCreateDetailSoal = () => {
  const queryClient = useQueryClient()
  return useMutation(createDetailSoalFn, {
    onError: (error: AxiosError) => {
      handleOnError(error)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries('detail-soal')
      toast({
        title: 'Proses Berhasil!!',
        description: data?.data?.message as string
      })
    }
  })
}

export const useUpdateDetailSoal = () => {
  const queryClient = useQueryClient()

  return useMutation(updateDetailSoalFn, {
    onError: (error: AxiosError) => {
      handleOnError(error)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries('detail-soal')
      toast({
        title: 'Proses Berhasil!!',
        description: data?.data?.message as string
      })
    }
  })
}

export const useDeleteDetailSoal = () => {
  const queryClient = useQueryClient()
  return useMutation(deleteDetailSoalFn, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('detail-soal')
      toast({
        title: 'Proses Berhasil!!',
        description: data?.data?.message as string
      })
    }
  })
}
