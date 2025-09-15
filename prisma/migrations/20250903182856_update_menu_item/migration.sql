/*
  Warnings:

  - You are about to drop the column `position` on the `menu_category` table. All the data in the column will be lost.
  - You are about to drop the column `descri` on the `menu_item` table. All the data in the column will be lost.
  - Made the column `country_id` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."user" DROP CONSTRAINT "user_country_id_fkey";

-- AlterTable
ALTER TABLE "public"."menu_category" DROP COLUMN "position";

-- AlterTable
ALTER TABLE "public"."menu_item" DROP COLUMN "descri",
ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "public"."user" ALTER COLUMN "country_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."user" ADD CONSTRAINT "user_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "public"."country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
