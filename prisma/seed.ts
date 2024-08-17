import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const tasks = [
  { page: 1, points: 10, text: "Ta et bilde med en person over 2m" },
  {
    page: 1,
    points: 10,
    text: "Skriv et dikt om Trondheim og del det på Facebook",
  },
  { page: 1, points: 10, text: "Eksempel 3" },
  { page: 1, points: 10, text: "Eksempel 4" },
  { page: 1, points: 10, text: "Eksempel 5" },
  { page: 1, points: 25, text: "Ta et bilde med en person over 2m" },
  {
    page: 1,
    points: 25,
    text: "Skriv et dikt om Trondheim og del det på Facebook",
  },
  { page: 1, points: 50, text: "Eksempel 3" },
  { page: 1, points: 50, text: "Eksempel 4" },
  { page: 1, points: 50, text: "Eksempel 5" },
  { page: 1, points: 100, text: "Eksempel 5" },
  { page: 2, points: 10, text: "Side 2, 10 poeng" },
  { page: 2, points: 25, text: "Side 2, 25 poeng" },
  { page: 2, points: 50, text: "Side 2, 50 poeng" },
  { page: 2, points: 100, text: "Side 2, 100 poeng" },
];

async function main() {
  try {
    await prisma.task.createMany({
      data: tasks,
    });
    console.log("Tasks seeded successfully");
  } catch (error) {
    console.error("Error seeding tasks:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
