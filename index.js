const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
mongoose.set("strictQuery", false);
// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/nordstone", {
  useNewUrlParser: true,
});
app.use(cors());
app.use(express.json());

// Create a schema for the calculation results
const calculationSchema = new mongoose.Schema({
  operation: String,
  num1: Number,
  num2: Number,
  result: Number,
  timestamp: { type: Date, default: Date.now },
});

// Create a model for the calculation results
const Calculation = mongoose.model("Calculation", calculationSchema);

app.post("/calculate", (req, res) => {
  const { num1, num2, operation } = req.body;
  let result;
  switch (operation) {
    case "addition":
      result = Number(num1) + Number(num2);
      break;
    case "subtraction":
      result = Number(num1) - Number(num2);
      break;
    case "multiplication":
      result = Number(num1) * Number(num2);
      break;
    default:
      return res.status(400).send({ error: "Invalid operation" });
  }
  // Create a new calculation object
  const calculation = new Calculation({
    operation,
    num1,
    num2,
    result,
  });
  // Save the calculation object to the database
  calculation.save((err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({ result });
    }
  });
});
app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log("Server listening on port 3000");
});
