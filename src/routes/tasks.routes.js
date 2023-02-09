import { Router } from "express";

import {
  TaskCreateController,
  TaskDeleteController,
  TaskReadController,
  TaskUpdateController,
} from "../controllers/index.js";
import { TaskValidateMiddleware, UserAuthValidate } from "../middlewares/index.js";

const tasksRoutes = Router();

tasksRoutes.post(
  "/tasks",
  UserAuthValidate,
  TaskValidateMiddleware,
  TaskCreateController
);

tasksRoutes.get("/tasks", UserAuthValidate, TaskReadController);

tasksRoutes.patch(
  "/tasks/:id",
  UserAuthValidate,
  TaskValidateMiddleware,
  TaskUpdateController
);

tasksRoutes.delete(
  "/tasks/:id",
  UserAuthValidate,
  TaskValidateMiddleware,
  TaskDeleteController
);

export default tasksRoutes;
