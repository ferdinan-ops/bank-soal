import express from 'express'
import verifyJwt, { verifyAdmin } from '../middlewares/verifyJwt'
import { createKelas, deleteKelas, getKelas, updateKelas } from '../controllers/kelas.controller'

const kelasRoute = express.Router()

kelasRoute.get('/:idJurusan', getKelas)
kelasRoute.post('/', verifyJwt, verifyAdmin, createKelas)
kelasRoute.put('/:id', verifyJwt, verifyAdmin, updateKelas)
kelasRoute.delete('/:id', verifyJwt, verifyAdmin, deleteKelas)

export default kelasRoute
