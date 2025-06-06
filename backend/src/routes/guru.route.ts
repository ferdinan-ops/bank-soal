import express from 'express'

import { deleteGuru, getGuru, register, updateGuru } from '../controllers/guru.controller'
import verifyJwt, { verifyAdmin } from '../middlewares/verifyJwt'

const guruRoute = express.Router()

guruRoute.get('/', verifyJwt, verifyAdmin, getGuru)
guruRoute.post('/', verifyJwt, verifyAdmin, register)
guruRoute.put('/:id', verifyJwt, verifyAdmin, updateGuru)
guruRoute.delete('/:id', verifyJwt, verifyAdmin, deleteGuru)

export default guruRoute
