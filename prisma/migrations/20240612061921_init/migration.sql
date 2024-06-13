/*
  Warnings:

  - A unique constraint covering the columns `[ticket_number]` on the table `TicketInfo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `TicketInfo_ticket_number_key` ON `TicketInfo`(`ticket_number`);
