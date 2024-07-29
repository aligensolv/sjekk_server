/*
  Warnings:

  - You are about to drop the column `registration_source` on the `carlog` table. All the data in the column will be lost.
  - You are about to drop the column `is_verified` on the `place` table. All the data in the column will be lost.
  - You are about to drop the column `partner_id` on the `place` table. All the data in the column will be lost.
  - You are about to drop the column `place_id` on the `placedashboard` table. All the data in the column will be lost.
  - You are about to drop the `car` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `place_type` to the `Place` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `car` DROP FOREIGN KEY `Car_place_id_fkey`;

-- DropForeignKey
ALTER TABLE `car` DROP FOREIGN KEY `Car_source_id_fkey`;

-- DropForeignKey
ALTER TABLE `place` DROP FOREIGN KEY `Place_partner_id_fkey`;

-- DropForeignKey
ALTER TABLE `placedashboard` DROP FOREIGN KEY `PlaceDashboard_place_id_fkey`;

-- DropForeignKey
ALTER TABLE `violation` DROP FOREIGN KEY `Violation_registered_car_id_fkey`;

-- AlterTable
ALTER TABLE `carlog` DROP COLUMN `registration_source`;

-- AlterTable
ALTER TABLE `place` DROP COLUMN `is_verified`,
    DROP COLUMN `partner_id`,
    ADD COLUMN `place_type` ENUM('normal', 'residential', 'apartment') NOT NULL;

-- AlterTable
ALTER TABLE `placedashboard` DROP COLUMN `place_id`;

-- DropTable
DROP TABLE `car`;

-- CreateTable
CREATE TABLE `NormalPlaceCar` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ResidentialCar` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ApartmentCar` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RegisteredCar` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `plate_number` VARCHAR(191) NOT NULL,
    `car_model` VARCHAR(191) NOT NULL,
    `car_type` VARCHAR(191) NOT NULL,
    `car_description` VARCHAR(191) NOT NULL,
    `car_color` VARCHAR(191) NOT NULL,
    `manufacture_year` VARCHAR(191) NOT NULL,
    `free_parking_hours` INTEGER NULL,
    `start_date` VARCHAR(191) NOT NULL,
    `end_date` VARCHAR(191) NOT NULL,
    `created_at` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NormalPlace` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `partner_id` INTEGER NULL,
    `location` VARCHAR(191) NOT NULL,
    `policy` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `place_id` INTEGER NOT NULL,

    UNIQUE INDEX `NormalPlace_place_id_key`(`place_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ResidentialQuarter` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `location` VARCHAR(191) NOT NULL,
    `policy` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `deleted_at` VARCHAR(191) NULL,
    `place_id` INTEGER NOT NULL,

    UNIQUE INDEX `ResidentialQuarter_place_id_key`(`place_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Apartment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `location` VARCHAR(191) NOT NULL,
    `policy` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `place_id` INTEGER NOT NULL,

    UNIQUE INDEX `Apartment_place_id_key`(`place_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `NormalPlace` ADD CONSTRAINT `NormalPlace_partner_id_fkey` FOREIGN KEY (`partner_id`) REFERENCES `Partner`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NormalPlace` ADD CONSTRAINT `NormalPlace_place_id_fkey` FOREIGN KEY (`place_id`) REFERENCES `Place`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ResidentialQuarter` ADD CONSTRAINT `ResidentialQuarter_place_id_fkey` FOREIGN KEY (`place_id`) REFERENCES `Place`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Apartment` ADD CONSTRAINT `Apartment_place_id_fkey` FOREIGN KEY (`place_id`) REFERENCES `Place`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Violation` ADD CONSTRAINT `Violation_registered_car_id_fkey` FOREIGN KEY (`registered_car_id`) REFERENCES `RegisteredCar`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
