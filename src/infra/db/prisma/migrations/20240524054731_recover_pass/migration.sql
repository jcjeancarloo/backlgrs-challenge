-- CreateTable
CREATE TABLE "recover_password" (
    "id" TEXT NOT NULL,
    "codeValidation" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recover_password_pkey" PRIMARY KEY ("id")
);
