/*
  Warnings:

  - Added the required column `check` to the `Tasks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Tasks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tasks` ADD COLUMN `check` INTEGER NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;
