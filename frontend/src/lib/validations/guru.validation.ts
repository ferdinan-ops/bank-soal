import * as Yup from 'yup'

export const guruBodyValidation = Yup.object({
  fullname: Yup.string().required('Nama lengkap harus diisi'),
  email: Yup.string().email('Email tidak valid').required('Email harus diisi'),
  password: Yup.string()
    .required('Kata sandi harus diisi')
    .min(8, 'Harus lebih dari 8 karakter')
    .matches(/[a-z]/g, 'Harus mengandung setidaknya 1 huruf kecil')
    .matches(/[A-Z]/g, 'Harus mengandung setidaknya 1 huruf besar')
    .matches(/[0-9]/g, 'Harus mengandung setidaknya 1 angka')
    .matches(/^\S*$/g, 'Tidak boleh mengandung spasi'),
  nip: Yup.string().required('NIP harus diisi')
})

export type GuruBodyType = Yup.InferType<typeof guruBodyValidation>
