/*
  Warnings:

  - You are about to drop the `aprtmentrequest` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `aprtmentrequest`;

-- CreateTable
CREATE TABLE `ApartmentRequest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `owner_name` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `apartment_number` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `created_at` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
