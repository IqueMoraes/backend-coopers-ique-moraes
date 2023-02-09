import { tasks_database } from "../../database/index.js";

function TaskUpdateService(
  task,
  taskIndex,
  text,
  status
) {
  try {
    const updatedTask = {
      ...task,
      text: text ?? task.text,
      status_id: String(status) ?? task.status_id,
      updated_at: new Date(),
    };

    tasks_database.splice(taskIndex, 1, updatedTask);
    return updatedTask;
  } catch (err) {
    // empty
  }
}

export default TaskUpdateService;
