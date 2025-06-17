import { AxiosError } from 'axios'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import {
  createSoalFn,
  deleteSoalFn,
  getDetailSoalFn,
  getSoalByMengajarFn,
  getSoalFn,
  updateSoalFn
} from '@/api/soal.api'

import { IGetParams } from '@/lib/types/soal.type'
import { handleOnError } from '@/lib/services/handleToast'

import { toast } from '@/components/ui/use-toast'

export const useCreateSoal = () => {
  const queryClient = useQueryClient()

  return useMutation(createSoalFn, {
    onError: (error: AxiosError) => {
      handleOnError(error)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries('soal-mengajar')
      toast({
        title: 'Proses berhasil!!',
        description: data?.data?.message as string
      })
    }
  })
}

export const useUpdateSoal = () => {
  const queryClient = useQueryClient()

  return useMutation(updateSoalFn, {
    onError: (error: AxiosError) => {
      handleOnError(error)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries('soal-mengajar')
      toast({
        title: 'Proses berhasil!!',
        description: data?.data?.message as string
      })
    }
  })
}

export const useDeleteSoal = () => {
  const queryClient = useQueryClient()

  return useMutation(deleteSoalFn, {
    onError: (error: AxiosError) => {
      handleOnError(error)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries('soal-mengajar')
      toast({
        title: 'Proses berhasil!!',
        description: data?.data?.message as string
      })
    }
  })
}

export const useGetSoal = ({ page, q }: IGetParams) => {
  return useQuery(['soal', page, q], async () => await getSoalFn({ page, q }))
}

export const useGetDetailSoal = (id: string, onGuru?: boolean) => {
  return useQuery(['soal', id], async () => await getDetailSoalFn(id), {
    enabled: !!id,

    ...(onGuru
      ? {
          // refetchOnMount: true,
          refetchOnWindowFocus: true
          // refetchOnReconnect: true
          // retry: false,
          // staleTime: 0
        }
      : {})
  })
}

export const useGetSoalByMengajar = (id: string) => {
  return useQuery(['soal-mengajar', id], async () => await getSoalByMengajarFn(id), {
    refetchOnMount: true
  })
}
