import Joi, { options } from 'joi'

import { IDetailSoal, ISoal } from '../types/soal.type'

export const validSoal = (payload: ISoal) => {
  const schema = Joi.object<ISoal>({
    id_mengajar: Joi.string().required(),
    semester: Joi.string().required(),

    tanggal_ujian: Joi.string().required(),
    lama_pengerjaan: Joi.number().required(),
    mulai_ujian: Joi.string().required(),
    selesai_ujian: Joi.string().required()
  })

  return schema.validate(payload)
}

export const validDetailSoal = (payload: IDetailSoal) => {
  const schema = Joi.object<IDetailSoal>({
    text: Joi.string().required(),
    options: Joi.array()
      .items(Joi.object({ value: Joi.string().required() }))
      .required(),
    correct_answers: Joi.array()
      .items(
        Joi.object({
          value: Joi.string().required(),
          checked: Joi.boolean().allow(null)
        })
      )
      .required(),
    id_soal: Joi.string()
  })

  return schema.validate(payload)
}
