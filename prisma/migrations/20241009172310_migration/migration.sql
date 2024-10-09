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
    "topParagraph" TEXT NOT NULL,
    "middleImage" TEXT NOT NULL,
    "middleParagraph" TEXT NOT NULL,
    "bottomImage" TEXT NOT NULL,
    "bottomParagraph" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ArticlesToCategories" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ArticlesToCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "Articles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ArticlesToCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "Categories" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Categories_category_key" ON "Categories"("category");

-- CreateIndex
CREATE UNIQUE INDEX "_ArticlesToCategories_AB_unique" ON "_ArticlesToCategories"("A", "B");

-- CreateIndex
CREATE INDEX "_ArticlesToCategories_B_index" ON "_ArticlesToCategories"("B");
