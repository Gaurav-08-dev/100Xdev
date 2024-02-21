const express = require("express");

const users = [
  { name: "Gaurav", kidneys: [{ healthy: false }, { healthy: true }] },
];

const app = express();

// function sum(n) {
//   let output = 0;
//   for (let i = 1; i <= n; i++) {
//     output += i;
//   }
//   return output;
// }

app.use(express.json());

app.get("/", (req, res) => {
  const userKidneys = users[0].kidneys;
  const countOfKidneys = userKidneys.length;

  let healthyKidney = 0;
  let unhealthyKidney = 0;

  for (let i = 0; i < userKidneys.length; i++) {
    if (userKidneys[i].healthy) healthyKidney += 1;
    else unhealthyKidney += 1;
  }

  res.json({
    countOfKidneys,
    healthyKidney,
    unhealthyKidney,
  });

  //   res.send(`No. of kidneys ${countOfKidneys},
  //   Unhealthy=${healthyKidney},
  //   Healthy=${unhealthyKidney}
  //   `);
});

app.post("/", (req, res) => {
  const isHealthy = req.body.isHealthy;
  console.log(isHealthy);
  users[0].kidneys.push({ healthy: isHealthy });

  res.json({
    msg: "Done~",
  });
});
app.put("/", (req, res) => {
  for (let i = 0; i < users[0].kidneys.length; i++) {
    users[0].kidneys[i].healthy = true;
  }
  res.json({ msg: "Updated!" });
});

app.delete("/", (req, res) => {
  if (checkUnhealthyKidneys()) {
    users[0].kidneys = users[0].kidneys.filter((item) => item.healthy === true);
    res.json({ msg: "Deleted" });
  }
  else{
    res.status(411).json({
        msg:"You have no unhealthy kidneys"
    })
  }
});

const checkUnhealthyKidneys = () => {
  const isExist = users[0].kidneys.findIndex((item) => item.healthy === false);

  return isExist > -1;
};

// app.get("/sum", (req, res) => {
//   const n = req.query.n;
//   const result = sum(n);
//   res.send("Your answer " + result.toString());
// });

app.listen(3000);
