import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function insertUser(
  username: string,
  password: string,
  firstName: string,
  lastName: string
) {
  const res = await prisma.user.create({
    data: {
      username,
      firstName,
      lastName,
      password,
    },
  });
  console.log(res);
}

// insertUser("test@g.com", "1234", "test", "bot");

interface UpdatePropsType {
  firstName: string;
  lastName: string;
}

async function updateUser(
  username: string,
  { firstName, lastName }: UpdatePropsType
) {
  const res = await prisma.user.update({
    where: { username },
    data: { firstName, lastName },
  });

  console.log(res);
}

// updateUser("gaurav@g.com", { firstName: "cristiano", lastName: "Rana" });

async function getUser(username: string) {
  const res = await prisma.user.findFirst({
    where: {
      username,
    },
  });
  console.log(res);
}

getUser("test@g.com")

async function deleteUser(username: string) {
  const res = await prisma.user.delete({
    where: {
      username,
    },
  });

  console.log(res)
}

// deleteUser("gaurav@g.com")