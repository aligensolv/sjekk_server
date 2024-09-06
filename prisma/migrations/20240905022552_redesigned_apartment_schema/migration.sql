/*
  Warnings:

  - You are about to drop the column `code` on the `apartment` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `apartment` table. All the data in the column will be lost.
  - You are about to drop the column `place_id` on the `apartment` table. All the data in the column will be lost.
  - You are about to drop the column `policy` on the `apartment` table. All the data in the column will be lost.
  - Added the required column `apartment_number` to the `Apartment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `Apartment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Apartment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owner_name` to the `Apartment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Apartment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `residential_quarter_id` to the `Apartment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Apartment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `apartment` DROP FOREIGN KEY `Apartment_place_id_fkey`;

-- AlterTable
ALTER TABLE `apartment` DROP COLUMN `code`,
    DROP COLUMN `location`,
    DROP COLUMN `place_id`,
    DROP COLUMN `policy`,
    ADD COLUMN `apartment_number` VARCHAR(191) NOT NULL,
    ADD COLUMN `created_at` VARCHAR(191) NOT NULL,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `owner_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD COLUMN `residential_quarter_id` INTEGER NOT NULL,
    ADD COLUMN `username` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Apartment` ADD CONSTRAINT `Apartment_residential_quarter_id_fkey` FOREIGN KEY (`residential_quarter_id`) REFERENCES `ResidentialQuarter`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
