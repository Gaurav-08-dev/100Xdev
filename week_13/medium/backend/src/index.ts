import { Hono } from "hono";
import auth from "./authRoutes";
import blog from "./blogroutes";
import { verify } from "hono/jwt";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.use("/api/v1/blog/*", async (c, next) => {
  // get the header
  // verify the header
  // if correct - proceed
  // not correct - return 403 status
  const header = c.req.header("authorization") || "";
  const res = await verify(header, c.env.JWT_SECRET);

  if (res.id) {
    next();
  } else {
    c.status(403);
    return c.json({ error: "unauthorized" });
  }
});

app.get("/", (c) => {
  return c.text("Hello Hono!");
});
app.route("/api/v1", auth);
app.route("/api/v1", blog);

export default app;
