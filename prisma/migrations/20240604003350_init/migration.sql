/*
  Warnings:

  - A unique constraint covering the columns `[registered_car_id]` on the table `Violation` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `violation` ADD COLUMN `registered_car_id` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Violation_registered_car_id_key` ON `Violation`(`registered_car_id`);

-- AddForeignKey
ALTER TABLE `Violation` ADD CONSTRAINT `Violation_registered_car_id_fkey` FOREIGN KEY (`registered_car_id`) REFERENCES `Car`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
