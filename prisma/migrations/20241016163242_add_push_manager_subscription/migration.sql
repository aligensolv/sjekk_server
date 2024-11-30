/*
  Warnings:

  - Added the required column `registration_type` to the `SystemCar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `carlog` ADD COLUMN `manufacture_year` VARCHAR(191) NULL,
    MODIFY `car_model` VARCHAR(191) NULL,
    MODIFY `car_type` VARCHAR(191) NULL,
    MODIFY `car_description` VARCHAR(191) NULL,
    MODIFY `car_color` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `normalplacedashboard` ADD COLUMN `push_manager_subscription` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `residentialdashboard` ADD COLUMN `push_manager_subscription` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `systemcar` ADD COLUMN `registration_type` ENUM('reserved', 'guest', 'public') NOT NULL;
