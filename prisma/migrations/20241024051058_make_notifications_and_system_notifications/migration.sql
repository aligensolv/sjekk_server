-- CreateTable
CREATE TABLE `SystemNotificationComponent` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `body` VARCHAR(191) NULL,
    `icon` VARCHAR(191) NULL,
    `image` VARCHAR(191) NULL,
    `is_favorite` BOOLEAN NOT NULL DEFAULT false,
    `sent_times` INTEGER NOT NULL DEFAULT 0,
    `created_at` VARCHAR(191) NOT NULL,
    `updated_at` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notification` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `body` VARCHAR(191) NULL,
    `icon` VARCHAR(191) NULL,
    `image` VARCHAR(191) NULL,
    `is_clicked` BOOLEAN NOT NULL DEFAULT false,
    `sent_at` VARCHAR(191) NOT NULL,
    `channel` ENUM('apartment', 'residential', 'public_place') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
