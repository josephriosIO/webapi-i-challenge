// implement your API here
const express = require("express");

//local imports
const db = require("./data/db");

//being able to use express as a server
const server = express();

//make express be able to read json format
server.use(express.json());

//GET all users request
server.get("/users", (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.json({ error: "The users infomation could not be retrieved" });
    });
});

//GET user by id request
server.get("/users/:id", (req, res) => {
  // get id for the responses params
  const getId = req.params.id;

  db.findById(getId)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.json({ message: "The User with the specified ID does not exist." });
    });
});

//make server listen on the set host you want it NEEDS func
server.listen(5000, () => {
  console.log("\n *** BACKEND PROJECT 1 RUNNING ON PORT 5000 *** \n");
});
