/*
  Warnings:

  - You are about to drop the column `is_subscription_active` on the `apartment` table. All the data in the column will be lost.
  - You are about to drop the column `is_subscription_active` on the `normalplacedashboard` table. All the data in the column will be lost.
  - You are about to drop the column `push_manager_subscription` on the `normalplacedashboard` table. All the data in the column will be lost.
  - You are about to drop the column `is_subscription_active` on the `residentialdashboard` table. All the data in the column will be lost.
  - You are about to drop the column `push_manager_subscription` on the `residentialdashboard` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `apartment` DROP COLUMN `is_subscription_active`;

-- AlterTable
ALTER TABLE `normalplacedashboard` DROP COLUMN `is_subscription_active`,
    DROP COLUMN `push_manager_subscription`;

-- AlterTable
ALTER TABLE `residentialdashboard` DROP COLUMN `is_subscription_active`,
    DROP COLUMN `push_manager_subscription`;

-- CreateTable
CREATE TABLE `PublicPlaceNotificationSubscription` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `public_dashboard_id` INTEGER NOT NULL,
    `push_manager_subscription` LONGTEXT NULL,
    `user_agent` VARCHAR(191) NOT NULL,
    `ip_address` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ResidentialDashboardNotificationSubscription` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `residential_dashboard_id` INTEGER NOT NULL,
    `push_manager_subscription` LONGTEXT NULL,
    `user_agent` VARCHAR(191) NOT NULL,
    `ip_address` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PublicPlaceNotificationSubscription` ADD CONSTRAINT `PublicPlaceNotificationSubscription_public_dashboard_id_fkey` FOREIGN KEY (`public_dashboard_id`) REFERENCES `NormalPlaceDashboard`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ResidentialDashboardNotificationSubscription` ADD CONSTRAINT `ResidentialDashboardNotificationSubscription_residential_da_fkey` FOREIGN KEY (`residential_dashboard_id`) REFERENCES `ResidentialDashboard`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
