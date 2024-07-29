/*
  Warnings:

  - Added the required column `registeration_type` to the `RegisteredCar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `registeredcar` ADD COLUMN `registeration_type` ENUM('normal', 'residential', 'apartment') NOT NULL;
