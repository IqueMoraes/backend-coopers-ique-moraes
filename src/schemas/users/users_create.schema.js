import * as yup from "yup";

const passValidateAlert =
  "Sua senha deve conter, entre 4 e 12 caracteres, uma letra minúscula, uma letra maiúscula, um número e um carectere especial (@$!%*?&).";

const UserCreateSchema = yup.object().shape({
  email: yup
    .string()
    .required("O e-mail é obrigatório.")
    .email("Insira um e-mail válido.")
    .lowercase()
    .trim(),
  password: yup
    .string()
    .required("A senha é obrigatória.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[:;@$!%*?&])[A-Za-z\d@$!%*?&]{4,12}$/,
      passValidateAlert
    ),
  confirmPassword: yup
    .string()
    .required("A confirmação da senha é obrigatória.")
    .oneOf([yup.ref("password"), null], "As senhas não coincidem."),
});

export default UserCreateSchema;
