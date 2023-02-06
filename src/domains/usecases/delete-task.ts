import { database } from "../../database";

export const deleteTask = (id: string) => {
  database.delete("tasks", id);
};
