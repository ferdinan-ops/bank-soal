import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { useUserInfo } from '@/store/client'

import { UserRole } from '@/lib/types/user.type'

interface ProtectByRoleProps {
  allowedRoles: UserRole[] | UserRole
}

export default function ProtectByRole({ allowedRoles }: ProtectByRoleProps) {
  const location = useLocation()
  const user = useUserInfo((state) => state.user)

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace state={{ from: location }} />
  }

  return <Outlet />
}
