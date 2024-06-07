/*
  Warnings:

  - Added the required column `place_login_time` to the `Violation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `violation` ADD COLUMN `place_login_time` VARCHAR(191) NOT NULL;
