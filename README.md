# taskmanager

Application used to make CURD operation with Tasks.

Create Task:
-------------

This Request used to create new task in the system.

Method : POST
URL : /tasks/

Request Body: 
{
      "id": 1,
      "title": "Task 1",
      "description": "TAsk 1 Description",
      "status": 0
}

Update Task:
-------------

This Request used to update the existing task in the system.

Method : PUT
URL : /tasks/<id>

Request Body: 
{
      "id": 1,
      "title": "Task 1 updated",
      "description": "TAsk 1 Description updated",
      "status": 0
}

Get Task:
----------

This Request used to retrieve all tasks in the system

Method: GET
URL : /tasks/

Response : Tasks Json


Get particular Task:
-------------------

This method used to retrieve particular task based on id

Method : GET
URL : /tasks/<id>

Response : Task Json

Delete Task:
------------

This method used to delete the task in the system.

Method : Delete
URL : /tasks/<id>