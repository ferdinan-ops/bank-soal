import express from 'express'
import { createAnswers, getAnswers, getAnswersBySoal, getAnswersByUserId } from '../controllers/jawaban.controller'
import verifyJwt, { verifyAdmin } from '../middlewares/verifyJwt'

const answerRoute = express.Router()

answerRoute.get('/:idSoal', verifyJwt, getAnswers)
answerRoute.get('/soal/:idSoal', verifyJwt, getAnswersBySoal)
answerRoute.get('/user/:userId', verifyJwt, verifyAdmin, getAnswersByUserId)
answerRoute.post('/', verifyJwt, createAnswers)

export default answerRoute
