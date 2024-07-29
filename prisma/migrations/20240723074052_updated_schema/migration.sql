-- AlterTable
ALTER TABLE `registeredcar` ADD COLUMN `place_id` INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE `RegisteredCar` ADD CONSTRAINT `RegisteredCar_place_id_fkey` FOREIGN KEY (`place_id`) REFERENCES `Place`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
