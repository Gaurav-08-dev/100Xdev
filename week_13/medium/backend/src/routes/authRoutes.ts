import { Hono } from "hono";
import { PrismaClient } from "../generated/prisma/edge"; // that was some fix 😵
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import {signupInput, signinInput} from "@dev_gaurav/middleware-medium"

const auth = new Hono<{
  Bindings: {
    DATABASE_URL: string; // for typecheck env vars
    JWT_SECRET: string;
  };
}>();

auth.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const {success} = signupInput.safeParse(body);
  
  if(!success){
    c.status(403);
    return c.json({ error: "Invalid Input" });
  }
  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
      },
    });

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.text(jwt);
  } catch (error) {
    console.log(error);
    c.status(403);
    return c.json({ error: "Error while signing up" });
  }
});

auth.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const {success} = signinInput.safeParse(body);
  
  if(!success){
    c.status(403);
    return c.json({ error: "Invalid Input" });
  }
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
      password: body.password,
    },
  });

  if (!user) {
    c.status(403); // status code for unauthorized
    return c.json({ error: "User not found" });
  }

  const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
  return c.json({ jwt });
});

export default auth;
