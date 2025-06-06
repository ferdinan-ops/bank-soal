export interface ICheckbox {
  value: string
  checked: boolean
}

export interface IBody {
  answer?: string
  id_detail_soal: string
}

export interface IAnswerPayload {
  answer: string
  is_correct: boolean
  id_detail_soal: string
}

export interface IHasil {
  id_soal: string
  id_siswa: string
}

export interface IAnswerBody {
  id_soal: string
  answers: IBody[]
}
