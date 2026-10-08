const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Student = require("./models/Student");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/students", async (req, res) => {
  await Student.find({})
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.post("/students", async (req, res) => {
  await Student.create(req.body)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.get("/students/:id", async (req, res) => {
  const id = req.params.id;
  await Student.findById({ _id: id })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.put("/students/:id", async (req, res) => {
  const id = req.params.id;
  await Student.findByIdAndUpdate(
    { _id: id },
    { name: req.body.name, course: req.body.course, age: req.body.age }
  )
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.delete("/students/:id", async (req, res) => {
  const id = req.params.id;
  await Student.findByIdAndDelete({ _id: id })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
