import express from 'express'
import verifyJwt, { verifyGuru } from '../middlewares/verifyJwt'
import {
  createSoal,
  deleteSoal,
  getDetailSoal,
  getSoal,
  getSoalByMengajar,
  updateSoal
} from '../controllers/soal.controller'

const soalRoute = express.Router()

soalRoute.post('/', verifyJwt, verifyGuru, createSoal)
soalRoute.put('/:idSoal', verifyJwt, verifyGuru, updateSoal)
soalRoute.delete('/:idSoal', verifyJwt, verifyGuru, deleteSoal)

soalRoute.get('/', verifyJwt, getSoal)
soalRoute.get('/:idSoal', verifyJwt, getDetailSoal)
soalRoute.get('/mengajar/:idMengajar', verifyJwt, getSoalByMengajar)

export default soalRoute
