import { RequestError } from "../../custom_errors/index.js";
import { UserCreateService } from "../../services/index.js";

async function UserCreateController(
  req,
  res,
  next
) {
  try {
    const data = req.validated ;

    if (req.user)
      throw new RequestError(
        "Create Error",
        "Esse e-mail já possui um cadastro",
        400
      );

    const resData = await UserCreateService(data);
    if (!resData) {
      throw new RequestError(
        "Create Error",
        "Não foi possível criar o usuário",
        400
      );
    }

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    return res.status(201).json({
      success: "CREATED",
      message: "Usuário cadastrado com sucesso.",
    });
  } catch (err) {
    return next(err);
  }
}

export default UserCreateController;
