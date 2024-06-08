/*
  Warnings:

  - You are about to alter the column `print_option` on the `ticketinfo` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(2))` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `ticketinfo` MODIFY `print_option` VARCHAR(191) NOT NULL;
