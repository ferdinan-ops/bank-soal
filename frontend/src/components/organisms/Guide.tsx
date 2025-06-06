import { HiCheckBadge } from 'react-icons/hi2'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { ScrollArea } from '@/components/ui/scroll-area'

interface GuideProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  action?: () => void
}

export default function Guide({ action, open, onOpenChange }: GuideProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-2xl">
        <AlertDialogHeader className="flex flex-col space-y-1.5 text-center sm:text-left">
          <AlertDialogTitle className="text-lg leading-none tracking-tight">Petunjuk Pengerjaan</AlertDialogTitle>
          <p className="text-[13px] font-medium text-zinc-500 dark:text-zinc-400">
            Ikuti petunjuk berikut untuk menjawab soal ujian dengan baik dan benar.
          </p>
        </AlertDialogHeader>
        <ScrollArea className="mt-5 max-h-[420px] w-full">
          <section className="flex flex-col">
            <article className="flex flex-col gap-1 pb-4">
              <div className="flex items-center gap-2">
                <HiCheckBadge className="text-xl text-blue-500" />
                <p className="text-sm font-bold text-primary dark:text-white">Lama pengerjaan</p>
              </div>
              <p className="ml-7 border-b pb-4 text-xs font-medium leading-relaxed text-primary/95 dark:border-white/20 dark:text-white/95">
                Kamu akan diberikan waktu untuk menyelesaikan soal ujian ini dengan jawaban yang benar. Sistem akan
                menghentikan pengerjaan secara otomatis ketika waktu habis.
              </p>
            </article>
            <article className="flex flex-col gap-1 pt-0">
              <div className="flex items-center gap-2">
                <HiCheckBadge className="text-xl text-blue-500" />
                <p className="text-sm font-bold text-primary dark:text-white">Soal acak</p>
              </div>
              <div className="ml-7 pb-4 text-xs font-medium leading-relaxed text-primary/95 dark:text-white/95">
                <p>
                  Soal ujian yang ditampilkan di layar kamu ini adalah soal acak, artinya soal milik kamu tidak sama
                  dengan soal teman-teman kamu yang lain.
                </p>
              </div>
            </article>
          </section>
        </ScrollArea>
        <AlertDialogFooter>
          <AlertDialogAction onClick={action}>Saya Mengerti</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
