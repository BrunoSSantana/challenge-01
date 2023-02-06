import { IncomingMessage, ServerResponse } from "http";

export const json = async (
  request: IncomingMessage,
  response: ServerResponse
) => {
  const buffers = [];

  for await (const chunk of request) {
    // @ts-ignore
    buffers.push(chunk);
  }

  try {
    // @ts-ignore
    request.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch {
    // @ts-ignore
    request.body = undefined;
  }

  response.setHeader("Content-type", "application/json");
};
