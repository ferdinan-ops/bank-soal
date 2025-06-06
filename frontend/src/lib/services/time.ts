export const formatTimeForTimer = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}

export const formatDate = (date: string, type: 'with-hour' | 'without-hour' = 'without-hour') => {
  // Membuat objek Date dari string
  const tanggalObjek = new Date(date)

  // Mendapatkan tanggal, bulan, dan tahun dari objek Date
  const tanggal = tanggalObjek.getDate()
  const bulan = tanggalObjek.getMonth() // Ingat bahwa bulan dimulai dari 0 (Januari = 0)
  const tahun = tanggalObjek.getFullYear()

  // Array untuk nama bulan
  const namaBulan = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember'
  ]

  // Mendapatkan nama bulan dari array
  const namaBulanStr = namaBulan[bulan]
  const hours = ('0' + tanggalObjek.getHours()).slice(-2)
  const minutes = ('0' + tanggalObjek.getMinutes()).slice(-2)

  // Format output
  const withoutHour = tanggal + ' ' + namaBulanStr + ' ' + tahun
  const withHour = `${withoutHour}, ${hours}:${minutes}`

  return type === 'with-hour' ? withHour : withoutHour
}

export const formatDateToInput = (date: string) => {
  const newDate = new Date(date)
  return newDate.toString()
}

type GetStartAndFinishParamsType = {
  examdate: string
  startTime: string
  endTime: string
}

export const getStartAndFinish = ({ examdate, startTime, endTime }: GetStartAndFinishParamsType) => {
  const date = new Date(examdate)
  const [startHour, startMinute] = startTime.split(':').map(Number)
  const [endHour, endMinute] = endTime.split(':').map(Number)

  const starts = new Date(date)
  starts.setHours(startHour, startMinute, 0, 0)

  const ends = new Date(date)
  ends.setHours(endHour, endMinute, 0, 0)

  const now = new Date()

  return {
    starts: starts,
    ends: ends,
    now
  }
}
