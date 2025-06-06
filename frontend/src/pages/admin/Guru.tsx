import * as React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useDialog } from '@/store/client/useDialog'
import { useCreateGuru, useDeleteGuru, useGetGuru, useUpdateGuru } from '@/store/server/useGuru'

import { GuruType } from '@/lib/types/guru.type'
import { GuruBodyType, guruBodyValidation } from '@/lib/validations/guru.validation'

import { useRemovePointerEvent, useTitle } from '@/hooks'

import { Password } from '@/components/atoms'
import { FormModal, Section } from '@/components/organisms'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

export default function Guru() {
  useTitle('Daftar Guru')

  const { dialog } = useDialog()
  const form = useForm<GuruBodyType>({
    mode: 'onTouched',
    resolver: yupResolver(guruBodyValidation)
  })

  const [id, setId] = React.useState('')
  const [openModal, setOpenModal] = React.useState(false)

  useRemovePointerEvent(openModal)

  React.useEffect(() => {
    if (!openModal) {
      form.reset({ nip: '', fullname: '', email: '', password: '' })
      setId('')
    }
  }, [openModal, form])

  const { data: guru, isLoading } = useGetGuru()
  const { mutate: createGuru, isLoading: loadingCreate } = useCreateGuru()
  const { mutateAsync: deleteGuru, isLoading: loadingDelete } = useDeleteGuru()
  const { mutateAsync: updateGuru, isLoading: loadingUpdate } = useUpdateGuru()

  const onSuccess = () => {
    form.reset()
    setId('')
    setOpenModal(false)
  }

  const onSubmit = (data: GuruBodyType) => {
    if (!id) {
      return createGuru(data, { onSuccess })
    }

    const payload = { id, ...data }
    updateGuru(payload, { onSuccess })
  }

  const handleEdit = (data: GuruType) => {
    setId(data.id)
    form.setValue('nip', data.guru.nip)
    form.setValue('fullname', data.fullname)
    form.setValue('email', data.email)
    setOpenModal(true)
  }

  const handleDelete = (id: string) => {
    void dialog({
      title: 'Apa kamu yakin?',
      description: 'Guru yang telah dihapus tidak dapat dikembalikan',
      variant: 'danger',
      submitText: 'Delete'
    }).then(async () => {
      await deleteGuru(id)
    })
  }

  return (
    <Section isLoading={isLoading || loadingDelete}>
      <Section.Head title="Daftar Guru" desc="Berikut adalah daftar guru yang telah didaftarkan.">
        <FormModal
          title={id ? 'Ubah Guru' : 'Tambah Guru'}
          desc="Silahkan isi seluruh data dengan benar."
          open={openModal}
          onOpenChange={setOpenModal}
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-2 grid items-start gap-4">
              <FormField
                name="nip"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">NIP</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="1201234567" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="fullname"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Nama lengkap</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="John Doe" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" placeholder="a7u9M@example.com" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Password</FormLabel>
                    <FormControl>
                      <Password {...field} placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;" />
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
        <Section.Table headers={['#', 'NIP', 'Nama Lengkap', 'Email']} dataLength={guru?.length || 0}>
          {guru?.map((item, index) => (
            <Section.Row
              key={item.id}
              details={[
                { type: 'edit', onClick: () => handleEdit(item) },
                { type: 'delete', onClick: () => handleDelete(item.id) }
              ]}
            >
              <Section.Cell>{index + 1}</Section.Cell>
              <Section.Cell>{item.guru.nip}</Section.Cell>
              <Section.Cell>{item.fullname}</Section.Cell>
              <Section.Cell>{item.email}</Section.Cell>
            </Section.Row>
          ))}
        </Section.Table>
      </Section.Body>
    </Section>
  )
}
