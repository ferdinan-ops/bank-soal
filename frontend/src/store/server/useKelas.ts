import { useMutation, useQuery, useQueryClient } from 'react-query'

import { createKelasFn, deleteKelasFn, getKelasFn, updateKelasFn } from '@/api/kelas.api'
import { toast } from '@/components/ui/use-toast'

export const useGetKelas = (idJurusan: string) => {
  return useQuery(['kelas', idJurusan], async () => await getKelasFn(idJurusan), {
    enabled: !!idJurusan
  })
}

export const useCreateKelas = () => {
  const queryclient = useQueryClient()

  return useMutation(createKelasFn, {
    onSuccess: () => {
      queryclient.invalidateQueries('kelas')
      toast({
        title: 'Proses Berhasil!!',
        description: 'Kelas telah berhasil ditambahkan.'
      })
    }
  })
}

export const useDeleteKelas = () => {
  const queryclient = useQueryClient()

  return useMutation(deleteKelasFn, {
    onSuccess: () => {
      queryclient.invalidateQueries('kelas')
      toast({
        title: 'Proses Berhasil!!',
        description: 'Kelas telah berhasil dihapus.'
      })
    }
  })
}

export const useUpdateKelas = () => {
  const queryclient = useQueryClient()

  return useMutation(updateKelasFn, {
    onSuccess: () => {
      queryclient.invalidateQueries('kelas')
      toast({
        title: 'Proses Berhasil!!',
        description: 'Kelas telah berhasil diupdate.'
      })
    }
  })
}
