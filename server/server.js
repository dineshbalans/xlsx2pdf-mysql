import express from "express";
import sequelize from "./utils/database.js";
import Data from "./model/data.js";
import cors from "cors";
import dataRouter from "./routes/data.js";

const app = express();

app.use(cors());
app.use(express.json());

sequelize.sync().catch((err) => {
  console.log(err);
});

app.use("/api", dataRouter);

app.get("/", (req, res) => {
  Data.findAll().then((data) => {
    res.send(data);
  });
});

app.use("*", (req, res) => {
  res.status(404).send("Page not found");
});

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
