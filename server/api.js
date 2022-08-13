const express = require("express");
const minionRouter = require("./minions-api");
const ideaRouter = require("./ideas-api");
const meetingRouter = require("./meeting-api");
const apiRouter = express.Router();

//routers for different api endpoints
apiRouter.use("/minions", minionRouter);
apiRouter.use("/ideas", ideaRouter);
apiRouter.use("/meetings", meetingRouter);

module.exports = apiRouter;
