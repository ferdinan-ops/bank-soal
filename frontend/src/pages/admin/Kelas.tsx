import * as React from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { useDialog } from '@/store/client/useDialog'
import { useCreateKelas, useDeleteKelas, useGetKelas, useUpdateKelas } from '@/store/server/useKelas'

import { useRemovePointerEvent, useTitle } from '@/hooks'
import { KelasBodyType, KelasType } from '@/lib/types/kelas.type'

import { BackButton } from '@/components/atoms'
import { FormModal, Section } from '@/components/organisms'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

export default function Kelas() {
  useTitle('Daftar Kelas')
  const { id: idJurusan } = useParams<{ id: string }>()

  const { dialog } = useDialog()
  const form = useForm<Omit<KelasBodyType, 'id_jurusan'>>()

  const [id, setId] = React.useState('')
  const [openModal, setOpenModal] = React.useState(false)

  useRemovePointerEvent(openModal)

  React.useEffect(() => {
    if (!openModal) {
      form.reset()
      setId('')
    }
  }, [openModal, form])

  const { data: kelas, isLoading } = useGetKelas(idJurusan as string)

  const { mutate: createKelas, isLoading: loadingCreate } = useCreateKelas()
  const { mutateAsync: deleteKelas, isLoading: loadingDelete } = useDeleteKelas()
  const { mutateAsync: updateKelas, isLoading: loadingUpdate } = useUpdateKelas()

  const onSuccess = () => {
    form.reset()
    setId('')
    setOpenModal(false)
  }

  const onSubmit = (data: Omit<KelasBodyType, 'id_jurusan'>) => {
    if (!id) {
      const payload = { id_jurusan: idJurusan as string, ...data }
      return createKelas(payload, { onSuccess })
    }

    const payload = { id, id_jurusan: idJurusan as string, ...data }
    updateKelas(payload, { onSuccess })
  }

  const handleEdit = (data: KelasType) => {
    setId(data.id)
    form.setValue('nama', data.nama)
    setOpenModal(true)
  }

  const handleDelete = (id: string) => {
    void dialog({
      title: 'Apa kamu yakin?',
      description: 'Kelas yang telah dihapus tidak dapat dikembalikan',
      variant: 'danger',
      submitText: 'Delete'
    }).then(async () => {
      await deleteKelas(id)
    })
  }

  return (
    <Section isLoading={isLoading || loadingDelete}>
      <BackButton />
      <Section.Head title="Daftar Kelas" desc="Berikut adalah daftar kelas yang telah didaftarkan.">
        <FormModal
          title={id ? 'Ubah Kelas' : 'Tambah Kelas'}
          desc="Silahkan isi seluruh data dengan benar."
          open={openModal}
          onOpenChange={setOpenModal}
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-2 grid items-start gap-4">
              <FormField
                name="nama"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Nama Kelas</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Nama Kelas" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button loading={loadingCreate || loadingUpdate} type="submit">
                {id ? 'Ubah' : 'Tambah'}
              </Button>
            </form>
          </Form>
        </FormModal>
      </Section.Head>

      <Section.Body>
        <Section.Table headers={['#', 'Id Kelas', 'Kelas', 'Jurusan']} dataLength={kelas?.length || 0}>
          {kelas?.map((item, index) => (
            <Section.Row
              key={item.id}
              details={[
                { type: 'edit', onClick: () => handleEdit(item) },
                { type: 'delete', onClick: () => handleDelete(item.id) }
              ]}
            >
              <Section.Cell>{index + 1}</Section.Cell>
              <Section.Cell>{item.id}</Section.Cell>
              <Section.Cell>{item.nama}</Section.Cell>
              <Section.Cell>{item.jurusan.nama}</Section.Cell>
            </Section.Row>
          ))}
        </Section.Table>
      </Section.Body>
    </Section>
  )
}
