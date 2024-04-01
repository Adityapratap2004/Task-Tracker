const express = require('express');
const { createTask, getTask, editTask, deleteTask } = require('../controller/taskController');
const fetchUser = require('../middleware/fetchUser');
const { body } = require('express-validator');
const Router = express.Router();


//assigning the task

Router.post('/',fetchUser,[
    body('title', 'Title can not be null').trim().notEmpty(),
    body('description', 'Description can not be null').trim().notEmpty(),
    body('priority', 'Enter valid priority').isIn(['P0', 'P1', 'P2']),
    body('status', 'Enter valid status').isIn(['Pending' ,'In Progress', 'Completed',  'Deployed',  'Deffered'])
],createTask
)

//get all the records of the task
//login required 

Router.get("/", fetchUser, getTask);

//edit the a particular task
//login required
Router.patch("/",fetchUser,editTask);


Router.delete("/:id",fetchUser,deleteTask);




module.exports = Router