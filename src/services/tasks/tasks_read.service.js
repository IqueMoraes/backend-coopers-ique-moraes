import { tasks_database } from "../../database/index.js";

function TaskReadService(userId) {
  try {
    const toDo = [];
    const done = [];

    tasks_database.forEach((task) => {
      if (task.user_id === userId && task.status_id === "1") toDo.push(task);
      else if (task.user_id === userId && task.status_id === "2")
        done.push(task);
    });

    return { userId, toDo, done };
  } catch (error) {
    //  empty
  }
}

export default TaskReadService;
