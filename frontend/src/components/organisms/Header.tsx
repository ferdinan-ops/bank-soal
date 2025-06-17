import {
  HiBars3,
  HiOutlineAcademicCap,
  HiOutlineArrowRightOnRectangle,
  HiOutlineBeaker,
  HiOutlineBookOpen,
  HiOutlineChevronDown,
  HiOutlineHome,
  HiOutlineUser,
  HiOutlineUserGroup
} from 'react-icons/hi2'
import * as React from 'react'
import { useNavigate } from 'react-router-dom'

import { UserType } from '@/lib/types/user.type'
import { cn } from '@/lib/utils'

import { useUserInfo } from '@/store/client'
import { useLogout } from '@/store/server/useAuth'

import { Brand, FloatBox } from '@/components/atoms'
import Alert from './Alert'

const links = [
  { to: '/', label: 'Beranda', icon: HiOutlineHome, type: 'admin' },
  { to: '/jurusan', label: 'Jurusan', icon: HiOutlineAcademicCap, type: 'admin' },
  { to: '/mata-pelajaran', label: 'Mata Pelajaran', icon: HiOutlineBookOpen, type: 'admin' },
  { to: '/guru', label: 'Guru', icon: HiOutlineUserGroup, type: 'admin' },
  { to: '/mengajar', label: 'Mengajar', icon: HiOutlineBeaker, type: 'admin' },
  { to: '/me', label: 'Profil', icon: HiOutlineUser, type: 'admin' },

  { to: '/', label: 'Beranda', icon: HiOutlineHome, type: 'siswa' },
  { to: '/me', label: 'Profil', icon: HiOutlineUser, type: 'siswa' },

  { to: '/', label: 'Beranda', icon: HiOutlineHome, type: 'guru' },
  { to: '/mengajar', label: 'Mengajar', icon: HiOutlineBeaker, type: 'guru' },
  { to: '/me', label: 'Profil', icon: HiOutlineUser, type: 'guru' }
]

const alertConf = {
  title: 'Anda yakin keluar dari aplikasi?',
  desc: 'Tindakan ini akan mengeluarkan akun Anda dari aplikasi kami. Namun Anda bisa kembali lagi dengan login.',
  btnTxt: 'Keluar'
}

interface HeaderProps {
  className?: string
  page?: 'home' | 'admin' | 'dashboard'
}

export default function Header({ className }: HeaderProps) {
  const navigate = useNavigate()
  const { mutate: logout } = useLogout()

  const user = useUserInfo((state) => state.user)
  // const { data: notifCount } = useGetUnreadValidates(user?.role !== 'USER')

  const [isOpen, setIsOpen] = React.useState(false)
  const handleClose = () => setIsOpen(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className={cn('sticky top-0 z-50 flex h-24 w-full items-center border-b bg-white text-primary', className)}>
      <nav className="mx-auto flex w-[1180px] items-center justify-between px-5 md:px-10 xl:px-0">
        <Brand imageClassName="xl:w-9 w-7 mb-1.5" className="gap-3 text-lg font-bold xl:gap-4 xl:text-xl" />

        <div className="flex items-center gap-5">
          <div className="relative w-fit">
            <ProfileBox
              isHidden
              user={user}
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                'cursor-pointer rounded-full bg-white/10 text-white hover:bg-white/5 xl:rounded-lg xl:px-3.5 xl:py-2',
                'xl:bg-zinc-100 text-primary xl:hover:bg-zinc-200'
              )}
            >
              <HiOutlineChevronDown className="hidden text-lg text-font lg:block" />
            </ProfileBox>

            <FloatBox isOpen={isOpen}>
              <ProfileBox noBar user={user} className="border-b border-zinc-200 pb-4 text-primary" />

              {links
                .filter((link) => link.type === user.role.toLocaleLowerCase())
                .map((link, i) => (
                  <FloatBox.Item key={i} href={link.to} label={link.label} onClick={handleClose} icon={link.icon} />
                ))}

              <Alert title={alertConf.title} desc={alertConf.desc} btnText={alertConf.btnTxt} action={handleLogout}>
                <button className={cn(FloatBox.itemClass, 'mt-2 w-full cursor-pointer text-red-500')}>
                  <HiOutlineArrowRightOnRectangle className="text-xl" />
                  <span className="text-sm font-medium">Keluar dari aplikasi</span>
                </button>
              </Alert>
            </FloatBox>
          </div>
        </div>
      </nav>
    </header>
  )
}

interface ProfileBoxProps {
  onClick?: () => void
  children?: React.ReactNode
  user: UserType
  className?: string
  isHidden?: boolean
  noBar?: boolean
}

function ProfileBox({ user, onClick, children, className, isHidden, noBar }: ProfileBoxProps) {
  return (
    <div className={cn('flex items-center gap-3.5', className)} onClick={() => onClick && onClick()}>
      {/* <Image src={user?.photo} alt={user?.fullname} className="h-10 w-10 rounded-full" /> */}
      {!noBar && <HiBars3 className="h-8 w-8 xl:hidden" />}
      <div className={cn('flex flex-col', isHidden && 'hidden lg:flex')}>
        <h3 className="truncate text-sm font-semibold text-font">{user?.fullname}</h3>
        <p className="truncate text-xs text-font/50">{user?.email}</p>
      </div>
      {children}
    </div>
  )
}
