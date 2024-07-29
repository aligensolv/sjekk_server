/*
  Warnings:

  - You are about to drop the column `created_at` on the `registeredcar` table. All the data in the column will be lost.
  - You are about to drop the column `end_date` on the `registeredcar` table. All the data in the column will be lost.
  - You are about to drop the column `free_parking_hours` on the `registeredcar` table. All the data in the column will be lost.
  - You are about to drop the column `start_date` on the `registeredcar` table. All the data in the column will be lost.
  - You are about to drop the column `registered_car_id` on the `violation` table. All the data in the column will be lost.
  - You are about to drop the `normalplacecar` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `placedashboard` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[registered_car_id]` on the table `ApartmentCar` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[registered_car_id]` on the table `ResidentialCar` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `registered_car_id` to the `ApartmentCar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expire_date` to the `ResidentialCar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parking_type` to the `ResidentialCar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registered_car_id` to the `ResidentialCar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registration_date` to the `ResidentialCar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subscription_plan_time` to the `ResidentialCar` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `violation` DROP FOREIGN KEY `Violation_registered_car_id_fkey`;

-- AlterTable
ALTER TABLE `apartmentcar` ADD COLUMN `registered_car_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `normalplace` ADD COLUMN `place_type` VARCHAR(191) NOT NULL DEFAULT 'Shop';

-- AlterTable
ALTER TABLE `registeredcar` DROP COLUMN `created_at`,
    DROP COLUMN `end_date`,
    DROP COLUMN `free_parking_hours`,
    DROP COLUMN `start_date`;

-- AlterTable
ALTER TABLE `residentialcar` ADD COLUMN `expire_date` VARCHAR(191) NOT NULL,
    ADD COLUMN `parking_type` ENUM('reserved', 'guest') NOT NULL,
    ADD COLUMN `registered_car_id` INTEGER NOT NULL,
    ADD COLUMN `registration_date` VARCHAR(191) NOT NULL,
    ADD COLUMN `subscription_plan_time` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `violation` DROP COLUMN `registered_car_id`;

-- DropTable
DROP TABLE `normalplacecar`;

-- DropTable
DROP TABLE `placedashboard`;

-- CreateTable
CREATE TABLE `NormalCar` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `registered_car_id` INTEGER NOT NULL,
    `free_parking_hours` INTEGER NOT NULL,
    `registeration_date` VARCHAR(191) NOT NULL,
    `expire_date` VARCHAR(191) NOT NULL,
    `registeration_source` ENUM('normal_place_dashboard', 'system') NOT NULL,

    UNIQUE INDEX `NormalCar_registered_car_id_key`(`registered_car_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NormalPlaceDashboard` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `access_username` VARCHAR(191) NOT NULL,
    `access_code` VARCHAR(191) NOT NULL,
    `profile_image` VARCHAR(191) NULL,
    `free_parking_hours` INTEGER NOT NULL,
    `place_name` VARCHAR(191) NOT NULL,
    `place_type` VARCHAR(191) NOT NULL,
    `created_at` VARCHAR(191) NOT NULL,
    `updated_at` VARCHAR(191) NULL,
    `deleted_at` VARCHAR(191) NULL,
    `normal_place_id` INTEGER NOT NULL,

    UNIQUE INDEX `NormalPlaceDashboard_access_username_key`(`access_username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ResidentialDashboard` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `access_username` VARCHAR(191) NOT NULL,
    `access_code` VARCHAR(191) NOT NULL,
    `quarter_name` VARCHAR(191) NOT NULL,
    `residential_quarter_id` INTEGER NOT NULL,

    UNIQUE INDEX `ResidentialDashboard_residential_quarter_id_key`(`residential_quarter_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `ApartmentCar_registered_car_id_key` ON `ApartmentCar`(`registered_car_id`);

-- CreateIndex
CREATE UNIQUE INDEX `ResidentialCar_registered_car_id_key` ON `ResidentialCar`(`registered_car_id`);

-- AddForeignKey
ALTER TABLE `NormalCar` ADD CONSTRAINT `NormalCar_registered_car_id_fkey` FOREIGN KEY (`registered_car_id`) REFERENCES `RegisteredCar`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ResidentialCar` ADD CONSTRAINT `ResidentialCar_registered_car_id_fkey` FOREIGN KEY (`registered_car_id`) REFERENCES `RegisteredCar`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ApartmentCar` ADD CONSTRAINT `ApartmentCar_registered_car_id_fkey` FOREIGN KEY (`registered_car_id`) REFERENCES `RegisteredCar`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NormalPlaceDashboard` ADD CONSTRAINT `NormalPlaceDashboard_normal_place_id_fkey` FOREIGN KEY (`normal_place_id`) REFERENCES `NormalPlace`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ResidentialDashboard` ADD CONSTRAINT `ResidentialDashboard_residential_quarter_id_fkey` FOREIGN KEY (`residential_quarter_id`) REFERENCES `ResidentialQuarter`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
