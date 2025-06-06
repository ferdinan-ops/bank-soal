import * as React from 'react'
import { Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import Result from './pages/Result'
import Answer from './pages/Answer'
import Account from './pages/Account'
import { Guru, Jurusan, Kelas, MataPelajaran, Mengajar } from './pages/admin'
import { ForgotPassword, Login, Register, ResetPassword, VerifyEmail } from './pages/auth'
import { GuruScore, GuruSoal, GuruSoalCreate, GuruSoalDetail, GuruSoalDetailCreate } from './pages/guru'

import { usePreviewImage } from './store/client'
import { useDialog } from './store/client/useDialog'

import { UserRole } from './lib/constant'

import { Dialog } from './components/organisms'
import { MainLayout } from './components/layouts'
import { DialogOptions } from './components/organisms/Dialog'
import ImagePreview from './components/atoms/forms/ImagePreview'
import { ProtectByRole, ProtectedAuth, ProtectedRoute } from './components/layouts/middlewares'

import { Toaster } from './components/ui/toaster'

export default function App() {
  const { dialogOptions, handleClose, handleSubmit } = useDialog()

  const { previewImage, setPreviewImage } = usePreviewImage((state) => ({
    previewImage: state.previewImage,
    setPreviewImage: state.setPreviewImage
  }))

  return (
    <React.Fragment>
      <Dialog
        open={Boolean(dialogOptions)}
        onSubmit={handleSubmit}
        onClose={handleClose}
        {...(dialogOptions as DialogOptions)}
      />
      {previewImage && <ImagePreview image={previewImage} onShow={() => setPreviewImage('')} />}
      <Toaster />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/me/reset-password" element={<ResetPassword />} />

          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/me" element={<Account />} />

            <Route path="/answer/:id/time/:time" element={<Answer />} />
            <Route path="/answer/:id/result" element={<Result />} />

            <Route element={<ProtectByRole allowedRoles={UserRole.ADMIN} />}>
              <Route path="/jurusan" element={<Jurusan />} />
              <Route path="/jurusan/:id" element={<Kelas />} />

              <Route path="/mata-pelajaran" element={<MataPelajaran />} />
              <Route path="/guru" element={<Guru />} />
            </Route>

            <Route path="/mengajar">
              <Route element={<ProtectByRole allowedRoles={[UserRole.ADMIN, UserRole.GURU]} />}>
                <Route index element={<Mengajar />} />
              </Route>

              <Route element={<ProtectByRole allowedRoles={UserRole.GURU} />} path=":id/soal">
                <Route index element={<GuruSoal />} />

                <Route path="create" element={<GuruSoalCreate />} />
                <Route path="create/:idSoal" element={<GuruSoalCreate />} />

                <Route path=":idSoal">
                  <Route index element={<GuruSoalDetail />} />
                  <Route path="create" element={<GuruSoalDetailCreate />} />

                  <Route path="score" element={<GuruScore />} />
                  <Route path="score/:userId" element={<Result />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>

        <Route element={<ProtectedAuth />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>
        <Route path="/verify" element={<VerifyEmail />} />
      </Routes>
    </React.Fragment>
  )
}
