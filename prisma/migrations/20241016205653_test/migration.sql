-- CreateTable
CREATE TABLE "Categories" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Articles" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "topImage" TEXT NOT NULL,
    "middleImage" TEXT NOT NULL,
    "bottomImage" TEXT NOT NULL,
    "paragraphText" TEXT NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "Articles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Categories_category_key" ON "Categories"("category");

-- CreateIndex
CREATE UNIQUE INDEX "Articles_category_key" ON "Articles"("category");
