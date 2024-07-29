/*
  Warnings:

  - You are about to drop the column `registeration_type` on the `registeredcar` table. All the data in the column will be lost.
  - Added the required column `registration_type` to the `RegisteredCar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `registeredcar` DROP COLUMN `registeration_type`,
    ADD COLUMN `registration_type` ENUM('normal', 'residential', 'apartment') NOT NULL;
