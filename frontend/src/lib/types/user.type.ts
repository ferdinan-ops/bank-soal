export type UserRole = 'ADMIN' | 'GURU' | 'SISWA'

export type UserType = {
  id: string
  fullname: string
  email: string
  photo?: string
  provider?: string
  role: UserRole
}
