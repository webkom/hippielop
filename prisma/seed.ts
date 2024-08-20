import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const tasks = [
  {
    page: 1,
    points: 10,
    text: "Ta et bilde med en person over 2 meter",
  },
  {
    page: 1,
    points: 10,
    text: "Skriv et dikt om Abakus og legg det ut på Facebook",
  },
  { page: 1, points: 10, text: "Ta 30 pushups sammenhengende" },
  { page: 1, points: 10, text: "Spis en Big-Mac uten å bruke hendene" },
  { page: 1, points: 10, text: "Kjøp noe i SnackOverflow" },
  { page: 1, points: 20, text: "Drikk en liter melk på 20 sekunder" },
  { page: 1, points: 20, text: "Ta et bilde med bjørnen på skolen" },
  {
    page: 1,
    points: 20,
    text: "En på gruppa må spise en skje med kanel",
  },
  { page: 1, points: 20, text: "Ta en bodyshot" },
  { page: 1, points: 20, text: "Spis en chili" },
  {
    page: 1,
    points: 30,
    text: "Make love! Not War! Lag demonstrasjonskilt (med valgfri tekst)",
  },
  { page: 1, points: 50, text: "Ta en shoey (video)" },
  {
    page: 1,
    points: 50,
    text: "To faddere holder seksualundervisning",
  },
  {
    page: 1,
    points: 50,
    text: "Send melding til et tidligere ligg og spør om hen har testet seg",
  },
  {
    page: 1,
    points: 50,
    text: "Ta bilde med en fisk og gjør det til profilbildet ditt på Facebook",
  },
  {
    page: 1,
    points: 50,
    text: "Bytt klær med en på gruppa resten av kvelden",
  },
  {
    page: 1,
    points: 30,
    text: 'Legg ut instastory foran BI med teksten "Kjøp lavt, selg høyt #StayRich"',
  },
  { page: 1, points: 30, text: "Ta gruppebilde på A3 <3" },
  {
    page: 1,
    points: 30,
    text: "Lag en TikTok-video med gruppen og legg den ut",
  },
  {
    page: 1,
    points: 30,
    text: "Chug en Smirnoff Ice på 5 sekunder (video)",
  },
  {
    page: 1,
    points: 100,
    text: "Pant for mer enn 35kr og spill på Pantelotteriet",
  },
  {
    page: 1,
    points: 100,
    text: "Se utsikten fra toppen av Tyholttårnet",
  },
  { page: 1, points: 100, text: "Shave et snitt i øyenbrynet" },
  {
    page: 1,
    points: 100,
    text: "Stå foran Nidarosdomen og syng sangen Domen 2019",
  },
  {
    page: 1,
    points: 100,
    text: 'Få en kjendis til å si "Jeg elsker faddergruppe X"',
  },
  {
    page: 2,
    points: 10,
    text: "Ha en dancebattle med en annen fra gruppa",
  },
  {
    page: 2,
    points: 10,
    text: "Pisk en på gruppa med belte så hardt at personen får rødt merke",
  },
  {
    page: 2,
    points: 10,
    text: "Gjør noe fantastisk for miljøet (f.eks. plukke søppel i park)",
  },
  {
    page: 2,
    points: 10,
    text: "Samel de som vil på gruppa til Breezer-race",
  },
  { page: 2, points: 10, text: "Ta BeReal med en fremmed" },
  { page: 2, points: 20, text: "Ta en hotshot" },
  {
    page: 2,
    points: 20,
    text: "Gi et komplement til alle på faddergruppa",
  },
  { page: 2, points: 20, text: "Les i en readme på balkongen på A3" },
  { page: 2, points: 20, text: "Ring en venn og be om et kompliment" },
  {
    page: 2,
    points: 20,
    text: "Bruk en shot med 20% som munnskyllevann i 10 sekunder (video)",
  },
  {
    page: 2,
    points: 30,
    text: "Drikk en kopp med kaffe på Webkom-kontoret",
  },
  {
    page: 2,
    points: 30,
    text: 'Legg ut "kjører i kveld" på offentlig snapstory',
  },
  {
    page: 2,
    points: 30,
    text: "Send takkemelding til en tidligere lærer",
  },
  {
    page: 2,
    points: 30,
    text: "Gi en blomst til Kristoffer Wetterhus (Abakus-leder)",
  },
  { page: 2, points: 30, text: "Ring en Abakus-komitéleder" },
  {
    page: 2,
    points: 50,
    text: "Send godnattmelding til klassechat fra videregående",
  },
  { page: 2, points: 50, text: "Lag en russesang og fremfør (video)" },
  { page: 2, points: 50, text: "Sable en cava" },
  {
    page: 2,
    points: 50,
    text: "Kidnapp en fadder fra en annen gruppe",
  },
  {
    page: 2,
    points: 50,
    text: "Stå 5 minutter utenfor en matbutikk og ønsk folk velkommen",
  },
  {
    page: 2,
    points: 100,
    text: "Livestream at du leker hund på Instagram i 2 minutter",
  },
  { page: 2, points: 100, text: "Finn en lookalike og ta bilde" },
  {
    page: 2,
    points: 100,
    text: "Lag sjokolademelk med en i gruppa. Den ene har Oboypulver i munnen, den andre har melk",
  },
  {
    page: 2,
    points: 100,
    text: "Konsumer en kebab som har vært gjennom miksmasteren",
  },
  {
    page: 2,
    points: 100,
    text: "Vipps 100kr til kreftforeningen (Vipps: #2277)",
  },
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
