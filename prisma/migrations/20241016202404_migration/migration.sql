-- CreateTable
CREATE TABLE "Categories" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "image" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Articles" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "topImage" TEXT NOT NULL,
    "middleImage" TEXT NOT NULL,
    "bottomImage" TEXT NOT NULL,
    "paragraphText" TEXT NOT NULL,
    "category" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Categories_category_key" ON "Categories"("category");

-- CreateIndex
CREATE UNIQUE INDEX "Articles_category_key" ON "Articles"("category");
