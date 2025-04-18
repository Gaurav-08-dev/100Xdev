import { Hono } from "hono";

const blog = new Hono();

blog.post("/blog", (c) => {
  return c.text("hello hono");
});

blog.put("/blog", (c) => {
  return c.text("hello hono");
});
blog.get("/blog/:id", (c) => {
  return c.text("hello hono");
});
blog.get("/blog/bulk", (c) => {
  return c.text("hello hono");
});

export default blog;
