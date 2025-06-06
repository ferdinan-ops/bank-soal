-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `fullname` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL DEFAULT '',
    `photo` VARCHAR(191) NOT NULL DEFAULT '',
    `is_email_verified` BOOLEAN NOT NULL DEFAULT false,
    `token` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL DEFAULT 'email',
    `role` ENUM('ADMIN', 'SISWA', 'GURU') NOT NULL DEFAULT 'SISWA',

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_token_key`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Guru` (
    `id` VARCHAR(191) NOT NULL,
    `nip` VARCHAR(191) NOT NULL,
    `id_user` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Guru_id_user_key`(`id_user`),
    INDEX `Guru_id_user_idx`(`id_user`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Siswa` (
    `id` VARCHAR(191) NOT NULL,
    `nis` VARCHAR(191) NOT NULL,
    `id_user` VARCHAR(191) NOT NULL,
    `id_kelas` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Siswa_id_user_key`(`id_user`),
    INDEX `Siswa_id_user_id_kelas_idx`(`id_user`, `id_kelas`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Jurusan` (
    `id` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kelas` (
    `id` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `id_jurusan` VARCHAR(191) NOT NULL,

    INDEX `Kelas_id_jurusan_idx`(`id_jurusan`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MataPelajaran` (
    `id` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mengajar` (
    `id` VARCHAR(191) NOT NULL,
    `tahun_ajaran` VARCHAR(191) NOT NULL,
    `id_guru` VARCHAR(191) NOT NULL,
    `id_mata_pelajaran` VARCHAR(191) NOT NULL,
    `id_kelas` VARCHAR(191) NOT NULL,

    INDEX `Mengajar_id_guru_id_mata_pelajaran_idx`(`id_guru`, `id_mata_pelajaran`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Soal` (
    `id` VARCHAR(191) NOT NULL,
    `semester` VARCHAR(191) NOT NULL,
    `id_mengajar` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `tanggal_ujian` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `lama_pengerjaan` INTEGER NOT NULL DEFAULT 30,

    INDEX `Soal_id_mengajar_idx`(`id_mengajar`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DetailSoal` (
    `id` VARCHAR(191) NOT NULL,
    `text` TEXT NOT NULL,
    `options` JSON NOT NULL,
    `correct_answers` JSON NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `id_soal` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Hasil` (
    `id` VARCHAR(191) NOT NULL,
    `id_soal` VARCHAR(191) NOT NULL,
    `id_siswa` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `Hasil_id_soal_id_siswa_idx`(`id_soal`, `id_siswa`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Jawaban` (
    `id` VARCHAR(191) NOT NULL,
    `answer` JSON NOT NULL,
    `is_correct` BOOLEAN NOT NULL DEFAULT false,
    `id_detail_soal` VARCHAR(191) NOT NULL,
    `id_hasil` VARCHAR(191) NOT NULL,

    INDEX `Jawaban_id_detail_soal_id_hasil_idx`(`id_detail_soal`, `id_hasil`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Guru` ADD CONSTRAINT `Guru_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Siswa` ADD CONSTRAINT `Siswa_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Siswa` ADD CONSTRAINT `Siswa_id_kelas_fkey` FOREIGN KEY (`id_kelas`) REFERENCES `Kelas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Kelas` ADD CONSTRAINT `Kelas_id_jurusan_fkey` FOREIGN KEY (`id_jurusan`) REFERENCES `Jurusan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mengajar` ADD CONSTRAINT `Mengajar_id_guru_fkey` FOREIGN KEY (`id_guru`) REFERENCES `Guru`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mengajar` ADD CONSTRAINT `Mengajar_id_mata_pelajaran_fkey` FOREIGN KEY (`id_mata_pelajaran`) REFERENCES `MataPelajaran`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mengajar` ADD CONSTRAINT `Mengajar_id_kelas_fkey` FOREIGN KEY (`id_kelas`) REFERENCES `Kelas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Soal` ADD CONSTRAINT `Soal_id_mengajar_fkey` FOREIGN KEY (`id_mengajar`) REFERENCES `Mengajar`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetailSoal` ADD CONSTRAINT `DetailSoal_id_soal_fkey` FOREIGN KEY (`id_soal`) REFERENCES `Soal`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Hasil` ADD CONSTRAINT `Hasil_id_siswa_fkey` FOREIGN KEY (`id_siswa`) REFERENCES `Siswa`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Hasil` ADD CONSTRAINT `Hasil_id_soal_fkey` FOREIGN KEY (`id_soal`) REFERENCES `Soal`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Jawaban` ADD CONSTRAINT `Jawaban_id_detail_soal_fkey` FOREIGN KEY (`id_detail_soal`) REFERENCES `DetailSoal`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Jawaban` ADD CONSTRAINT `Jawaban_id_hasil_fkey` FOREIGN KEY (`id_hasil`) REFERENCES `Hasil`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
