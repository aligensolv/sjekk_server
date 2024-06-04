/*
  Warnings:

  - You are about to drop the column `land` on the `plateinfo` table. All the data in the column will be lost.
  - Added the required column `country_code` to the `PlateInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country_name` to the `PlateInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `plateinfo` DROP COLUMN `land`,
    ADD COLUMN `country_code` VARCHAR(191) NOT NULL,
    ADD COLUMN `country_name` VARCHAR(191) NOT NULL;
