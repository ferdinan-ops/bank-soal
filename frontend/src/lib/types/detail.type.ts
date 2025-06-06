export type DetailSoalFormFieldsType = {
  text: string
  type: string
  options: { value: string }[]
  correctAnswer: { value: string; checked?: boolean }[]
}

export type DetailSoalType = {
  id: string
  correct_answers: { value: string; checked?: boolean }[]
} & Omit<DetailSoalFormFieldsType, 'correctAnswer'>
