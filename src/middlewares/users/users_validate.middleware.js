import { ValidationError } from "yup";

import { RequestError } from "../../custom_errors/index.js";
import { UserCreateSchema, UserLoginSchema } from "../../schemas/index.js";

async function UserValidateData(
  req,
  _,
  next
) {
  const path = req.url;
  let schema = UserLoginSchema;

  if (path.includes("/users")) schema = UserCreateSchema;
  try {
    const validated = await schema.validate(req.body);

    req.validated = {
      ...req.validated,
      email: validated.email,
      password: validated.password,
    };
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

export default UserValidateData;
