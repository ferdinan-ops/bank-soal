import * as React from 'react'

import { formatTimeForTimer } from '@/lib/services/time'

import Alert from './Alert'

interface QuizTimerProps {
  timer: {
    timeLeft: number
    isFinished: boolean
    setIsFinished: (isFinished: boolean) => void
    time: number
  }

  actionAfterFinish?: () => void
}

export default function Timer({ actionAfterFinish, timer }: QuizTimerProps) {
  return (
    <React.Fragment>
      <div className="fixed right-10 top-32 z-50 flex flex-row items-center gap-1 rounded-lg border bg-white p-3 shadow-sm md:left-auto md:right-12 md:top-[148px] md:translate-x-0 md:flex-col md:p-6">
        <p className="text-xs font-medium md:text-sm">
          <span className='md:hidden'>Waktu</span> <span className="hidden md:inline">Lama pengerjaan</span>:{' '}
        </p>
        <p className="text-xs font-bold text-green-600 md:text-2xl">{formatTimeForTimer(timer.timeLeft)}</p>
      </div>
      <Alert
        title="Waktu sudah habis"
        desc="Waktu yang diberikan untuk mengerjakan kuis sudah habis, jawaban kamu sudah kami rekam. Tekan tombol di bawah untuk melanjutkan."
        btnText="Kirim jawaban"
        action={() => actionAfterFinish && actionAfterFinish()}
        open={timer.isFinished}
        onOpenChange={timer.setIsFinished}
        isCancel={false}
      />
    </React.Fragment>
  )
}
