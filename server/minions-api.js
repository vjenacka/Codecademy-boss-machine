const express = require("express");
const db = require("./db");
const minionRouter = express.Router();

minionRouter.get("/", (req, res) => {
  const minions = db.getAllFromDatabase("minions");
  res.send(minions);
});

minionRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  const minion = db.getFromDatabaseById("minions", id);

  res.send(minion);
});

minionRouter.post("/", (req, res, next) => {
  const { body } = req;
  //check if all properties are on the request body
  if (
    !body.hasOwnProperty("name") ||
    !body.hasOwnProperty("weaknesses") ||
    !body.hasOwnProperty("title") ||
    !body.hasOwnProperty("salary")
  ) {
    const err = new Error('"Property missing from minions POST"');
    return next(err);
  }
  //create and add new minion to db
  const minion = {
    name: body.name,
    weaknesses: body.weaknesses,
    title: body.title,
    salary: body.salary,
  };
  const dbResponse = db.addToDatabase("minions", minion);
  res.status(201).send(dbResponse);
});

minionRouter.put("/:id", (req, res, next) => {
  const { body } = req;
  const id = req.params.id;
  //check if all properties are on the request body
  if (
    !body.hasOwnProperty("name") ||
    !body.hasOwnProperty("weaknesses") ||
    !body.hasOwnProperty("title") ||
    !body.hasOwnProperty("salary")
  ) {
    const err = new Error('"Invalid PUT request!"');
    return next(err);
  }
  //update minion by id
  const minion = {
    id,
    name: body.name,
    weaknesses: body.weaknesses,
    title: body.title,
    salary: body.salary,
  };
  const dbResponse = db.updateInstanceInDatabase("minions", minion);
  //checks the database response
  dbResponse !== null
    ? res.send(dbResponse)
    : res.status(404).send("Update failed!");
});

minionRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  const deleteRes = db.deleteFromDatabasebyId("minions", id);
  deleteRes
    ? res.status(202).send("Minion deleted")
    : res.status(404).send("Invalid minion id");
});

module.exports = minionRouter;
