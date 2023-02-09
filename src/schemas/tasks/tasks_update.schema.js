import * as yup from "yup";

const TaskUpdateSchema = yup.object().shape({
  text: yup.string().required("Insira uma nova tarefa!").trim(),
  status: yup.number().oneOf([1, 2, 3]),
});

export default TaskUpdateSchema;
