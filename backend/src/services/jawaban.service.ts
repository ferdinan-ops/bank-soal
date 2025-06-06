import logger from '../utils/logger'
import { IAnswerPayload, IHasil } from '../types/jawaban.type'
import db from '../utils/db'
import { userSelect } from '../utils/service'
import { IGetParams } from '../types/params.type'

export const getSiswaByUserId = async (userId: string) => {
  return await db.user.findUnique({
    where: { id: userId },
    select: {
      siswa: {
        select: {
          id: true
        }
      }
    }
  })
}

export const getAnswersByUserId = async (userId: string, idSoal: string) => {
  const user = await getSiswaByUserId(userId)

  const hasil = await db.hasil.findFirst({
    where: { id_soal: idSoal, id_siswa: user?.siswa?.id }
  })

  if (hasil) {
    return await db.jawaban.findMany({
      where: { id_hasil: hasil?.id },
      include: {
        detail_soal: true
      }
    })
  }

  return []
}

export const fetchAllAnswerByUserId = async (userId: string, search: string) => {
  const user = await getSiswaByUserId(userId)

  return await db.hasil.findMany({
    where: {
      id_siswa: user?.siswa?.id,
      soal: {
        OR: [
          // { mata_pelajaran: { contains: search } },
          // { jurusan: { contains: search } },
          // { nama_guru: { contains: search } },
          // { kategori: { contains: search } },
          // { kelas: { contains: search } },
          // { tahun_ajaran: { contains: search } },
          { semester: { contains: search } }
        ]
      }
    },
    include: {
      soal: true,
      answers: true,
      siswa: {
        select: {
          user: true
        }
      }
    }
  })
}

export const addNewAnswer = async (payload: { id_hasil: string } & IAnswerPayload) => {
  logger.info(payload)
  return await db.jawaban.create({ data: payload })
}

export const addNewHasil = async (payload: IHasil) => {
  return await db.hasil.create({
    data: payload
  })
}

export const getCorrectAnswers = async (idDetailSoal: string) => {
  return await db.detailSoal.findUnique({
    where: { id: idDetailSoal },
    select: {
      correct_answers: true,
      id: true
    }
  })
}

export const checkAnswer = (answer: string | undefined, correctAnswers: string) => {
  if (typeof answer === 'string') {
    const correctAnswersParsed = JSON.parse(correctAnswers)
    return answer.toLocaleLowerCase() === correctAnswersParsed?.[0]?.value?.toLocaleLowerCase()
  }

  return false
}

export const fetchAllAnswerBySoal = async ({ page, limit, search, idSoal }: IGetParams & { idSoal: string }) => {
  const [data, count] = await db.$transaction([
    db.hasil.findMany({
      where: {
        id_soal: idSoal,
        OR: [{ siswa: { user: { fullname: { contains: search } } } }]
      },
      include: {
        answers: true,
        siswa: {
          select: {
            nis: true,
            kelas: {
              select: {
                nama: true,
                id: true,
                jurusan: true
              }
            },
            user: {
              select: userSelect.select
            }
          }
        }
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { siswa: { user: { fullname: 'asc' } } }
    }),
    db.hasil.count({
      where: {
        id_soal: idSoal,
        OR: [{ siswa: { user: { fullname: { contains: search } } } }]
      }
    })
  ])

  return { data, count }
}
