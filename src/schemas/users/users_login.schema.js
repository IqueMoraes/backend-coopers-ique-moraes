import * as yup from "yup";

const passValidateAlert = "Sua senha possui entre 4 e 12 caracteres";

const UserLoginSchema = yup.object().shape({
  email: yup
    .string()
    .required("O e-mail é obrigatório.")
    .email("Insira um e-mail válido.")
    .lowercase()
    .trim(),
  password: yup
    .string()
    .required("A senha é obrigatória.")
    .min(4, passValidateAlert)
    .max(12, passValidateAlert),
});

export default UserLoginSchema;
