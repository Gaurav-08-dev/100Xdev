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

// getUser("test@g.com")

async function deleteUser(username: string) {
  const res = await prisma.user.delete({
    where: {
      username,
    },
  });

  console.log(res);
}

// deleteUser("gaurav@g.com")

async function createTodo(
  title: string, 
  description: string,
  userId: number, 
) {
  const todo = await prisma.todo.create({
    data: {
      title,
      description,
      userId
    }
  });
  console.log(todo)
}
 
// createTodo("go to moon", "go to moon and die", 1)

async function getTodo(userId:number){
  const todo = await prisma.todo.findMany({
    where:{
      userId:userId
    }
  })

  console.log(todo)
}

// getTodo(2)

async function getUserDetailsandTodos(userId:number){

  const details = await prisma.todo.findMany({
    where:{userId:userId},
    select:{
      user:true,
      title:true,
      description:true
    }
  })

  console.log(details)
}


getUserDetailsandTodos(2)