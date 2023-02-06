import { database } from "../../database"

export const updateTask = (id: string, data) => {

  database.update("tasks", id, data)

}