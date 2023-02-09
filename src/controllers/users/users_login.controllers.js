import { RequestError } from "../../custom_errors/index.js";
import { UserLoginService } from "../../services/index.js";

async function UserLoginController(req, res, next) {
  try {
    if (!req.user)
      throw new RequestError("Usuário não cadastrado", "Verique o e-mail", 404);

    if (!req.validated)
      throw new RequestError(
        "E-mail ou senha inválido.",
        "Verique o e-mail e a senha digitada",
        404
      );

    const token = await UserLoginService(req.validated, req.user);
    if (token instanceof RequestError) throw token;

    if (!token)
      throw new RequestError(
        "Login Error",
        "Não foi possível realizar o login",
        500
      );

    res.setHeader("Content-Type", "application/json");
    res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
    return res.status(200).json({ success: "OK", token });
  } catch (err) {
    return next(err);
  }
}

export default UserLoginController;
