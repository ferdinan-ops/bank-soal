import * as React from 'react'

export default function useRemovePointerEvent(open: boolean) {
  React.useEffect(() => {
    if (!open) {
      document.body.style.pointerEvents = ''
    }

    return () => {
      document.body.style.pointerEvents = ''
    }
  }, [open])
}
