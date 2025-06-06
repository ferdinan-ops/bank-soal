declare namespace Express {
  interface Request {
    userId?: string
    role?: 'ADMIN' | 'GURU' | 'SISWA'
  }
}
