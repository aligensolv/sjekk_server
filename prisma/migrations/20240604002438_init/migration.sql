/*
  Warnings:

  - A unique constraint covering the columns `[violation_id]` on the table `TicketInfo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ticket_image` to the `TicketInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `violation_id` to the `TicketInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ticketinfo` ADD COLUMN `ticket_image` VARCHAR(191) NOT NULL,
    ADD COLUMN `violation_id` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `TicketInfo_violation_id_key` ON `TicketInfo`(`violation_id`);

-- AddForeignKey
ALTER TABLE `TicketInfo` ADD CONSTRAINT `TicketInfo_violation_id_fkey` FOREIGN KEY (`violation_id`) REFERENCES `Violation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
