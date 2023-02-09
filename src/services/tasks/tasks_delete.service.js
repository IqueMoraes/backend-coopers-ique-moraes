import { tasks_database } from "../../database/index.js";

function TaskDeleteService(task, taskIndex) {
  try {
    const deletedTask = tasks_database.splice(taskIndex, 1);
    return deletedTask;
  } catch (err) {
    // empty
  }
}

export default TaskDeleteService;
