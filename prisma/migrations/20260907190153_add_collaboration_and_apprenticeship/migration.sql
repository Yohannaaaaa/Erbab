-- CreateEnum
CREATE TYPE "CollaborationStatus" AS ENUM ('PENDING', 'ACCEPTED', 'DECLINED');

-- CreateEnum
CREATE TYPE "ApprenticeshipStatus" AS ENUM ('PENDING', 'ACCEPTED', 'DECLINED');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "NotificationType" ADD VALUE 'COLLABORATION_PROPOSAL';
ALTER TYPE "NotificationType" ADD VALUE 'COLLABORATION_ACCEPTED';
ALTER TYPE "NotificationType" ADD VALUE 'COLLABORATION_DECLINED';
ALTER TYPE "NotificationType" ADD VALUE 'APPRENTICESHIP_REQUEST';
ALTER TYPE "NotificationType" ADD VALUE 'APPRENTICESHIP_ACCEPTED';
ALTER TYPE "NotificationType" ADD VALUE 'APPRENTICESHIP_DECLINED';

-- CreateTable
CREATE TABLE "CollaborationProposal" (
    "id" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "recipientId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" "CollaborationStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CollaborationProposal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApprenticeshipRequest" (
    "id" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "recipientId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" "ApprenticeshipStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ApprenticeshipRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CollaborationProposal" ADD CONSTRAINT "CollaborationProposal_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollaborationProposal" ADD CONSTRAINT "CollaborationProposal_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApprenticeshipRequest" ADD CONSTRAINT "ApprenticeshipRequest_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApprenticeshipRequest" ADD CONSTRAINT "ApprenticeshipRequest_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
