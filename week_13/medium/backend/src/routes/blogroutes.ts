import { Hono } from "hono";
import { PrismaClient } from "../generated/prisma/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const blog = new Hono<{
  Bindings: {
    DATABASE_URL: string; // for typecheck env vars
    JWT_SECRET: string;
  };
}>();

// blog.use("/*", (c, next) => {
// EXtract user ID
//  pass it down to route handler
//   next();
// });

blog.post("/", async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: "1",
    },
  });

  return c.json({
    id: blog.id,
  });
});

blog.put("/", async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog = await prisma.post.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });

  return c.json({
    id: blog.id,
  });
});

blog.get("/:id", async (c) => {
  const id = c.req.param('id');
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.post.findFirst({
      where: {
        id: id,
      },
    });
    return c.json({
      blog,
    });
  } catch (error) {
    c.status(411);

    return c.json({ message: "Blog not found!" });
  }
});

blog.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog = await prisma.post.findMany();
  return c.json({ blog });
});

export default blog;
