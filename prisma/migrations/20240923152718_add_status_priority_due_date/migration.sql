-- AlterTable
ALTER TABLE "Task" 
ADD COLUMN     "dueDate" TIMESTAMP(3),
ADD COLUMN     "priority" TEXT NOT NULL DEFAULT 'Medium',
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'Not Started';
