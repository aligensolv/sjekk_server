/*
  Warnings:

  - Added the required column `print_option` to the `Violation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `violation` ADD COLUMN `print_option` VARCHAR(191) NOT NULL;
