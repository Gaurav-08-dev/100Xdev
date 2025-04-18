import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const auth = new Hono<{
    Bindings:{
        DATABASE_URL:string // for typecheck env vars
    }
}>();

auth.post("/user/signup", (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  return c.text("hello hono");
});

auth.post("/user/signin", (c) => {
  return c.text("hello hono");
});

export default auth;
