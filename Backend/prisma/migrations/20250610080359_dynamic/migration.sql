-- CreateTable
CREATE TABLE "HomePage" (
    "id" SERIAL NOT NULL,
    "Banner" TEXT NOT NULL,

    CONSTRAINT "HomePage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AboutPage" (
    "id" SERIAL NOT NULL,
    "Banner" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description1" TEXT NOT NULL,
    "description2" TEXT NOT NULL,
    "description3" TEXT NOT NULL,
    "whatWeDoTitle" TEXT NOT NULL,
    "whatWeDoDescription1" TEXT NOT NULL,
    "whatWeDoDescription2" TEXT NOT NULL,
    "img" TEXT NOT NULL,

    CONSTRAINT "AboutPage_pkey" PRIMARY KEY ("id")
);
