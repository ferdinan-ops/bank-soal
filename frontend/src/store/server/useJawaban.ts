import { AxiosError } from 'axios'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import { createAnswersFn, getAnswerBySoalFn, getAnswersByUserIdFn, getAnswersFn } from '@/api/jawaban.api'
import { handleOnError } from '@/lib/services/handleToast'
import { toast } from '@/components/ui/use-toast'

export const useCreateAnswers = () => {
  const queryClient = useQueryClient()

  return useMutation(createAnswersFn, {
    onError: (error: AxiosError) => {
      handleOnError(error)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries('answers')
      toast({
        title: 'Proses Berhasil!!',
        description: data?.data?.message as string
      })
    }
  })
}

export const useGetAnswers = (soalId: string, userId?: string, enabled?: boolean) => {
  return useQuery(['answers', soalId], async () => await getAnswersFn(soalId, userId), {
    enabled
  })
}

export const useGetAnswersByUserId = (userId: string, search: string) => {
  return useQuery(['answers', userId, search], async () => await getAnswersByUserIdFn(userId, search))
}

export const useGetAnswerBySoal = (soalId: string) => {
  return useQuery(['answers', 'soal', soalId], async () => await getAnswerBySoalFn(soalId))
}
