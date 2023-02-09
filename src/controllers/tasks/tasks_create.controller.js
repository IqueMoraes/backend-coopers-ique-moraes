import { RequestError } from "../../custom_errors/index.js";
import { TaskCreateService } from "../../services/index.js";

async function TaskCreateController(req, res, next) {
  try {
    const { text } = req.body;
    const userId = req.token?.data.id;

    if (!userId)
      throw new RequestError(
        "Acesso não autorizado",
        "O uso do token é obrigatório.",
        401
      );

    const resData = await TaskCreateService({ userId, text });
    if (!resData) {
      throw new RequestError(
        "Create Task Error",
        "Não foi possível criar uma nova tarefa",
        500
      );
    }

    return res.status(201).json({
      success: "CREATED",
      message: "Tarefa criada com sucesso.",
    });
  } catch (err) {
    if (err instanceof Error) {
      return next(err);
    }

    return next(err);
  }
}

export default TaskCreateController;
