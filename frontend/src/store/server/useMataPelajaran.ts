import { useMutation, useQuery, useQueryClient } from 'react-query'

import {
  createMataPelajaranFn,
  deleteMataPelajaranFn,
  getMataPelajaranFn,
  updateMataPelajaranFn
} from '@/api/mata-pelajaran.api'
import { toast } from '@/components/ui/use-toast'

export const useGetMataPelajaran = (enabled?: boolean) =>
  useQuery('mata-pelajaran', getMataPelajaranFn, {
    enabled
  })

export const useCreateMataPelajaran = () => {
  const queryclient = useQueryClient()

  return useMutation(createMataPelajaranFn, {
    onSuccess: () => {
      queryclient.invalidateQueries('mata-pelajaran')
      toast({
        title: 'Proses Berhasil!!',
        description: 'Mata Pelajaran telah berhasil ditambahkan.'
      })
    }
  })
}

export const useDeleteMataPelajaran = () => {
  const queryclient = useQueryClient()

  return useMutation(deleteMataPelajaranFn, {
    onSuccess: () => {
      queryclient.invalidateQueries('mata-pelajaran')
      toast({
        title: 'Proses Berhasil!!',
        description: 'Mata Pelajaran telah berhasil dihapus.'
      })
    }
  })
}

export const useUpdateMataPelajaran = () => {
  const queryclient = useQueryClient()

  return useMutation(updateMataPelajaranFn, {
    onSuccess: () => {
      queryclient.invalidateQueries('mata-pelajaran')
      toast({
        title: 'Proses Berhasil!!',
        description: 'Mata Pelajaran telah berhasil diubah.'
      })
    }
  })
}
