const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
var tasksData = require("./tasks.json");
var validator = require("./helpers/validator");
const app = express();
const port = 8080;
let writeFilePath = path.join(__dirname, ".", "tasks.json");

// support parsing of application/json type post data
app.use(bodyParser.json());

app.listen(port, () => {
  console.log("Server is up and running");
});

app.get("/", (req, res) => {
  console.log("Get request");
  res.send("");
});

app.get("/tasks", (req, res) => {
  res.status(200).json(tasksData.tasks);
});

app.get("/tasks/:id", (req, res) => {
  let id = req.params.id;
  let tasksList = tasksData.tasks;
  let returnTask = tasksList.filter((task) => task.id == id);
  if (returnTask.length == 0) {
    res.status(404);
    res.send("Sorry No Tasks found for given id");
  }
  res.status(200).send(returnTask);
});

app.post("/tasks", (req, res) => {
  let taskInfo = req.body;
  if (validator.validateTask(taskInfo)) {
    let createdCourse = JSON.parse(JSON.stringify(taskInfo));
    tasksData.tasks.push(createdCourse);
    console.log(tasksData);
    fs.writeFile(
      writeFilePath,
      JSON.stringify(tasksData),
      {
        encoding: "utf-8",
        flag: "w",
      },
      function (err, data) {
        if (err) {
          res.status(500).send("Sorry! There is an issue to create a task");
        } else {
          res.status(201).send("Task created Successfully");
        }
      }
    );
  } else {
    res
      .status(400)
      .send(
        "Sorry! There is an validation error occured. Please verify the data"
      );
  }
});

app.delete("/tasks/:id", (req, res) => {
  let taskId = req.params.id;
  var taskList = tasksData.tasks;
  let taskExist = taskList.filter((task) => task.id == taskId);
  if (taskExist.length === 1) {
    let filteredTasks = taskList.filter((task) => task.id != taskId);

    tasksData.tasks = filteredTasks;

    fs.writeFile(
      writeFilePath,
      JSON.stringify(tasksData),
      {
        encoding: "utf-8",
        flag: "w",
      },
      function (err, data) {
        if (err) {
          res.status(500).send("Sorry! There is an issue to deleting task");
        } else {
          res.status(201).send("Task Deleted Successfully");
        }
      }
    );
  } else {
    res.status(400).send("Sorry! Please enter valid task id");
  }
});

app.put("/tasks/:id", (req, res) => {
  let taskIdToUpdate = req.params.id;
  let taskInfoToUpdate = req.body;
  var taskList = tasksData.tasks;
  if (validator.validateTask(taskInfoToUpdate)) {
    let taskExist = taskList.filter((task) => task.id == taskIdToUpdate);
    if (taskExist.length === 1) {
      let filteredTasks = taskList.filter((task) => task.id != taskIdToUpdate);
      filteredTasks.push(taskInfoToUpdate);
      tasksData.tasks = filteredTasks;

      fs.writeFile(
        writeFilePath,
        JSON.stringify(tasksData),
        {
          encoding: "utf-8",
          flag: "w",
        },
        function (err, data) {
          if (err) {
            res.status(500).send("Sorry! There is an issue to updating task");
          } else {
            res.status(201).send("Task updating Successfully");
          }
        }
      );
    } else {
      res.status(400).send("Sorry! Please enter valid task id");
    }
  } else {
    res
      .status(400)
      .send("Sorry! There is a validation issue.. Please check the data");
  }
});
