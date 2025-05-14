import { PrismaClient } from "../generated/prisma";
const prisma = new PrismaClient();
async function main() {
  const alice = await prisma.user.upsert({
    where: { number: "9999999999" },
    update: {},
    create: {
      number: "9999999999",
      password: "alice",
      name: "alice",
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Success",
          amount: 20000,
          token: "122",
          provider: "HDFC Bank",
        },
      },
    },
  });
  const bob = await prisma.user.upsert({
    where: { number: "9999999998" },
    update: {},
    create: {
      number: "9999999998",
      password: "bob",
      name: "bob",
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Failure",
          amount: 2000,
          token: "123",
          provider: "HDFC Bank",
        },
      },
    },
  });

  await prisma.balance.upsert({
    where: { userId: 1 },
    create: {
      userId: 1,
      amount: 20000,
      locked: 0
    },
    update: {
      amount:20000
    }
  })
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
