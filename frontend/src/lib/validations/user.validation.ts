import * as Yup from 'yup'

export const editUserValidation = Yup.object({
  fullname: Yup.string().required('Fullname is required')
})

export type EditUserType = Yup.InferType<typeof editUserValidation>

export const changePasswordValidation = Yup.object({
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Must be more than 8 characters')
    .matches(/[a-z]/g, 'Must contain at least 1 lowercase letter')
    .matches(/[A-Z]/g, 'Must contain at least 1 uppercase letter')
    .matches(/[0-9]/g, 'Must contain at least 1 number')
    .matches(/^\S*$/g, 'Cannot contain spaces'),
  confirmPassword: Yup.string()
    .required('Confirm password is required')
    .oneOf([Yup.ref('password')], 'Password must match')
})

export type ChangePasswordType = Yup.InferType<typeof changePasswordValidation>

export const updateEmailValidation = Yup.object({
  email: Yup.string().email('Email is not valid').required('Email is required')
})

export type UpdateEmailType = Yup.InferType<typeof updateEmailValidation>

export const changeProfilePicValidation = Yup.object({
  photo: Yup.mixed().required('Profile picture is required')
})

export type ChangeProfilePicType = Yup.InferType<typeof changeProfilePicValidation>
