import express from 'express'

import { deleteMengajar, getMengajar, updateMengajar, createMengajar } from '../controllers/mengajar.controller'
import verifyJwt, { verifyAdmin } from '../middlewares/verifyJwt'

const mengajarRoute = express.Router()

mengajarRoute.get('/', verifyJwt, getMengajar)
mengajarRoute.post('/', verifyJwt, verifyAdmin, createMengajar)
mengajarRoute.put('/:id', verifyJwt, verifyAdmin, updateMengajar)
mengajarRoute.delete('/:id', verifyJwt, verifyAdmin, deleteMengajar)

export default mengajarRoute
