-- CreateTable
CREATE TABLE `SystemCar` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `plate_number` VARCHAR(191) NOT NULL,
    `last_registered_date` VARCHAR(191) NOT NULL,
    `residential_quarter_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
