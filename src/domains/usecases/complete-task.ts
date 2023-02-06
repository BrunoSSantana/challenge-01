import { database } from "../../database";

export const completeTask = (id: string) => {
  return database.update("tasks", id, {
    completedAt: new Date(),
  });
};
