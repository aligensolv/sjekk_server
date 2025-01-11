/*
  Warnings:

  - The values [canceled] on the enum `PaymentStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PaymentStatus_new" AS ENUM ('idle', 'overdued', 'refunded', 'completed');
ALTER TABLE "Payment" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Payment" ALTER COLUMN "status" TYPE "PaymentStatus_new" USING ("status"::text::"PaymentStatus_new");
ALTER TYPE "PaymentStatus" RENAME TO "PaymentStatus_old";
ALTER TYPE "PaymentStatus_new" RENAME TO "PaymentStatus";
DROP TYPE "PaymentStatus_old";
ALTER TABLE "Payment" ALTER COLUMN "status" SET DEFAULT 'idle';
COMMIT;

-- AlterTable
ALTER TABLE "TicketInfo" ADD COLUMN     "kid" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "payment_intent_client_secret" TEXT NOT NULL DEFAULT '';
