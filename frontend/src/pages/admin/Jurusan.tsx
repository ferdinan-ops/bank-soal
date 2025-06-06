import * as React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useRemovePointerEvent, useTitle } from '@/hooks'

import { useDialog } from '@/store/client/useDialog'
import { useCreateJurusan, useDeleteJurusan, useGetJurusan, useUpdateJurusan } from '@/store/server/useJurusan'

import { JurusanBodyType, JurusanType } from '@/lib/types/jurusan.type'

import { FormModal, Section } from '@/components/organisms'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

export default function Jurusan() {
  useTitle('Daftar Jurusan')

  const navigate = useNavigate()
  const { dialog } = useDialog()
  const form = useForm<JurusanBodyType>()

  const [id, setId] = React.useState('')
  const [openModal, setOpenModal] = React.useState(false)

  useRemovePointerEvent(openModal)

  React.useEffect(() => {
    if (!openModal) {
      form.reset()
      setId('')
    }
  }, [openModal, form])

  const { data: jurusan, isLoading } = useGetJurusan()
  const { mutate: createJurusan, isLoading: loadingCreate } = useCreateJurusan()
  const { mutateAsync: deleteJurusan, isLoading: loadingDelete } = useDeleteJurusan()
  const { mutateAsync: updateJurusan, isLoading: loadingUpdate } = useUpdateJurusan()

  const onSuccess = () => {
    form.reset()
    setId('')
    setOpenModal(false)
  }

  const onSubmit = (data: JurusanBodyType) => {
    if (!id) {
      return createJurusan(data, { onSuccess })
    }

    const payload = { id, ...data }
    updateJurusan(payload, { onSuccess })
  }

  const handleEdit = (data: JurusanType) => {
    setId(data.id)
    form.setValue('nama', data.nama)
    setOpenModal(true)
  }

  const handleDelete = (id: string) => {
    void dialog({
      title: 'Apa kamu yakin?',
      description: 'Jurusan yang telah dihapus tidak dapat dikembalikan',
      variant: 'danger',
      submitText: 'Delete'
    }).then(async () => {
      await deleteJurusan(id)
    })
  }

  return (
    <Section isLoading={isLoading || loadingDelete}>
      <Section.Head title="Daftar Jurusan" desc="Berikut adalah daftar jurusan yang telah didaftarkan.">
        <FormModal
          title={id ? 'Ubah Jurusan' : 'Tambah Jurusan'}
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
                    <FormLabel className="font-semibold">Nama Jurusan</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Nama Jurusan" />
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
        <Section.Table headers={['#', 'Id Jurusan', 'Jurusan']} dataLength={jurusan?.length || 0}>
          {jurusan?.map((item, index) => (
            <Section.Row
              key={item.id}
              details={[
                { type: 'detail', label: 'Lihat kelas', onClick: () => navigate(`/jurusan/${item.id}`) },
                { type: 'edit', onClick: () => handleEdit(item) },
                { type: 'delete', onClick: () => handleDelete(item.id) }
              ]}
            >
              <Section.Cell>{index + 1}</Section.Cell>
              <Section.Cell>{item.id}</Section.Cell>
              <Section.Cell>{item.nama}</Section.Cell>
            </Section.Row>
          ))}
        </Section.Table>
      </Section.Body>
    </Section>
  )
}
