/*
  Warnings:

  - You are about to drop the column `manufactur_year` on the `plateinfo` table. All the data in the column will be lost.
  - You are about to drop the column `shift_id` on the `violation` table. All the data in the column will be lost.
  - Added the required column `manufacture_year` to the `PlateInfo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `violation` DROP FOREIGN KEY `Violation_shift_id_fkey`;

-- AlterTable
ALTER TABLE `plateinfo` DROP COLUMN `manufactur_year`,
    ADD COLUMN `manufacture_year` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `violation` DROP COLUMN `shift_id`;
