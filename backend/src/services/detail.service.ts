import db from '../utils/db'
import { IDetailSoal } from '../types/soal.type'

export const storeDetailSoal = async (payload: IDetailSoal) => {
  const options = JSON.stringify(payload.options)
  const correctAnswers = JSON.stringify(payload.correct_answers)

  return await db.detailSoal.createMany({
    data: {
      ...payload,
      options,
      correct_answers: correctAnswers
    }
  })
}

export const changeDetailSoalById = async (id: string, payload: IDetailSoal) => {
  const { options, correct_answers: correctAnswer, ...rest } = payload

  const optionsJson = JSON.stringify(options)
  const correctAnswerJson = JSON.stringify(correctAnswer)

  return await db.detailSoal.update({
    where: { id },
    data: {
      ...rest,
      options: optionsJson,
      correct_answers: correctAnswerJson
    }
  })
}

export const removeDetailSoalById = async (id: string) => {
  return await db.detailSoal.delete({ where: { id } })
}

export const fetchDetailSoal = async (idSoal: string) => {
  return await db.detailSoal.findMany({
    where: { id_soal: idSoal }
  })
}

export const fetchDetailDetailSoal = async (id: string) => {
  return await db.detailSoal.findUnique({
    where: { id }
  })
}

export const fetchDetailSoalForUser = async (id: string) => {
  return await db.detailSoal.findUnique({
    where: { id },
    select: {
      id: true,
      text: true,
      options: true
    }
  })
}

/**
 * Fungsi untuk mengacak array menggunakan metode Linear Congruent Method (LCM)
 * @param array - Array yang akan diacak
 * @param a - Multiplier (1103515245, nilai standar dari ANSI C rand())
 * @param c - Increment (12345, nilai standar untuk menghindari siklus pendek)
 * @param m - Modulus (2^31, batas integer 32-bit)
 * @param seed - Nilai awal untuk random generator (menggunakan timestamp saat ini)
 * @returns Array yang telah diacak
 */
export const LCMShuffle = <T>(array: T[], a: number, c: number, m: number, seed: number): T[] => {
  let Xn = seed % m // Inisialisasi nilai awal X0 dengan seed yang dimodulus m
  const shuffledArray = [...array] // Menyalin array agar tidak mengubah aslinya

  // Implementasi Fisher-Yates Shuffle dengan indeks yang diacak menggunakan LCM
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    Xn = (a * Xn + c) % m // Menghitung nilai acak baru menggunakan LCM
    const j = Xn % (i + 1) // Menghasilkan indeks acak dalam rentang [0, i]

    // Menukar posisi elemen ke-i dengan elemen ke-j
    ;[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
  }

  return shuffledArray // Mengembalikan array yang sudah diacak
}
