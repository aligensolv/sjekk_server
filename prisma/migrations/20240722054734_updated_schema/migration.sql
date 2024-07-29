/*
  Warnings:

  - You are about to drop the column `address` on the `partner` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `partner` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `partner` table. All the data in the column will be lost.
  - You are about to drop the column `fax_number` on the `partner` table. All the data in the column will be lost.
  - You are about to drop the column `other_address` on the `partner` table. All the data in the column will be lost.
  - You are about to drop the column `postal_code` on the `partner` table. All the data in the column will be lost.
  - Added the required column `created_at` to the `NormalCar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `normal_place_id` to the `NormalCar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `normalcar` ADD COLUMN `created_at` VARCHAR(191) NOT NULL,
    ADD COLUMN `deleted_at` VARCHAR(191) NULL,
    ADD COLUMN `normal_place_id` INTEGER NOT NULL,
    ADD COLUMN `updated_at` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `normalplace` ADD COLUMN `deleted_at` VARCHAR(191) NULL,
    ADD COLUMN `updated_at` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `partner` DROP COLUMN `address`,
    DROP COLUMN `city`,
    DROP COLUMN `email`,
    DROP COLUMN `fax_number`,
    DROP COLUMN `other_address`,
    DROP COLUMN `postal_code`;

-- AlterTable
ALTER TABLE `residentialdashboard` ADD COLUMN `current_total_registered_cars` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `deleted_at` VARCHAR(191) NULL,
    ADD COLUMN `updated_at` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `residentialquarter` ADD COLUMN `created_at` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `updated_at` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `NormalCar` ADD CONSTRAINT `NormalCar_normal_place_id_fkey` FOREIGN KEY (`normal_place_id`) REFERENCES `NormalPlace`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
