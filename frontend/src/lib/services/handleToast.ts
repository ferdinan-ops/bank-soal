import { AxiosError } from 'axios'

import { toast } from '@/components/ui/use-toast'

import { ErrorResponseType } from '../types/auth.type'

export const handleOnError = (error: AxiosError, message?: string) => {
  if (error.response?.status === 400) {
    const errorResponse = error.response?.data as ErrorResponseType

    toast({
      variant: 'destructive',
      title: errorResponse.error ?? message,
      description: 'Mohon periksa kembali data yang anda masukkan'
    })
  }
}
