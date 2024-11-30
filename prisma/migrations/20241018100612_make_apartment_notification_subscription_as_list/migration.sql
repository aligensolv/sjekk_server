/*
  Warnings:

  - You are about to drop the column `push_manager_subscription` on the `apartment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `apartment` DROP COLUMN `push_manager_subscription`,
    ADD COLUMN `is_subscription_active` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `normalplacedashboard` ADD COLUMN `is_subscription_active` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `residentialdashboard` ADD COLUMN `is_subscription_active` BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE `ApartmentNotificationSubscription` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `aprtment_id` INTEGER NOT NULL,
    `push_manager_subscription` LONGTEXT NULL,
    `user_agent` VARCHAR(191) NOT NULL,
    `ip_address` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ApartmentNotificationSubscription` ADD CONSTRAINT `ApartmentNotificationSubscription_aprtment_id_fkey` FOREIGN KEY (`aprtment_id`) REFERENCES `Apartment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
