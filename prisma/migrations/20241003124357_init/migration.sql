/*
  Warnings:

  - You are about to drop the column `current_total_registered_cars` on the `residentialdashboard` table. All the data in the column will be lost.
  - You are about to drop the column `guest_free_days` on the `residentialdashboard` table. All the data in the column will be lost.
  - You are about to drop the column `max_cars_by_apartment` on the `residentialdashboard` table. All the data in the column will be lost.
  - You are about to drop the column `max_cars_registrations` on the `residentialdashboard` table. All the data in the column will be lost.
  - You are about to drop the column `quarter_name` on the `residentialdashboard` table. All the data in the column will be lost.
  - Added the required column `max_cars_registrations` to the `ResidentialQuarter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quarter_name` to the `ResidentialQuarter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `residentialdashboard` DROP COLUMN `current_total_registered_cars`,
    DROP COLUMN `guest_free_days`,
    DROP COLUMN `max_cars_by_apartment`,
    DROP COLUMN `max_cars_registrations`,
    DROP COLUMN `quarter_name`;

-- AlterTable
ALTER TABLE `residentialquarter` ADD COLUMN `current_total_registered_cars` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `guest_free_days` INTEGER NULL,
    ADD COLUMN `max_cars_by_apartment` INTEGER NULL,
    ADD COLUMN `max_cars_registrations` INTEGER NOT NULL,
    ADD COLUMN `quarter_name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `unique_code` VARCHAR(191) NULL;
