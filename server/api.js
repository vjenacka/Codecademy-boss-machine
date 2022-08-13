const express = require("express");
const minionRouter = require("./minions-api");
const apiRouter = express.Router();

//router for the /api/minions route
apiRouter.use("/minions", minionRouter);

module.exports = apiRouter;
