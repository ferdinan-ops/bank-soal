import { type Application, type Router } from 'express'

import authRoute from './auth.route'
import soalRoute from './soal.route'
import detailSoalRoute from './detail.route'
import answerRoute from './jawaban.route'
import userRoute from './user.route'
import guruRoute from './guru.route'
import jurusanRoute from './jurusan.route'
import kelasRoute from './kelas.route'
import mataPelajaranRoute from './mata-pelajaran.route'
import mengajarRoute from './mengajar.route'

const _routes = [
  ['/auth', authRoute],
  ['/soal', soalRoute],
  ['/detail-soal', detailSoalRoute],
  ['/jawaban', answerRoute],
  ['/user', userRoute],
  ['/guru', guruRoute],
  ['/jurusan', jurusanRoute],
  ['/kelas', kelasRoute],
  ['/mata-pelajaran', mataPelajaranRoute],
  ['/mengajar', mengajarRoute]
]

const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, router] = route
    app.use(url as string, router as Router)
  })
}

export default routes
