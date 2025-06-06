import { useMutation, useQuery, useQueryClient } from 'react-query'

import { createJurusanFn, deleteJurusanFn, getJurusanFn, updateJurusanFn } from '@/api/jurusan.api'
import { toast } from '@/components/ui/use-toast'

export const useGetJurusan = (enabled?: boolean) =>
  useQuery('jurusan', getJurusanFn, {
    enabled
  })

export const useCreateJurusan = () => {
  const queryclient = useQueryClient()

  return useMutation(createJurusanFn, {
    onSuccess: () => {
      queryclient.invalidateQueries('jurusan')
      toast({
        title: 'Proses Berhasil!!',
        description: 'Jurusan telah berhasil ditambahkan.'
      })
    }
  })
}

export const useDeleteJurusan = () => {
  const queryclient = useQueryClient()

  return useMutation(deleteJurusanFn, {
    onSuccess: () => {
      queryclient.invalidateQueries('jurusan')
      toast({
        title: 'Proses Berhasil!!',
        description: 'Jurusan telah berhasil dihapus.'
      })
    }
  })
}

export const useUpdateJurusan = () => {
  const queryclient = useQueryClient()

  return useMutation(updateJurusanFn, {
    onSuccess: () => {
      queryclient.invalidateQueries('jurusan')
      toast({
        title: 'Proses Berhasil!!',
        description: 'Jurusan telah berhasil diupdate.'
      })
    }
  })
}
