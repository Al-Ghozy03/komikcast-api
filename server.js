const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet").default;
const { router } = require("./router");
require("dotenv").config();


app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(router);

app.listen(process.env.PORT);

