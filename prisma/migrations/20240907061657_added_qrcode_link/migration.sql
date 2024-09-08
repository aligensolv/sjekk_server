-- AlterTable
ALTER TABLE `residentialdashboard` ADD COLUMN `apartment_registration_qrcode_link` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `ApartmentLocation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
