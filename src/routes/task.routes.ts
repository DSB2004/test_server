import { Router } from "express";
import AddTask from "../controller/task/addTask.controller";
import GetTaskList from "../controller/task/getTaskList.controller";
import UpdateTask from "../controller/task/updateTask.controller";
import DeleteTask from "../controller/task/deleteTask.controller";
import GetTask from "../controller/task/getTask.controller";

const taskRouter = Router();



taskRouter.put("/", AddTask)
taskRouter.get("/", GetTaskList)
taskRouter.patch("/", UpdateTask)
taskRouter.delete("/", DeleteTask)
taskRouter.get("/profile", GetTask)




export default taskRouter;