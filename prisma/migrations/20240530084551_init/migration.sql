/*
  Warnings:

  - A unique constraint covering the columns `[access_username]` on the table `PlaceDashboard` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `PlaceDashboard_access_username_key` ON `PlaceDashboard`(`access_username`);
