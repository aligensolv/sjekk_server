-- AlterTable
ALTER TABLE `apartment` ADD COLUMN `building_number` VARCHAR(191) NULL,
    ADD COLUMN `floor_number` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `apartmentrequest` ADD COLUMN `building_number` VARCHAR(191) NULL,
    ADD COLUMN `floor_number` VARCHAR(191) NULL;
