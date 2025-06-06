import express from 'express'
import verifyJwt, { verifyAdmin } from '../middlewares/verifyJwt'
import { createJurusan, deleteJurusan, getJurusan, updateJurusan } from '../controllers/jurusan.controller'

const jurusanRoute = express.Router()

jurusanRoute.get('/', getJurusan)
jurusanRoute.post('/', verifyJwt, verifyAdmin, createJurusan)
jurusanRoute.put('/:id', verifyJwt, verifyAdmin, updateJurusan)
jurusanRoute.delete('/:id', verifyJwt, verifyAdmin, deleteJurusan)

export default jurusanRoute
