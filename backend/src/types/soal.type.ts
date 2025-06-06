export interface ISoal {
  semester: string
  id_mengajar: string

  tanggal_ujian?: string
  lama_pengerjaan?: number
  mulai_ujian: string
  selesai_ujian: string
}

export interface IDetailSoal {
  text: string
  options: Array<Omit<ICorrectAnswer, 'checked'>>
  correct_answers: ICorrectAnswer[]
  id_soal: string
}

interface ICorrectAnswer {
  value: string
  checked: boolean
}
