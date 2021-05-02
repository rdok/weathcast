const express = require("express");
const serverlessExpress = require("@vendia/serverless-express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello express!");
});

app.listen(3000, () => {
  console.log("listening http://localhost:3000");
});

exports.handler = serverlessExpress({ app });
