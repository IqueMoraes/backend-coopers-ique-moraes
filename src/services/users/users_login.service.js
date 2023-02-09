import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { RequestError } from "../../custom_errors/index.js";

async function UserLoginService({ email, password }, user) {
  try {
    const passToCompare = password + process.env.SALT;
    const match = await bcrypt.compare(passToCompare, user.password);
    if (!match) {
      return new RequestError(
        "E-mail ou senha inválido.",
        "Verique o e-mail e a senha digitada",
        400
      );
    }

    const token = jwt.sign(
      {
        data: {
          email,
          id: user.id,
        },
      },
      process.env.SECRET || "",
      { expiresIn: process.env.EXPIRES_IN || "24h" }
    );

    return token;
  } catch (err) {
    // empty
  }
}

export default UserLoginService;
