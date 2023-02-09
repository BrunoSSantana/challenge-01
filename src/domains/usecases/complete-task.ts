import { database } from "../../database";
import { Task } from "../tasks";

export const completeTask = (id: string) => {
  const task = database.detail<Task>("tasks", id);

  const completion = task.completedAt;

  return database.update("tasks", id, {
    completedAt: completion ? null : new Date(),
  });
};
