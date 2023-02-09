import { RequestError } from "../../custom_errors/index.js";
import { TaskReadService } from "../../services/index.js";

function TaskReadController(req, res, next) {
  try {
    const id = req.token?.data.id;

    if (!id)
      throw new RequestError(
        "Acesso não autorizado",
        "O uso do token é obrigatório.",
        401
      );

    const tasks = TaskReadService(id);

    if (!tasks)
      throw new RequestError(
        "Read Tasks Error",
        "Não foi possível encontrar nenhuma task",
        500
      );

    if (tasks.toDo.length === 0 && tasks.done.length === 0)
      return res.status(204).json(tasks);

    return res.status(200).json(tasks);
  } catch (err) {
    return next(err);
  }
}

export default TaskReadController;
