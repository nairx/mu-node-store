import express from "express";
import mongoose from "mongoose";

import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/mudb").then(() => {
  app.listen(8080, () => {
    console.log("Server started");
  });
});

const userSchema = mongoose.Schema({
  name: { type: String },
  email: { type: String },
  pass: { type: String },
});

const userModel = mongoose.model("user", userSchema);

app.get("/", (req, res) => {
  res.send("Hello World");
});

const products = [];

app.post("/products", async (req, res) => {
  console.log(req.body);
  const body = await req.body;
  products.push(body);
  res.json(body);
});

app.get("/products", async (req, res) => {
  res.json(products);
});

app.post("/register", async (req, res) => {
  const body = req.body;
  const user = await userModel.create(body);
  res.json(user);
});

app.post("/login", async (req, res) => {
  const body = req.body;
  const found = await userModel.findOne({ email: body.email, pass: body.pass });
  res.json(found);
});
