import * as Yup from 'yup'

export const registerValidation = Yup.object({
  fullname: Yup.string().required('Nama lengkap harus diisi'),
  email: Yup.string().email('Email tidak valid').required('Email harus diisi'),
  id_kelas: Yup.string().required('Kelas harus diisi'),
  nis: Yup.string().required('NIS harus diisi'),
  id_jurusan: Yup.string().required('Jurusan harus diisi'),
  password: Yup.string()
    .required('Kata sandi harus diisi')
    .min(8, 'Harus lebih dari 8 karakter')
    .matches(/[a-z]/g, 'Harus mengandung setidaknya 1 huruf kecil')
    .matches(/[A-Z]/g, 'Harus mengandung setidaknya 1 huruf besar')
    .matches(/[0-9]/g, 'Harus mengandung setidaknya 1 angka')
    .matches(/^\S*$/g, 'Tidak boleh mengandung spasi')
})

export type RegisterType = Yup.InferType<typeof registerValidation>

export const verifyEmailValidation = Yup.object({
  token: Yup.string().required('Kode verifikasi harus diisi')
})

export type VerifyEmailType = Yup.InferType<typeof verifyEmailValidation>

export const loginValidation = Yup.object({
  email: Yup.string().email('Email tidak valid').required('Email harus diisi'),
  password: Yup.string().required('Kata sandi harus diisi')
})

export type LoginType = Yup.InferType<typeof loginValidation>

export const forgotPasswordValidation = Yup.object({
  email: Yup.string().email('Email tidak valid').required('Email harus diisi')
})

export type ForgotPasswordType = Yup.InferType<typeof forgotPasswordValidation>

export const resetPasswordValidation = Yup.object({
  token: Yup.string().required('Token harus diisi'),
  password: Yup.string()
    .required('Kata sandi harus diisi')
    .min(8, 'Harus lebih dari 8 karakter')
    .matches(/[a-z]/g, 'Harus mengandung setidaknya 1 huruf kecil')
    .matches(/[A-Z]/g, 'Harus mengandung setidaknya 1 huruf besar')
    .matches(/[0-9]/g, 'Harus mengandung setidaknya 1 angka')
    .matches(/^\S*$/g, 'Tidak boleh mengandung spasi'),
  confirmPassword: Yup.string()
    .required('Konfirmasi kata sandi harus diisi')
    .oneOf([Yup.ref('password')], 'Kata sandi harus cocok')
})

export type ResetPasswordType = {
  token?: string
  password: string
  confirmPassword: string
}

export const changePasswordValidation = Yup.object({
  password: Yup.string()
    .required('Kata sandi harus diisi')
    .min(8, 'Harus lebih dari 8 karakter')
    .matches(/[a-z]/g, 'Harus mengandung setidaknya 1 huruf kecil')
    .matches(/[A-Z]/g, 'Harus mengandung setidaknya 1 huruf besar')
    .matches(/[0-9]/g, 'Harus mengandung setidaknya 1 angka')
    .matches(/^\S*$/g, 'Tidak boleh mengandung spasi'),
  confirmPassword: Yup.string()
    .required('Konfirmasi kata sandi harus diisi')
    .oneOf([Yup.ref('password')], 'Kata sandi harus cocok')
})

export type ChangePasswordType = Yup.InferType<typeof changePasswordValidation>
