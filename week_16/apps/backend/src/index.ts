import express, { type Express } from "express";
import {BACKEND_URL} from "@repo/common"
const app = express();

const port = 3069;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});

app.get("/", (req,res)=> {
     res.json({message:BACKEND_URL})
})