import { RequestError } from "../../custom_errors/index.js";
import { TaskDeleteService } from "../../services/index.js";

function TaskDeleteController(req, res, next) {
  try {
    if (!req.task || !req.taskIndex)
      throw new RequestError(
        "Task não encontrada",
        "É obrigatória a identificação da task pela query 'id'.",
        400
      );

    const deleted_task = TaskDeleteService(req.task, req.taskIndex);

    if (!deleted_task)
      throw new RequestError(
        "Delete Task",
        "Não foi possível deletar a tarefa",
        500
      );

    res.setHeader("Content-Type", "application/json");
    res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
    return res.status(204).json(deleted_task);
  } catch (err) {
    return next(err);
  }
}

export default TaskDeleteController;
