import { IncomingMessage, ServerResponse } from "http";
import { completeTask } from "./domains/usecases/complete-task";
import { createTask } from "./domains/usecases/create-task";
import { deleteTask } from "./domains/usecases/delete-task";
import { importTasks } from "./domains/usecases/import-tasks";
import { listTask } from "./domains/usecases/list-task";
import { updateTask } from "./domains/usecases/update-task";
import { buildRoutePath } from "./utils/build-routes-path";

const MetohdsEnum = {
  GET: "GET",
  POST: "POST",
  DELETE: "DELETE",
  PUT: "PUT",
  PATCH: "PATCH",
} as const;

type MethodsType = typeof MetohdsEnum[keyof typeof MetohdsEnum];

type Route = {
  method: MethodsType;
  path: RegExp;
  handler: (
    req: IncomingMessage & { body?: any; query: any; params: any, dataFile: string[] },
    res: ServerResponse
  ) => any;
};

export const routes: Route[] = [
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { title, description } = req.query;

      const { tasks } = listTask({ title, description });

      res.writeHead(200).end(JSON.stringify(tasks));
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { description, title } = req.body;

      const { task } = createTask({ description, title });

      return res.writeHead(201).end(JSON.stringify(task));
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/tasks/import"),
    handler: (req, res) => {
      importTasks(req.dataFile);

      return res.writeHead(201).end();
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const id = req.params.id;

      deleteTask(id);

      return res.writeHead(204).end();
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const id = req.params.id;

      const { description, title } = req.body;

      updateTask(id, {
        description,
        title,
      });

      return res.writeHead(200).end();
    },
  },
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const id = req.params.id;

      completeTask(id);

      return res.writeHead(200).end();
    },
  },
];
