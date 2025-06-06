import express from 'express'
import verifyJwt, { verifyAdmin } from '../middlewares/verifyJwt'
import {
  createMataPelajaran,
  deleteMataPelajaran,
  getAllMataPelajaran,
  getMataPelajaran,
  updateMataPelajaran
} from '../controllers/mata-pelajaran.controller'

const mataPelajaranRoute = express.Router()

mataPelajaranRoute.get('/', verifyJwt, getAllMataPelajaran)
mataPelajaranRoute.get('/:id', verifyJwt, getMataPelajaran)

mataPelajaranRoute.post('/', verifyJwt, verifyAdmin, createMataPelajaran)
mataPelajaranRoute.put('/:id', verifyJwt, verifyAdmin, updateMataPelajaran)
mataPelajaranRoute.delete('/:id', verifyJwt, verifyAdmin, deleteMataPelajaran)

export default mataPelajaranRoute
