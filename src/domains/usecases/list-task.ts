import { database } from "../../database";
import { Task } from "../tasks";

type ListTaskDTO = {
  title?: string;
  description?: string;
};

export const listTask = (dto: ListTaskDTO) => {
  const { description, title } = dto;

  const tasks = database.select<Task>("tasks", {
    description,
    title,
  });

  return {
    tasks,
  };
};
