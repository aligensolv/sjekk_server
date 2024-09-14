/*
  Warnings:

  - You are about to drop the `apartmentcar` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `apartmentcar` DROP FOREIGN KEY `ApartmentCar_registered_car_id_fkey`;

-- AlterTable
ALTER TABLE `registeredcar` MODIFY `car_model` VARCHAR(191) NULL,
    MODIFY `car_type` VARCHAR(191) NULL,
    MODIFY `car_description` VARCHAR(191) NULL,
    MODIFY `car_color` VARCHAR(191) NULL,
    MODIFY `manufacture_year` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `residentialcar` ADD COLUMN `apartment_id` INTEGER NULL;

-- DropTable
DROP TABLE `apartmentcar`;

-- AddForeignKey
ALTER TABLE `ResidentialCar` ADD CONSTRAINT `ResidentialCar_apartment_id_fkey` FOREIGN KEY (`apartment_id`) REFERENCES `Apartment`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
