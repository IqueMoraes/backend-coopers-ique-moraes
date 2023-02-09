
import { ValidationError } from "yup";

import { RequestError } from "../../custom_errors/index.js";
import { tasks_database } from "../../database/index.js";
import { TaskCreateSchema, TaskUpdateSchema } from "../../schemas/index.js";

async function TaskValidateMiddleware(
  req,
  _,
  next
) {
  try {
    if (req.method === "PATCH" || req.method === "DELETE") {
      await TaskUpdateSchema.validate(req.body);

      const taskId = req.query.id;

      if (!taskId)
        throw new RequestError(
          "Task não encontrada",
          "É obrigatória a identificação da task pela query 'id'.",
          400
        );
      let taskIndex = -1;
      const task = tasks_database.find((task, index) => {
        if (task.id === taskId) {
          taskIndex = index;
          return true;
        }
        return false;
      });

      if (!task)
        throw new RequestError(
          "Task não encontrada",
          "É obrigatória a identificação da task pela query 'id'.",
          400
        );

      req.task = task;
      req.taskIndex = taskIndex;
      return next();
    }

    await TaskCreateSchema.validate(req.body);

    return next();
  } catch (err) {
    if (err instanceof ValidationError) {
      const validationError = new RequestError(
        `Erro de validação - ${err.path}`,
        err.message,
        400
      );
      return next(validationError);
    }
  }
}

export default TaskValidateMiddleware;
