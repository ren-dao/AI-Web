-- CreateTable
CREATE TABLE "SideHustle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "fullDescription" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "timeInvestment" TEXT NOT NULL,
    "incomeMin" INTEGER NOT NULL,
    "incomeMax" INTEGER NOT NULL,
    "requiredSkills" TEXT NOT NULL,
    "toolsResources" TEXT NOT NULL,
    "startupCost" TEXT NOT NULL,
    "stepsToStart" TEXT NOT NULL,
    "pros" TEXT NOT NULL,
    "cons" TEXT NOT NULL,
    "tipsForSuccess" TEXT NOT NULL,
    "resourceLinks" TEXT NOT NULL,
    "coverImage" TEXT,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "averageRating" REAL NOT NULL DEFAULT 0,
    "ratingCount" INTEGER NOT NULL DEFAULT 0,
    "commentCount" INTEGER NOT NULL DEFAULT 0,
    "isApproved" BOOLEAN NOT NULL DEFAULT true,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "submitterName" TEXT NOT NULL,
    "submitterEmail" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "authorEmail" TEXT,
    "sideHustleId" TEXT NOT NULL,
    "parentId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Comment_sideHustleId_fkey" FOREIGN KEY ("sideHustleId") REFERENCES "SideHustle" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Comment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Comment" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Rating" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" INTEGER NOT NULL,
    "authorName" TEXT NOT NULL,
    "authorEmail" TEXT,
    "sideHustleId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Rating_sideHustleId_fkey" FOREIGN KEY ("sideHustleId") REFERENCES "SideHustle" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "SideHustle_slug_key" ON "SideHustle"("slug");

-- CreateIndex
CREATE INDEX "SideHustle_category_idx" ON "SideHustle"("category");

-- CreateIndex
CREATE INDEX "SideHustle_difficulty_idx" ON "SideHustle"("difficulty");

-- CreateIndex
CREATE INDEX "SideHustle_isFeatured_idx" ON "SideHustle"("isFeatured");

-- CreateIndex
CREATE INDEX "SideHustle_createdAt_idx" ON "SideHustle"("createdAt");

-- CreateIndex
CREATE INDEX "SideHustle_averageRating_idx" ON "SideHustle"("averageRating");

-- CreateIndex
CREATE INDEX "Comment_sideHustleId_idx" ON "Comment"("sideHustleId");

-- CreateIndex
CREATE INDEX "Comment_parentId_idx" ON "Comment"("parentId");

-- CreateIndex
CREATE INDEX "Rating_sideHustleId_idx" ON "Rating"("sideHustleId");

-- CreateIndex
CREATE UNIQUE INDEX "Rating_sideHustleId_authorEmail_key" ON "Rating"("sideHustleId", "authorEmail");
