/*
  Warnings:

  - Added the required column `channel_member_id` to the `ApartmentNotificationSubscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `channel_member_id` to the `PublicPlaceNotificationSubscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `channel_member_id` to the `ResidentialDashboardNotificationSubscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `apartmentnotificationsubscription` ADD COLUMN `channel` ENUM('apartment', 'residential', 'public_place') NOT NULL DEFAULT 'apartment',
    ADD COLUMN `channel_member_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `publicplacenotificationsubscription` ADD COLUMN `channel` ENUM('apartment', 'residential', 'public_place') NOT NULL DEFAULT 'public_place',
    ADD COLUMN `channel_member_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `residentialdashboardnotificationsubscription` ADD COLUMN `channel` ENUM('apartment', 'residential', 'public_place') NOT NULL DEFAULT 'public_place',
    ADD COLUMN `channel_member_id` INTEGER NOT NULL;
