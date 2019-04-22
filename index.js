// implement your API here
const express = require("express");

//local imports
const db = require("./data/db");

//being able to use express as a server
const server = express();

//make express be able to read json format
server.use(express.json());

//GET request
server.get("/users", (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.json({ error: "The users infomation could not be retrieved" });
    });
});

server.listen(5000, () => {
  console.log("\n *** BACKEND PROJECT 1 RUNNING ON PORT 5000 *** \n");
});
