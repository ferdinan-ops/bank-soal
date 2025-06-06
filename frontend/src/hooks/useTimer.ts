import * as React from 'react'

export default function useTimer(isStart: boolean, time: number) {
  const [isFinished, setIsFinished] = React.useState(false)
  const [timeLeft, setTimeLeft] = React.useState(time * 60) // 15 minutes
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null)

  React.useEffect(() => {
    if (isStart && timeLeft > 0 && !isFinished) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!)
            setIsFinished(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(intervalRef.current!)
    }
  }, [isStart, timeLeft, isFinished])

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  return { isFinished, setIsFinished, timeLeft, stopTimer }
}
