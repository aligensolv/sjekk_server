/*
  Warnings:

  - You are about to drop the column `expire_date` on the `normalcar` table. All the data in the column will be lost.
  - You are about to drop the column `registeration_date` on the `normalcar` table. All the data in the column will be lost.
  - You are about to drop the column `expire_date` on the `residentialcar` table. All the data in the column will be lost.
  - You are about to drop the column `registration_date` on the `residentialcar` table. All the data in the column will be lost.
  - Added the required column `expire_date` to the `RegisteredCar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registration_date` to the `RegisteredCar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `normalcar` DROP COLUMN `expire_date`,
    DROP COLUMN `registeration_date`;

-- AlterTable
ALTER TABLE `registeredcar` ADD COLUMN `expire_date` VARCHAR(191) NOT NULL,
    ADD COLUMN `registration_date` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `residentialcar` DROP COLUMN `expire_date`,
    DROP COLUMN `registration_date`;
