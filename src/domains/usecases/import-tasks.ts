import { randomUUID } from "crypto";
import { taskBuilder } from "../tasks";
import { database } from "../../database";
import { CreateTaskDTO } from "./create-task";
import { convertArrayFromCsvToObject } from "../../utils/extract-data-from-file-input";

type ImportTasksDTO = string[];

export const importTasks = (dtos: ImportTasksDTO) => {
  const createTaskDTOs = convertArrayFromCsvToObject<CreateTaskDTO>(dtos);

  const tasks = createTaskDTOs.map((dto) => {
    const { description, title } = dto;
    const id = randomUUID();

    const task = taskBuilder({ id, description, title });

    database.insert("tasks", task);

    return task;
  });

  return {
    tasks,
  };
};
