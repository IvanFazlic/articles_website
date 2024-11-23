-- CreateTable
CREATE TABLE "Ticket" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);
