/*
  Warnings:

  - Added the required column `total_charge` to the `Violation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `violation` ADD COLUMN `total_charge` DOUBLE NOT NULL;
