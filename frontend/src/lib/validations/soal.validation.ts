import * as Yup from 'yup'

export const soalValidation = Yup.object({
  semester: Yup.string().required('Semester harus diisi'),
  tanggal_ujian: Yup.date().required('Tanggal ujian harus diisi'),
  lama_pengerjaan: Yup.number().required('Lama pengerjaan harus diisi'),
  mulai_ujian: Yup.string().required('Mulai ujian harus diisi'),
  selesai_ujian: Yup.string().required('Selesai ujian harus diisi')
})

export type SoalPayloadType = Yup.InferType<typeof soalValidation>
