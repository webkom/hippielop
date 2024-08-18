-- CreateEnum
CREATE TYPE "Status" AS ENUM ('started', 'sent', 'completed');

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "page" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroupTask" (
    "id" SERIAL NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'started',
    "groupId" INTEGER NOT NULL,
    "taskId" INTEGER NOT NULL,

    CONSTRAINT "GroupTask_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GroupTask" ADD CONSTRAINT "GroupTask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupTask" ADD CONSTRAINT "GroupTask_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
