import http from "node:http";
import { routes } from "./routes";
import { json } from "./utils/json";
import { file } from "./utils/file";
import { extractQueryParams } from "./utils/extract-query-params";

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  const contentType = req.headers["content-type"]?.split(";")[0];

  if (contentType === "multipart/form-data") {
    await file(req, res);
  } else {
    await json(req, res);
  }

  const route = routes.find(
    (route) => route.path.test(url as string) && route.method === method
  );

  if (route) {
    const routeParams = req.url?.match(route.path);

    // @ts-ignore
    const { query, ...params } = routeParams?.groups;

    // @ts-ignore
    req.params = params;

    // @ts-expect-error Erro de tipagem no req
    req.query = query ? extractQueryParams(query) : {};

    // @ts-expect-error Erro ded tipagem no req
    return route.handler(req, res);
  }

  return res.writeHead(404).end("Not Found");
});

console.log("Runing on http://localhost:3000");
server.listen(3000);
