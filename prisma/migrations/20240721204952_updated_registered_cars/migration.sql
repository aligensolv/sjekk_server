/*
  Warnings:

  - You are about to drop the column `subscription_plan_time` on the `residentialcar` table. All the data in the column will be lost.
  - Added the required column `subscription_plan_days` to the `ResidentialCar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `residentialcar` DROP COLUMN `subscription_plan_time`,
    ADD COLUMN `subscription_plan_days` INTEGER NOT NULL;
