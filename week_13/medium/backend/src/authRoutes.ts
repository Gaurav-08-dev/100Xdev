import { Hono } from "hono";

const auth = new Hono();

auth.post("/user/signup", (c) => {
return c.text("hello hono")
})

auth.post("/user/signin", (c) => {
    return c.text("hello hono")
})

export default auth;

