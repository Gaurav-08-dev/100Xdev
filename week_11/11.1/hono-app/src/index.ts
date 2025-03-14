import { Hono } from "hono";

const app = new Hono();

// app.get("/", (c) => c.text("Helllloo cloudfare workers from hono!!!"));

async function authMiddleware(c: any, next: any) {
  if (c.req.header("Authorization")) await next();
  else return c.text("You dont have access");
}

app.use(authMiddleware);
app.post("/", authMiddleware, async (c) => {
  const body = await c.req.json();
  console.log(c);
  console.log(body);
  console.log(c.req.header("Authorization"));
  console.log(c.req.query("param"));

  return c.text("Hello Hono!");
});

export default app;
