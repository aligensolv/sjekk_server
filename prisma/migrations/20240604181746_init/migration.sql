/*
  Warnings:

  - You are about to drop the column `manufactur_year` on the `car` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `car` DROP COLUMN `manufactur_year`,
    ADD COLUMN `manufacture_year` VARCHAR(191) NOT NULL DEFAULT '2006';
