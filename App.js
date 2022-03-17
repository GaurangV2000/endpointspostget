const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");

const app = express();

dotenv.config({ path: "./config.env" });
require("./DB/conn.js");

app.use(express.json());
app.use(require("./router/auth"));

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Please use the Postman to check tge Endpoints ( addData & GetData)");
});


app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});