/*
  Warnings:

  - Added the required column `residential_quarter_id` to the `ResidentialCar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `residentialcar` ADD COLUMN `residential_quarter_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `ResidentialCar` ADD CONSTRAINT `ResidentialCar_residential_quarter_id_fkey` FOREIGN KEY (`residential_quarter_id`) REFERENCES `ResidentialQuarter`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
