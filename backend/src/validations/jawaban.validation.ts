import Joi from 'joi'
import { IAnswerBody, IBody } from '../types/jawaban.type'

export const validAnswers = (payload: IAnswerBody) => {
  const schema = Joi.object<IAnswerBody>({
    id_soal: Joi.string().required(),
    answers: Joi.array().items(
      Joi.object<IBody>({
        answer: Joi.alternatives().try(
          Joi.string().allow(''), // Mengizinkan string kosong
          Joi.array()
            .items(
              Joi.object({
                value: Joi.string(),
                checked: Joi.boolean()
              })
            )
            .allow(null), // Jika ingin mengizinkan array null
          Joi.allow(null) // Jika ingin mengizinkan nilai null
        ),
        id_detail_soal: Joi.string().required()
      })
    )
  })

  return schema.validate(payload)
}
