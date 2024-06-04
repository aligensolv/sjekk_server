-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `pnid` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `created_at` VARCHAR(191) NOT NULL,
    `updated_at` VARCHAR(191) NULL,
    `deleted_at` VARCHAR(191) NULL,

    UNIQUE INDEX `User_pnid_key`(`pnid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Car` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `plate_number` VARCHAR(191) NOT NULL,
    `car_model` VARCHAR(191) NOT NULL,
    `car_type` VARCHAR(191) NOT NULL,
    `car_description` VARCHAR(191) NOT NULL,
    `car_color` VARCHAR(191) NOT NULL,
    `manufactur_year` VARCHAR(191) NOT NULL,
    `registration_type` VARCHAR(191) NOT NULL,
    `registration_source` ENUM('system', 'gateway') NOT NULL,
    `source_id` INTEGER NULL,
    `place_id` INTEGER NOT NULL,
    `free_parking_hours` INTEGER NULL,
    `start_date` VARCHAR(191) NOT NULL,
    `end_date` VARCHAR(191) NOT NULL,
    `created_at` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PartnerDashboard` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `access_username` VARCHAR(191) NOT NULL,
    `access_code` VARCHAR(191) NOT NULL,
    `partner_id` INTEGER NOT NULL,

    UNIQUE INDEX `PartnerDashboard_access_username_key`(`access_username`),
    UNIQUE INDEX `PartnerDashboard_partner_id_key`(`partner_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Partner` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `postal_code` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `other_address` VARCHAR(191) NULL,
    `fax_number` VARCHAR(191) NULL,
    `phone_number` VARCHAR(191) NOT NULL,
    `created_at` VARCHAR(191) NOT NULL,
    `updated_at` VARCHAR(191) NULL,
    `deleted_at` VARCHAR(191) NULL,
    `owned_places_count` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlaceDashboard` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `access_username` VARCHAR(191) NOT NULL,
    `access_code` VARCHAR(191) NOT NULL,
    `profile_image` VARCHAR(191) NULL,
    `free_parking_hours` INTEGER NOT NULL,
    `place_name` VARCHAR(191) NOT NULL,
    `place_type` VARCHAR(191) NOT NULL,
    `created_at` VARCHAR(191) NOT NULL,
    `updated_at` VARCHAR(191) NULL,
    `deleted_at` VARCHAR(191) NULL,
    `place_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Place` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `location` VARCHAR(191) NOT NULL,
    `policy` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `created_at` VARCHAR(191) NOT NULL,
    `updated_at` VARCHAR(191) NULL,
    `deleted_at` VARCHAR(191) NULL,
    `is_verified` BOOLEAN NOT NULL,
    `partner_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Extras` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rule_id` INTEGER NOT NULL,
    `meter_receipt_number` BOOLEAN NOT NULL DEFAULT false,
    `meter_number` BOOLEAN NOT NULL DEFAULT false,
    `expiry_date` BOOLEAN NOT NULL DEFAULT false,
    `paid_amount` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `Extras_rule_id_key`(`rule_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rule` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `charge` DOUBLE NOT NULL,
    `policy_time` INTEGER NOT NULL,
    `created_at` VARCHAR(191) NOT NULL,
    `updated_at` VARCHAR(191) NULL,
    `deleted_at` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Brand` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `value` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Color` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `value` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlaceRequest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `request_type` ENUM('creation', 'deletion') NOT NULL,
    `location` VARCHAR(191) NULL,
    `policy` VARCHAR(191) NULL,
    `code` VARCHAR(191) NULL,
    `place_id` INTEGER NULL,
    `requested_by_id` INTEGER NOT NULL,
    `status` ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
    `created_at` VARCHAR(191) NOT NULL,
    `updated_at` VARCHAR(191) NULL,
    `deleted_at` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlaceRequestApproval` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `request_id` INTEGER NOT NULL,
    `status` ENUM('approved', 'rejected') NOT NULL,
    `comments` VARCHAR(191) NULL,
    `created_at` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `PlaceRequestApproval_request_id_key`(`request_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserPlaceLogin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `place_name` VARCHAR(191) NOT NULL,
    `login_time` VARCHAR(191) NOT NULL,
    `logout_time` VARCHAR(191) NOT NULL,
    `shift_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Shift` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `start_date` VARCHAR(191) NOT NULL,
    `end_date` VARCHAR(191) NULL,
    `pnid` VARCHAR(191) NOT NULL,
    `total_completed_violations` INTEGER NOT NULL DEFAULT 0,
    `created_at` VARCHAR(191) NOT NULL,
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ViolationImage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `path` VARCHAR(191) NOT NULL,
    `date` VARCHAR(191) NOT NULL,
    `violation_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlateInfo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `violation_id` INTEGER NOT NULL,
    `car_model` VARCHAR(191) NOT NULL,
    `plate_number` VARCHAR(191) NOT NULL,
    `manufactur_year` VARCHAR(191) NOT NULL,
    `car_description` VARCHAR(191) NOT NULL,
    `car_type` VARCHAR(191) NOT NULL,
    `car_color` VARCHAR(191) NOT NULL,
    `land` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `PlateInfo_violation_id_key`(`violation_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TicketInfo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ticket_number` VARCHAR(191) NOT NULL,
    `print_option` ENUM('hand', 'post', 'email') NOT NULL,
    `payment_date` VARCHAR(191) NOT NULL,
    `barcode_image` VARCHAR(191) NOT NULL,
    `serial_number` VARCHAR(191) NOT NULL,
    `created_at` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ViolationExtraValues` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `violation_rule_id` INTEGER NOT NULL,
    `meter_receipt_number` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ViolationExtraValues_violation_rule_id_key`(`violation_rule_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ViolationRule` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `violation_id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `charge` DOUBLE NOT NULL,
    `policy_time` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Violation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `ticket_comment` VARCHAR(191) NOT NULL,
    `system_comment` VARCHAR(191) NOT NULL,
    `place_id` INTEGER NOT NULL,
    `status` ENUM('saved', 'completed') NOT NULL,
    `is_car_registered` BOOLEAN NOT NULL,
    `created_at` VARCHAR(191) NOT NULL,
    `completed_at` VARCHAR(191) NULL,
    `is_locked` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Email` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sender` VARCHAR(191) NOT NULL,
    `receiver` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `subject` VARCHAR(191) NOT NULL,
    `sent_at` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CarLog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `start_date` VARCHAR(191) NOT NULL,
    `end_date` VARCHAR(191) NOT NULL,
    `registration_source` ENUM('system', 'gateway') NOT NULL,
    `registered_by` VARCHAR(191) NOT NULL,
    `place_location` VARCHAR(191) NOT NULL,
    `place_code` VARCHAR(191) NOT NULL,
    `place_policy` VARCHAR(191) NOT NULL,
    `car_model` VARCHAR(191) NOT NULL,
    `car_type` VARCHAR(191) NOT NULL,
    `car_description` VARCHAR(191) NOT NULL,
    `car_color` VARCHAR(191) NOT NULL,
    `plate_number` VARCHAR(191) NOT NULL,
    `created_at` VARCHAR(191) NOT NULL,
    `place_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CarLogReport` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `file_name` VARCHAR(191) NOT NULL,
    `file_path` VARCHAR(191) NOT NULL,
    `notes` VARCHAR(191) NOT NULL,
    `total_parkings` INTEGER NOT NULL,
    `total_parking_time` INTEGER NOT NULL,
    `average_parking_time` DOUBLE NOT NULL,
    `created_at` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Car` ADD CONSTRAINT `Car_source_id_fkey` FOREIGN KEY (`source_id`) REFERENCES `PlaceDashboard`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Car` ADD CONSTRAINT `Car_place_id_fkey` FOREIGN KEY (`place_id`) REFERENCES `Place`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PartnerDashboard` ADD CONSTRAINT `PartnerDashboard_partner_id_fkey` FOREIGN KEY (`partner_id`) REFERENCES `Partner`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlaceDashboard` ADD CONSTRAINT `PlaceDashboard_place_id_fkey` FOREIGN KEY (`place_id`) REFERENCES `Place`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Place` ADD CONSTRAINT `Place_partner_id_fkey` FOREIGN KEY (`partner_id`) REFERENCES `Partner`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Extras` ADD CONSTRAINT `Extras_rule_id_fkey` FOREIGN KEY (`rule_id`) REFERENCES `Rule`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlaceRequest` ADD CONSTRAINT `PlaceRequest_requested_by_id_fkey` FOREIGN KEY (`requested_by_id`) REFERENCES `Partner`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlaceRequestApproval` ADD CONSTRAINT `PlaceRequestApproval_request_id_fkey` FOREIGN KEY (`request_id`) REFERENCES `PlaceRequest`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserPlaceLogin` ADD CONSTRAINT `UserPlaceLogin_shift_id_fkey` FOREIGN KEY (`shift_id`) REFERENCES `Shift`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Shift` ADD CONSTRAINT `Shift_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ViolationImage` ADD CONSTRAINT `ViolationImage_violation_id_fkey` FOREIGN KEY (`violation_id`) REFERENCES `Violation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlateInfo` ADD CONSTRAINT `PlateInfo_violation_id_fkey` FOREIGN KEY (`violation_id`) REFERENCES `Violation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ViolationExtraValues` ADD CONSTRAINT `ViolationExtraValues_violation_rule_id_fkey` FOREIGN KEY (`violation_rule_id`) REFERENCES `ViolationRule`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ViolationRule` ADD CONSTRAINT `ViolationRule_violation_id_fkey` FOREIGN KEY (`violation_id`) REFERENCES `Violation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Violation` ADD CONSTRAINT `Violation_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Violation` ADD CONSTRAINT `Violation_place_id_fkey` FOREIGN KEY (`place_id`) REFERENCES `Place`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
