-- AlterTable
ALTER TABLE `residentialdashboard` ADD COLUMN `apartment_registration_qrcode` VARCHAR(191) NULL,
    ADD COLUMN `guest_free_days` INTEGER NULL,
    ADD COLUMN `max_cars_by_apartment` INTEGER NULL;

-- CreateTable
CREATE TABLE `AprtmentRequest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `owner_name` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `apartment_number` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `created_at` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
