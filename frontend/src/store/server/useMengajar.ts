import { useMutation, useQuery, useQueryClient } from 'react-query'

import { createMengajarFn, deleteMengajarFn, getMengajarFn, updateMengajarFn } from '@/api/mengajar.api'
import { toast } from '@/components/ui/use-toast'

export const useGetMengajar = () => useQuery('mengajar', getMengajarFn)

export const useCreateMengajar = () => {
  const queryclient = useQueryClient()

  return useMutation(createMengajarFn, {
    onSuccess: () => {
      queryclient.invalidateQueries('mengajar')
      toast({
        title: 'Proses Berhasil!!',
        description: 'Mengajar telah berhasil ditambahkan.'
      })
    }
  })
}

export const useDeleteMengajar = () => {
  const queryclient = useQueryClient()

  return useMutation(deleteMengajarFn, {
    onSuccess: () => {
      queryclient.invalidateQueries('mengajar')
      toast({
        title: 'Proses Berhasil!!',
        description: 'Mengajar telah berhasil dihapus.'
      })
    }
  })
}

export const useUpdateMengajar = () => {
  const queryclient = useQueryClient()

  return useMutation(updateMengajarFn, {
    onSuccess: () => {
      queryclient.invalidateQueries('mengajar')
      toast({
        title: 'Proses Berhasil!!',
        description: 'Mengajar telah berhasil diupdate.'
      })
    }
  })
}
