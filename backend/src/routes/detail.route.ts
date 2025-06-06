import express from 'express'
import verifyJwt, { verifyAdmin, verifyGuru } from '../middlewares/verifyJwt'
import {
  createDetailSoal,
  deleteDetailSoal,
  getDetailSoal,
  getDetailSoalForUser,
  updateDetailSoal
} from '../controllers/detail.controller'

const detailSoalRoute = express.Router()

detailSoalRoute.post('/', verifyJwt, verifyGuru, createDetailSoal)
detailSoalRoute.put('/:id', verifyJwt, verifyGuru, updateDetailSoal)
detailSoalRoute.delete('/:id', verifyJwt, verifyGuru, deleteDetailSoal)

detailSoalRoute.get('/soal/:idSoal', verifyJwt, getDetailSoal)
detailSoalRoute.get('/soal/:idSoal/user', verifyJwt, getDetailSoalForUser)

export default detailSoalRoute
