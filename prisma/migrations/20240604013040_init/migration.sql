-- AlterTable
ALTER TABLE `violationextravalues` MODIFY `meter_receipt_number` VARCHAR(191) NULL,
    MODIFY `expiry_date` VARCHAR(191) NULL,
    MODIFY `meter_number` VARCHAR(191) NULL,
    MODIFY `paid_amount` VARCHAR(191) NULL;
