-- CreateTable
CREATE TABLE `ViolationExtras` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `violation_rule_id` INTEGER NOT NULL,
    `meter_receipt_number` BOOLEAN NOT NULL DEFAULT false,
    `meter_number` BOOLEAN NOT NULL DEFAULT false,
    `paid_amount` BOOLEAN NOT NULL DEFAULT false,
    `expiry_date` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `ViolationExtras_violation_rule_id_key`(`violation_rule_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ViolationExtras` ADD CONSTRAINT `ViolationExtras_violation_rule_id_fkey` FOREIGN KEY (`violation_rule_id`) REFERENCES `ViolationRule`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
