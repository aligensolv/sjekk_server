/*
  Warnings:

  - Added the required column `session_id` to the `Shift` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `shift` ADD COLUMN `session_id` VARCHAR(191) NOT NULL;
