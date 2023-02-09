import jwt from "jsonwebtoken";

import { RequestError } from "../../custom_errors/index.js";

function UserAuthValidate(req, _, next) {
  try {
    const { authorization } = req.headers;
    if (!authorization)
      throw new RequestError(
        "Acesso não autorizado",
        "O uso do token é obrigatório.",
        401
      );

    const token = jwt.verify(authorization, process.env.SECRET || "");

    if (token && typeof token !== "string" && token.iat && token.exp) {
      req.token = {
        ...req.token,
        data: token.data,
        iat: token.iat,
        exp: token.exp,
      };
      return next();
    }

    throw new JsonWebTokenError("");
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      const tokenError = new RequestError(
        "Acesso não autorizado",
        "Token inválido.",
        401
      );
      return next(tokenError);
    }
    if (err instanceof RequestError) return next(err);
  }
}

export default UserAuthValidate;
