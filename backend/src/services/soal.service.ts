import db from '../utils/db'
import { ISoal } from '../types/soal.type'
import { IGetParams } from '../types/params.type'
import { UserRole } from '.prisma/client'

export const storeSoal = async (payload: ISoal) => {
  return await db.soal.create({ data: payload })
}

export const changeSoal = async (idSoal: string, payload: ISoal) => {
  return await db.soal.update({
    where: { id: idSoal },
    data: payload
  })
}

export const removeSoal = async (idSoal: string) => {
  return await db.soal.delete({ where: { id: idSoal } })
}

export const fetchSoal = async ({
  page,
  limit,
  search,
  userid,
  role,
  idMengajar
}: IGetParams & { userid: string; role: UserRole; idMengajar?: string }) => {
  const today = new Date()
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)

  // let siswaId: string | undefined = undefined
  // if (role === 'SISWA') {
  //   const siswa = await db.siswa.findUnique({
  //     where: { id_user: userid },
  //     select: { id: true }
  //   })
  //   siswaId = siswa?.id
  // }

  const [data, count] = await db.$transaction([
    db.soal.findMany({
      where: {
        ...(idMengajar && { id_mengajar: idMengajar }),
        ...(role === 'GURU' && {
          mengajar: {
            guru: { id_user: userid }
          }
        }),
        ...(role === 'SISWA' && {
          mengajar: {
            kelas: {
              siswa: {
                some: { user: { id: userid } }
              }
            }
          },
          tanggal_ujian: {
            gte: startOfToday,
            lte: endOfToday
          }
          // NOT: {
          //   hasil: {
          //     some: {
          //       id_siswa: siswaId
          //     }
          //   }
          // }
        }),

        OR: [
          { semester: { contains: search } },
          {
            mengajar: {
              mata_pelajaran: {
                OR: [{ nama: { contains: search } }]
              }
            }
          }
        ]
      },
      include: {
        mengajar: {
          select: {
            tahun_ajaran: true,
            mata_pelajaran: true,
            kelas: { include: { jurusan: true } },
            guru: { include: { user: true } }
          }
        },
        hasil: {
          include: {
            siswa: {
              include: { user: true }
            }
          }
        }
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { created_at: 'desc' }
    }),
    db.soal.count({
      where: {
        ...(idMengajar && { id_mengajar: idMengajar }),
        ...(role === 'GURU' && {
          mengajar: {
            guru: { id_user: userid }
          }
        }),
        ...(role === 'SISWA' && {
          mengajar: {
            kelas: {
              siswa: {
                some: { user: { id: userid } }
              }
            }
          },
          tanggal_ujian: {
            gte: startOfToday,
            lte: endOfToday
          }
        }),

        OR: [
          { semester: { contains: search } },
          {
            mengajar: {
              mata_pelajaran: {
                OR: [{ nama: { contains: search } }]
              }
            }
          }
        ]
      }
    })
  ])

  return { data, count }
}

export const fetchDetailSoal = async (idSoal: string) => {
  return await db.soal.findUnique({
    where: { id: idSoal },
    include: {
      mengajar: {
        select: {
          tahun_ajaran: true,
          mata_pelajaran: true,
          kelas: { include: { jurusan: true } },
          guru: { include: { user: true } }
        }
      }
    }
  })
}

export const fetchSoalSudahDijawab = async ({ page, limit, search, userid }: IGetParams & { userid: string }) => {
  const today = new Date()
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate())

  const siswa = await db.siswa.findUnique({
    where: { id_user: userid },
    select: { id: true }
  })

  if (!siswa) return { data: [], count: 0 }

  const [data, count] = await db.$transaction([
    db.soal.findMany({
      where: {
        hasil: {
          some: {
            id_siswa: siswa.id
          }
        },
        tanggal_ujian: {
          lt: startOfToday
        },
        OR: [
          { semester: { contains: search } },
          {
            mengajar: {
              mata_pelajaran: {
                nama: { contains: search }
              }
            }
          }
        ]
      },
      include: {
        mengajar: {
          select: {
            tahun_ajaran: true,
            mata_pelajaran: true,
            kelas: { include: { jurusan: true } },
            guru: { include: { user: true } }
          }
        },
        hasil: {
          where: { id_siswa: siswa.id },
          include: {
            answers: true
          }
        }
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { created_at: 'desc' }
    }),
    db.soal.count({
      where: {
        hasil: {
          some: {
            id_siswa: siswa.id
          }
        },
        tanggal_ujian: {
          lt: startOfToday
        },
        OR: [
          { semester: { contains: search } },
          {
            mengajar: {
              mata_pelajaran: {
                nama: { contains: search }
              }
            }
          }
        ]
      }
    })
  ])

  return { data, count }
}
