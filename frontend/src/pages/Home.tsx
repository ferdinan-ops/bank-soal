import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useUserInfo } from '@/store/client'
import { useDialog } from '@/store/client/useDialog'
import { useGetSoal } from '@/store/server/useSoal'

import { useDisableBodyScroll, useQueryParams, useTitle } from '@/hooks'

import { UserRole } from '@/lib/constant'
import { DetailSoalType } from '@/lib/types/soal.type'
import { getStartAndFinish } from '@/lib/services/time'

import { Badge, Loading, Pagination, Search } from '@/components/atoms'
import { Info } from '@/components/organisms'

import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem } from '@/components/ui/form'

const findHasil = (data: DetailSoalType, userId: string) => {
  return data.hasil.find((hasil) => hasil.siswa.id_user === userId)
}

interface FormFields {
  search: string
}

export default function Home() {
  useTitle('Beranda')

  const navigate = useNavigate()
  const forms = useForm<FormFields>()

  const { dialog } = useDialog()
  const user = useUserInfo((state) => state.user)
  const { params, createParam, deleteParam } = useQueryParams(['page', 'search'])

  const {
    data: soal,
    isLoading,
    isFetching,
    refetch
  } = useGetSoal({
    page: Number(params.page) || 1,
    q: params.search || ''
  })

  useDisableBodyScroll(isLoading)

  const onSubmit = (data: FormFields) => {
    if (data.search === '' || data.search === undefined) {
      deleteParam('search')
    } else {
      createParam({ key: 'search', value: data.search })
    }

    refetch()
  }

  const handleClickCard = (item: DetailSoalType) => {
    const isSiswa = user.role === UserRole.SISWA
    const navigateToAnswer = () => navigate(`/answer/${item.id}/time/${item.lama_pengerjaan}`)

    if (isSiswa) {
      const { starts, ends, now } = getStartAndFinish({
        examdate: item.tanggal_ujian,
        startTime: item.mulai_ujian,
        endTime: item.selesai_ujian
      })

      if (now < starts) {
        void dialog({
          title: 'Ujian belum dimulai',
          description: `Ujian masih belum dimulai nih, silakan tunggu sebentar lagi yaa. Ujian akan dimulai pada pukul ${item.mulai_ujian}`,
          variant: 'warning',
          submitText: 'Oke'
        })

        return
      }

      if (now > ends) {
        const isFinished = findHasil(item, user.id)
        if (isFinished) {
          void dialog({
            title: 'Ujian sudah selesai',
            description: `Ujian telah selesai pada pukul ${item.selesai_ujian}. Silahkan informasikan kepada guru kamu bila kamu terlambat mengikuti ujian.`,
            variant: 'warning',
            submitText: 'Oke'
          }).then(() => navigateToAnswer())
          return
        }

        void dialog({
          title: 'Ujian sudah selesai',
          description: `Ujian telah selesai pada pukul ${item.selesai_ujian}. Silahkan informasikan kepada guru kamu bila kamu terlambat mengikuti ujian.`,
          variant: 'warning',
          submitText: 'Oke'
        })
        return
      }

      navigateToAnswer()
      return
    }

    navigateToAnswer()
  }

  return (
    <section className="flex flex-col gap-3 md:gap-6">
      {(isLoading || isFetching) && <Loading />}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-0">
        <div className="flex flex-col">
          <h2 className="mb-2 text-2xl font-bold text-primary dark:text-white md:text-[32px]">Daftar Soal</h2>
          <p className="text-[13px] font-medium text-zinc-500 md:text-sm">
            Berikut adalah seluruh daftar soal yang telah didaftarkan pada sistem.
          </p>
        </div>
        <Form {...forms}>
          <form onSubmit={forms.handleSubmit(onSubmit)} className="ml-auto flex w-full items-center md:w-4/12">
            <FormField
              name="search"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <Search {...field} value={field.value ?? ''} placeholder="Cari soal" containerClassName="w-full" />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
        {soal?.data.length && soal.data.length > 0 ? (
          soal?.data.map((item) => (
            <article className="relative rounded-lg bg-[#F7F9FB] p-6" key={item.id}>
              {user.role === UserRole.SISWA && (
                <Badge
                  variant={
                    findHasil(item, user.id)
                      ? 'success'
                      : getStartAndFinish({
                            examdate: item.tanggal_ujian,
                            startTime: item.mulai_ujian,
                            endTime: item.selesai_ujian
                          }).ends < new Date()
                        ? 'destructive'
                        : 'default'
                  }
                >
                  {findHasil(item, user.id) ? 'Sudah dikerjakan' : 'Belum dikerjakan'}
                </Badge>
              )}
              <h1 className="text-xl font-bold">{item.mengajar.mata_pelajaran.nama}</h1>
              <table className="mt-5 w-fit text-sm">
                <tbody>
                  <Info title="Jurusan" content={item.mengajar.kelas.jurusan.nama} />
                  <Info title="Kelas" content={item.mengajar.kelas.nama} />
                  <Info title="Tahun Ajaran" content={item.mengajar.tahun_ajaran} />
                  <Info title="Semester" content={item.semester} />
                  <Info title="Pengajar" content={item.mengajar.guru.user.fullname} />
                  <Info title="Jadwal" content={`${item.mulai_ujian} - ${item.selesai_ujian}`} />
                </tbody>
              </table>
              <div className="mt-8 flex w-full items-center justify-between">
                <div className="flex flex-col">
                  <p className="text-xs font-semibold text-primary/60">Lama pengerjaan:</p>
                  <p className="text-sm font-semibold">{item.lama_pengerjaan} menit</p>
                </div>
                <Button className="ml-auto px-4 xl:text-xs" onClick={() => handleClickCard(item)}>
                  {user.role === UserRole.SISWA ? 'Jawab' : 'Lihat'} Soal
                </Button>
              </div>
            </article>
          ))
        ) : params?.search ? (
          <p className="font-semibold italic text-primary/80">Tidak ada soal dengan data: {params?.search}</p>
        ) : (
          <p className="font-semibold italic text-primary/80">Belum ada soal</p>
        )}
      </div>
      {soal?.meta && soal?.meta?.total > 9 ? (
        <Pagination
          pageSize={soal?.meta.limit as number}
          totalCount={soal?.meta.total as number}
          currentPage={params.page !== '' ? parseInt(params.page) : 1}
          onPageChange={(page) => createParam({ key: 'page', value: page.toString() })}
        />
      ) : null}
    </section>
  )
}
