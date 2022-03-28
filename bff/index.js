require("dotenv").config({
  override: true,
});

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.json());

const loginHandler = require("./handlers/login");
const protectedHandler = require("./handlers/protected");

const guard = require("./middlewares/guard");

app.post("/api/login", loginHandler);

app.use(guard).get("/api/protected", protectedHandler);

const PORT = 8000;
app.listen(PORT, () => console.log(`Example BFF listening on port ${PORT}!`));
