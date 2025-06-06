import * as React from 'react'
import { useForm } from 'react-hook-form'

import {
  useCreateMataPelajaran,
  useDeleteMataPelajaran,
  useGetMataPelajaran,
  useUpdateMataPelajaran
} from '@/store/server/useMataPelajaran'
import { useDialog } from '@/store/client/useDialog'

import { useRemovePointerEvent, useTitle } from '@/hooks'
import { MataPelajaranBodyType, MataPelajaranType } from '@/lib/types/mata-pelajaran.type'

import { FormModal, Section } from '@/components/organisms'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

export default function MataPelajaran() {
  useTitle('Daftar MataPelajaran')

  const { dialog } = useDialog()
  const form = useForm<MataPelajaranBodyType>()

  const [id, setId] = React.useState('')
  const [openModal, setOpenModal] = React.useState(false)

  useRemovePointerEvent(openModal)

  React.useEffect(() => {
    if (!openModal) {
      form.setValue('nama', '')
      setId('')
    }
  }, [openModal, form])

  const { data: mataPelajaran, isLoading } = useGetMataPelajaran()
  const { mutate: createMataPelajaran, isLoading: loadingCreate } = useCreateMataPelajaran()
  const { mutateAsync: deleteMataPelajaran, isLoading: loadingDelete } = useDeleteMataPelajaran()
  const { mutateAsync: updateMataPelajaran, isLoading: loadingUpdate } = useUpdateMataPelajaran()

  const onSuccess = () => {
    form.setValue('nama', '')
    setId('')
    setOpenModal(false)
  }

  const onSubmit = (data: MataPelajaranBodyType) => {
    if (!id) {
      return createMataPelajaran(data, { onSuccess })
    }

    const payload = { id, ...data }
    updateMataPelajaran(payload, { onSuccess })
  }

  const handleEdit = (data: MataPelajaranType) => {
    setId(data.id)
    form.setValue('nama', data.nama)
    setOpenModal(true)
  }

  const handleDelete = (id: string) => {
    void dialog({
      title: 'Apa kamu yakin?',
      description: 'Mata Pelajaran yang telah dihapus tidak dapat dikembalikan',
      variant: 'danger',
      submitText: 'Delete'
    }).then(async () => {
      await deleteMataPelajaran(id)
    })
  }

  return (
    <Section isLoading={isLoading || loadingDelete}>
      <Section.Head title="Daftar Mata pelajaran" desc="Berikut adalah daftar mata pelajaran yang telah didaftarkan.">
        <FormModal
          title={id ? 'Ubah Mata pelajaran' : 'Tambah Mata pelajaran'}
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
                    <FormLabel className="font-semibold">Nama mata pelajaran</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Nama mata pelajaran" />
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
        <Section.Table headers={['#', 'Id Mata Pelajaran', 'Mata Pelajaran']} dataLength={mataPelajaran?.length || 0}>
          {mataPelajaran?.map((item, index) => (
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
            </Section.Row>
          ))}
        </Section.Table>
      </Section.Body>
    </Section>
  )
}
