import { Hono } from "hono";
import auth from "./authRoutes";
import blog from "./blogroutes";
const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});
app.route("/api/v1", auth);
app.route("/api/v1", blog);

export default app;
