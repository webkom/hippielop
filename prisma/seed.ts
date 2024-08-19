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

const groups = [
  { name: "Data 1" },
  { name: "Data 2" },
  { name: "Data 3" },
  { name: "Data 4" },
  { name: "Data 5" },
  { name: "Data 6" },
  { name: "Data 7" },
  { name: "Data 8" },
  { name: "Data 9" },
  { name: "Data 10" },
  { name: "Data 11" },

  { name: "Cybdat 1" },
  { name: "Cybdat 2" },
  { name: "Cybdat 3" },
  { name: "Cybdat 4" },
  { name: "Cybdat 5" },
  { name: "Cybdat 6" },
];

function generateCode() {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < 6) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

async function main() {
  try {
    await prisma.task.createMany({
      data: tasks,
    });
    console.log("Seeded tasks");
    await prisma.group.createMany({
      data: groups.map((group) => ({ ...group, code: generateCode() })),
    });
    console.log("Seeded groups");
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
