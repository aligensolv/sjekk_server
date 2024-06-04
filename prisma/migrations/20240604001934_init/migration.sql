/*
  Warnings:

  - You are about to drop the column `completed_at` on the `violation` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `violation` table. All the data in the column will be lost.
  - Added the required column `shift_id` to the `Violation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expiry_date` to the `ViolationExtraValues` table without a default value. This is not possible if the table is not empty.
  - Added the required column `meter_number` to the `ViolationExtraValues` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paid_amount` to the `ViolationExtraValues` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ticketinfo` MODIFY `payment_date` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `violation` DROP COLUMN `completed_at`,
    DROP COLUMN `status`,
    ADD COLUMN `shift_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `violationextravalues` ADD COLUMN `expiry_date` VARCHAR(191) NOT NULL,
    ADD COLUMN `meter_number` VARCHAR(191) NOT NULL,
    ADD COLUMN `paid_amount` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Violation` ADD CONSTRAINT `Violation_shift_id_fkey` FOREIGN KEY (`shift_id`) REFERENCES `Shift`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
