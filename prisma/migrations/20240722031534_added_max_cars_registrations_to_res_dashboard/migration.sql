/*
  Warnings:

  - Added the required column `max_cars_registrations` to the `ResidentialDashboard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `residentialdashboard` ADD COLUMN `max_cars_registrations` INTEGER NOT NULL;
