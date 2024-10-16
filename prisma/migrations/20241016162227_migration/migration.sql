/*
  Warnings:

  - A unique constraint covering the columns `[category]` on the table `Articles` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Articles_category_key" ON "Articles"("category");
