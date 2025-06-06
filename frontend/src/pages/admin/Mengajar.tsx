import * as React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useUserInfo } from '@/store/client'
import { useGetGuru } from '@/store/server/useGuru'
import { useDialog } from '@/store/client/useDialog'
import { useGetKelas } from '@/store/server/useKelas'
import { useGetJurusan } from '@/store/server/useJurusan'
import { useGetMataPelajaran } from '@/store/server/useMataPelajaran'
import { useCreateMengajar, useDeleteMengajar, useGetMengajar, useUpdateMengajar } from '@/store/server/useMengajar'

import { UserRole } from '@/lib/constant'
import { MengajarBodyType, MengajarType } from '@/lib/types/mengajar.type'

import { useRemovePointerEvent, useTitle } from '@/hooks'

import { FormModal, Section } from '@/components/organisms'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function Mengajar() {
  useTitle('Daftar Mengajar')

  const navigate = useNavigate()
  const user = useUserInfo((state) => state.user)
  const { dialog } = useDialog()

  const form = useForm<MengajarBodyType & { id_jurusan: string }>()
  const idJurusan = form.watch('id_jurusan')

  const [id, setId] = React.useState('')
  const [openModal, setOpenModal] = React.useState(false)

  useRemovePointerEvent(openModal)

  React.useEffect(() => {
    if (!openModal) {
      form.reset({ tahun_ajaran: '', id_guru: '', id_mata_pelajaran: '', id_kelas: '', id_jurusan: '' })
      setId('')
    }
  }, [openModal, form])

  const { data: mengajar, isLoading } = useGetMengajar()
  const { mutate: createMengajar, isLoading: loadingCreate } = useCreateMengajar()
  const { mutateAsync: deleteMengajar, isLoading: loadingDelete } = useDeleteMengajar()
  const { mutateAsync: updateMengajar, isLoading: loadingUpdate } = useUpdateMengajar()

  const { data: jurusan } = useGetJurusan(user.role === UserRole.ADMIN)
  const { data: kelas } = useGetKelas(idJurusan)
  const { data: mataPelajaran } = useGetMataPelajaran(user.role === UserRole.ADMIN)
  const { data: guru } = useGetGuru(user.role === UserRole.ADMIN)

  const onSuccess = () => {
    form.reset({ tahun_ajaran: '', id_guru: '', id_mata_pelajaran: '', id_kelas: '', id_jurusan: '' })
    setId('')
    setOpenModal(false)
  }

  const onSubmit = (data: MengajarBodyType & { id_jurusan: string }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id_jurusan, ...rest } = data

    if (!id) {
      return createMengajar(rest, { onSuccess })
    }

    const payload = { id, ...rest }
    updateMengajar(payload, { onSuccess })
  }

  const handleEdit = (data: MengajarType) => {
    setId(data.id)
    form.setValue('tahun_ajaran', data.tahun_ajaran)
    form.setValue('id_guru', data.id_guru)
    form.setValue('id_mata_pelajaran', data.id_mata_pelajaran)
    form.setValue('id_jurusan', data.kelas.id_jurusan)
    form.setValue('id_kelas', data.id_kelas)
    setOpenModal(true)
  }

  const handleDelete = (id: string) => {
    void dialog({
      title: 'Apa kamu yakin?',
      description: 'Mengajar yang telah dihapus tidak dapat dikembalikan',
      variant: 'danger',
      submitText: 'Delete'
    }).then(async () => {
      await deleteMengajar(id)
    })
  }

  return (
    <Section isLoading={isLoading || loadingDelete}>
      <Section.Head title="Daftar Mengajar" desc="Berikut adalah daftar mengajar yang telah didaftarkan.">
        {user.role === UserRole.ADMIN && (
          <FormModal
            title={id ? 'Ubah Mengajar' : 'Tambah Mengajar'}
            desc="Silahkan isi seluruh data dengan benar."
            className="sm:max-w-[620px]"
            open={openModal}
            onOpenChange={setOpenModal}
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="mt-2 grid items-start gap-4">
                <FormField
                  name="tahun_ajaran"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Tahun Ajaran</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="2020/2021" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    name="id_jurusan"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="flex items-center gap-2 font-semibold dark:text-white">Jurusan</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="capitalize">
                              <SelectValue placeholder="Pilih jurusan" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {jurusan?.map((item) => (
                              <SelectItem
                                value={item.id}
                                key={item.id}
                                className="cursor-pointer font-semibold capitalize"
                              >
                                {item.nama}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="id_kelas"
                    disabled={!idJurusan}
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="flex items-center gap-2 font-semibold dark:text-white">Kelas</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!idJurusan}>
                          <FormControl>
                            <SelectTrigger className="capitalize">
                              <SelectValue placeholder="Pilih kelas" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {kelas?.map((item) => (
                              <SelectItem
                                value={item.id}
                                key={item.id}
                                className="cursor-pointer font-semibold capitalize"
                              >
                                {item.nama}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="id_mata_pelajaran"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="flex items-center gap-2 font-semibold dark:text-white">
                          Mata pelajaran
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="capitalize">
                              <SelectValue placeholder="Pilih mata pelajaran" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {mataPelajaran?.map((item) => (
                              <SelectItem
                                value={item.id}
                                key={item.id}
                                className="cursor-pointer font-semibold capitalize"
                              >
                                {item.nama}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="id_guru"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="flex items-center gap-2 font-semibold dark:text-white">Guru</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="capitalize">
                              <SelectValue placeholder="Pilih guru" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {guru?.map((item) => (
                              <SelectItem
                                value={item.guru.id}
                                key={item.id}
                                className="cursor-pointer font-semibold capitalize"
                              >
                                {item.fullname}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button loading={loadingCreate || loadingUpdate} type="submit">
                  {id ? 'Ubah' : 'Tambah'}
                </Button>
              </form>
            </Form>
          </FormModal>
        )}
      </Section.Head>

      <Section.Body>
        <Section.Table
          headers={['#', 'Mata Pelajaran', 'Tahun Ajaran', 'Jurusan', 'Kelas', 'Pengajar']}
          dataLength={mengajar?.length || 0}
        >
          {mengajar?.map((item, index) => (
            <Section.Row
              key={item.id}
              details={
                user.role === UserRole.ADMIN
                  ? [
                      { type: 'edit', onClick: () => handleEdit(item) },
                      { type: 'delete', onClick: () => handleDelete(item.id) }
                    ]
                  : [
                      {
                        type: 'detail',
                        label: 'Lihat daftar soal',
                        onClick: () => navigate(`/mengajar/${item.id}/soal`)
                      }
                    ]
              }
            >
              <Section.Cell>{index + 1}</Section.Cell>
              <Section.Cell>{item.mata_pelajaran.nama}</Section.Cell>
              <Section.Cell>{item.tahun_ajaran}</Section.Cell>
              <Section.Cell>{item.kelas.jurusan.nama}</Section.Cell>
              <Section.Cell>{item.kelas.nama}</Section.Cell>
              <Section.Cell>{item.guru.user.fullname}</Section.Cell>
            </Section.Row>
          ))}
        </Section.Table>
      </Section.Body>
    </Section>
  )
}
