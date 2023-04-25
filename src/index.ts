interface User {
  name: string,
  socialSecurityNumber: number,
  orangTua: User | null,
}

const kevin: User = {
  name: "Kevin",
  socialSecurityNumber: 123,
  orangTua: {
    name: "Ferdinandus",
    socialSecurityNumber: 789,
    orangTua: null
  }
}

import express from "express";
import authRoute from "./routes/Auth.js";

const app = express();
app.use(express.urlencoded({ extended: true }));

app.get("/api", async (req, res) => {
  return res.status(200).send({
    message: "test",
    kevin,
  })
})

app.use("/api/auth", authRoute);

const port = 3000;
app.listen(port, function () {
  console.log(`listening on port ${port}`);
});
