// import axios from "axios";
// import { PrismaClient } from "@prisma/client";
// const client = new PrismaClient();

import client from "../db";
// * standard way
// async function getUserData() {

//   await new Promise((r)=> setTimeout(r,5000))
//   const response = await axios.get("http://localhost:3000/api/user");
//   return response.data;
// }

// ! Better way
async function getUserData() {
  try {
    const user = await client.user.findFirst({});
    return { email: user?.username, name: user?.id };
  } catch (error) {
    console.log(error);
  }
}

export default async function Home() {
  const userDetails = await getUserData();

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <p>{userDetails.email}</p>
      <p>{userDetails.name}</p>
    </div>
  );
}
