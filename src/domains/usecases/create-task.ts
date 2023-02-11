import { randomUUID } from "crypto";
import { database } from "../../database";
import { taskBuilder } from "../tasks";

export type CreateTaskDTO = {
  title: string;
  description: string;
};

export const createTask = (dto: CreateTaskDTO) => {
  const { description, title } = dto;
  const id = randomUUID();

  const task = taskBuilder({ id, description, title });

  database.insert("tasks", task);

  return {
    task,
  };
};
