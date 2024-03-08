const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes/index");
const cors = require("cors");
const app = express();
const PORT = 3069;


app.use(cors());
app.use(bodyParser.json());
app.use("/api/v1", router);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
