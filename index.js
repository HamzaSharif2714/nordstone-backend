const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

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

  res.json({ result });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
