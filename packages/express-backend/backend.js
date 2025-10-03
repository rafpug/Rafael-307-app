// backend.js
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
  ],
};

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const findUserByName = (list, name) => {
  return list.filter((user) => user["name"] === name);
};

const filterByJob = (list, job) => {
  return list.filter((user) => user["job"] === job);
};

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

const deleteUserById = (id) => {
  const user = findUserById(id);
  if (user != undefined) {
    users["users_list"].splice(
      users["users_list"].indexOf(findUserById(id)),
      1
    );
  } else {
    return undefined;
  }
  return id;
};

app.get("/users", (req, res) => {
  let result = users["users_list"];
  const name = req.query.name;
  const job = req.query.job;
  if (name != undefined) {
    result = findUserByName(result, name);
  }
  if (job != undefined) {
    result = filterByJob(result, job);
  }
  result = { users_list: result };
  res.send(result);
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  userToAdd.id = Math.random();
  addUser(userToAdd);
  res.status(201).send(userToAdd);
});

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  if (deleteUserById(id) == undefined) {
    res.status(404).send();
  }
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
