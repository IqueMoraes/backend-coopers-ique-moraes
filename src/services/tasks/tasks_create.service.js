import { v4 as id4 } from "uuid";

import { tasks_database } from "../../database/index.js";

async function TaskCreateService({
  userId,
  text,
}) {
  try {
    const newTask = {
      id: id4(),
      created_at: new Date(),
      updated_at: new Date(),
      user_id: userId,
      text,
      status_id: "1",
    };

    tasks_database.push(newTask);

    return true;
  } catch (err) {
    return false;
  }
}

export default TaskCreateService;
