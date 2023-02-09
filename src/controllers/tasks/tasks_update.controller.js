import { RequestError } from "../../custom_errors/index.js";
import { TaskUpdateService } from "../../services/index.js";

function TaskUpdateController(req, res, next) {
  try {
    const { text, status } = req.body;

    if (!!text && !!status)
      throw new RequestError(
        "Atualização de task",
        "Para atualizar a tarefa é necessário preencher um dos campos, 'text' ou 'status'.",
        400
      );

    if (!req.task || !req.taskIndex)
      throw new RequestError(
        "Task não encontrada",
        "É obrigatória a identificação da task pela query 'id'.",
        400
      );

    const update_task = TaskUpdateService(
      req.task,
      req.taskIndex,
      text,
      status
    );

    if (!update_task)
      throw new RequestError(
        "Update Task Error",
        "Não foi possível atualizar a tarefa",
        500
      );
      
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
    return res.status(200).json(update_task);
  } catch (err) {
    return next(err);
  }
}

export default TaskUpdateController;
