import { ImSpinner2 } from 'react-icons/im'

export default function Loading() {
  return (
    <section className="fixed inset-0 z-[999999999999999999999999999999999999999999999999999] bg-gray-900/30">
      <div className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white">
        <ImSpinner2 className="m-auto animate-spin text-3xl text-primary" />
      </div>
    </section>
  )
}
