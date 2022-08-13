const express = require("express");
const db = require("./db");
const meetingRouter = express.Router();

meetingRouter.get("/", (req, res) => {
  const meetings = db.getAllFromDatabase("meetings");
  res.send(meetings);
});

meetingRouter.post("/", (req, res, next) => {
  const dbResponse = db.createMeeting();
  res.status(201).send(dbResponse);
});

meetingRouter.delete("/", (req, res) => {
  const deleteRes = db.deleteAllFromDatabase("meetings");
  deleteRes.length === 0
    ? res.send("All meetings deleted")
    : res.status(404).send("Failed with deletion");
});

module.exports = meetingRouter;
