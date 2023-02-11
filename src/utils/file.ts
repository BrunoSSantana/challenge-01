import { IncomingMessage, ServerResponse } from "node:http";
import { handleFileData } from "./extract-data-from-file-input";

export const file = async (req: IncomingMessage, res: ServerResponse) => {
  let body = "";

  for await (const chunk of req) {
    body += chunk.toString();
  }

  const dataInArray = handleFileData(body);

  // @ts-ignore
  req.dataFile = dataInArray;
};