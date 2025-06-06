import { useMutation, useQuery, useQueryClient } from 'react-query'

import { createGuruFn, deleteGuruFn, getGuruFn, updateGuruFn } from '@/api/guru.api'
import { toast } from '@/components/ui/use-toast'

export const useGetGuru = (enabled?: boolean) =>
  useQuery('guru', getGuruFn, {
    enabled
  })

export const useCreateGuru = () => {
  const queryclient = useQueryClient()

  return useMutation(createGuruFn, {
    onSuccess: () => {
      queryclient.invalidateQueries('guru')
      toast({
        title: 'Proses Berhasil!!',
        description: 'Guru telah berhasil ditambahkan.'
      })
    }
  })
}

export const useDeleteGuru = () => {
  const queryclient = useQueryClient()

  return useMutation(deleteGuruFn, {
    onSuccess: () => {
      queryclient.invalidateQueries('guru')
      toast({
        title: 'Proses Berhasil!!',
        description: 'Guru telah berhasil dihapus.'
      })
    }
  })
}

export const useUpdateGuru = () => {
  const queryclient = useQueryClient()

  return useMutation(updateGuruFn, {
    onSuccess: () => {
      queryclient.invalidateQueries('guru')
      toast({
        title: 'Proses Berhasil!!',
        description: 'Guru telah berhasil diupdate.'
      })
    }
  })
}
