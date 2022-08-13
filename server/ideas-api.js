const express = require("express");
const db = require("./db");
const checkMillionDollarIdea = require("./checkMillionDollarIdea");
const ideaRouter = express.Router();

ideaRouter.get("/", (req, res) => {
  const ideas = db.getAllFromDatabase("ideas");
  res.send(ideas);
});

ideaRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  const idea = db.getFromDatabaseById("ideas", id);

  res.send(idea);
});

ideaRouter.post("/", checkMillionDollarIdea, (req, res, next) => {
  //check if the idea is worth 1mil, if not go find another company :(
  if (!req.isValueWorth) {
    res.send("Your business proposition is not worth our time");
    return next();
  }
  const { body } = req;
  //check if all properties are on the request body
  if (
    !body.hasOwnProperty("name") ||
    !body.hasOwnProperty("description") ||
    !body.hasOwnProperty("numWeeks") ||
    !body.hasOwnProperty("weeklyRevenue")
  ) {
    const err = new Error('"Property missing from idea POST"');
    return next(err);
  }
  //create and add new minion to db
  const idea = {
    name: body.name,
    description: body.description,
    numWeeks: body.numWeeks,
    weeklyRevenue: body.weeklyRevenue,
  };
  const dbResponse = db.addToDatabase("ideas", idea);
  res.status(201).send(dbResponse);
});

ideaRouter.put("/:id", checkMillionDollarIdea, (req, res, next) => {
  //check if the idea is worth 1mil, if not go find another company :(
  if (!req.isValueWorth) {
    res.send("Your business proposition is not worth our time");
    return next();
  }
  const { body } = req;
  const id = req.params.id;
  //check if all properties are on the request body
  if (
    !body.hasOwnProperty("name") ||
    !body.hasOwnProperty("description") ||
    !body.hasOwnProperty("numWeeks") ||
    !body.hasOwnProperty("weeklyRevenue")
  ) {
    const err = new Error('"Property missing from idea PUT"');
    return next(err);
  }
  //update idea by id
  const idea = {
    id,
    name: body.name,
    description: body.description,
    numWeeks: body.numWeeks,
    weeklyRevenue: body.weeklyRevenue,
  };
  const dbResponse = db.updateInstanceInDatabase("ideas", idea);
  //checks the database response
  dbResponse !== null
    ? res.send(dbResponse)
    : res.status(404).send("Update failed!");
});

ideaRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  const deleteRes = db.deleteFromDatabasebyId("ideas", id);
  deleteRes
    ? res.status(202).send("Idea deleted")
    : res.status(404).send("Invalid idea id");
});

module.exports = ideaRouter;
