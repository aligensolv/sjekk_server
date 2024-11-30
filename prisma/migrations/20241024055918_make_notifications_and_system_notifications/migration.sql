/*
  Warnings:

  - Added the required column `channel_member_id` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `notification` ADD COLUMN `channel_member_id` INTEGER NOT NULL;
