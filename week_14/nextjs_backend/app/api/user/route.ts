import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();

// export async function GET() {
//   const user = await client.user.findFirst({});
//   console.log(user);
//   return Response.json({
//     email: user.username,
//     name: user.id,
//   });
// }
export async function POST(req: NextRequest) {
  // extract the body
  const body = await req.json();

  // store the body in database
  
  const user = await client.user.create({
    data: {
      username: body.username,
      password: body.password,
    },
  });

  // return the response
  return Response.json({
    message: "You are logged in",
  });
}
