import * as yup from "yup";

const TaskCreateSchema = yup.object().shape({
  text: yup
    .string()
    .required("Insira um texto para criar uma nova tarefa!")
    .trim(),
});

export default TaskCreateSchema;
