import * as React from 'react'
import { Outlet } from 'react-router-dom'

import { Header } from '../organisms'

export default function MainLayout() {
  return (
    <React.Fragment>
      <Header />
      <main className="relative mx-auto flex min-h-[calc(100vh-96px)] max-w-[1180px] flex-col p-6 md:px-0 md:py-12">
        <Outlet />
      </main>
    </React.Fragment>
  )
}
