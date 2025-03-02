const express = require("express");
const rootRouter = require("./router");
const cors = require("cors");
const router = require("./router");
const app = express();
app.use(cors());

app.use(express.json());
app.use("./api/v1", rootRouter);

app.listen(3000);
module.exports = router;
