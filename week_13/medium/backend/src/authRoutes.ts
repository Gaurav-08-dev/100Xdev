import { Hono } from "hono";
import { PrismaClient } from "./generated/prisma/edge"; // that was some fix 😵
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign} from "hono/jwt";

const auth = new Hono<{
  Bindings: {
    DATABASE_URL: string; // for typecheck env vars
    JWT_SECRET: string;
  };
}>();

auth.post("/user/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
      },
    });

    const jwt = sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt });
  } catch (error) {
    c.status(403);
    return c.json({ error: "Error while signing up" });
  }
});

auth.post("/user/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json()
  const user = await prisma.user.findUnique({
    where:{
      email:body.email,
      password: body.password
    }
  })

  if(!user) {
    c.status(403); 
    return c.json({error:"User not found"})
  }

  const jwt = await sign({id:user.id}, c.env.JWT_SECRET)
  return c.json({jwt})
});

export default auth;
