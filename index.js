// implement your API here
const express = require("express");

//local imports
const db = require("./data/db");

//being able to use express as a server
const server = express();

//make express be able to read json format
server.use(express.json());

//helper error to user function
const sendError = (status, message, res) => {
  res.status(status).json({ errorMessage: message });
};

//GET all users request
server.get("/api/users", (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.json({ error: "The users infomation could not be retrieved" });
    });
});

//GET user by id request
server.get("/api/users/:id", (req, res) => {
  // get id for the responses params
  const getId = req.params.id;

  db.findById(getId)
    .then(user => {
      if (user.length === 0) {
        sendError(404, "The User with the specified ID does not exist.", res);
      }
      res.status(200).json(user);
    })
    .catch(err => {
      sendError(500, "The user information could not be retrieved.", res);
    });
});

//create a user request
server.post("/api/users", (req, res) => {
  const userInput = req.body;

  if (!userInput.name || !userInput.bio) {
    sendError(500, "Please provide name and bio for the user.", res);
  }

  db.insert(userInput)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      sendError(
        500,
        "There was an error while saving the user to the database",
        res
      );
    });
});

//delete user request
server.delete("/api/users/:id", (req, res) => {
  const userId = req.params.id;
  db.remove(userId)
    .then(user => {
      console.log(user);
      //if user comes back as 0 send error code
      if (user === 0) {
        sendError(404, "The user with the specified ID does not exist.", res);
      }
      res.json(user);
    })
    .catch(err => {
      sendError(500, "The user could not be removed", res);
    });
});

//update user request
server.put("/api/users/:id", (req, res) => {
  const userId = req.params.id;
  const userInputs = req.body;

  if (!userInputs.name || !userInputs.bio) {
    sendError(500, "Please provide name and bio for the user.", res);
  }

  db.update(userId, userInputs)
    .then(user => {
      if (user === 0) {
        sendError(404, "The user with the specified ID does not exist.", res);
      }
    })
    .catch(err => {
      sendError(500, "The user information could not be modified.", res);
    });

  db.findById(userId)
    .then(user => {
      if (user.length === 0) {
        sendError(404, "user with id can not be found", res);
      }
      res.status(200).json(user);
    })
    .catch(err => {
      sendError(500, "failure updating user", res);
    });
});

//make server listen on the set host you want it NEEDS func
server.listen(5000, () => {
  console.log("\n *** BACKEND PROJECT 1 RUNNING ON PORT 5000 *** \n");
});
