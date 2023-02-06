import http from "node:http";
import { routes } from "./routes";
import { extractQueryParams } from "./utils/extract-query-params";
import { json } from "./utils/json";

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  const route = routes.find(
    (route) => route.path.test(url as string) && route.method === method
  );

  if (route) {
    const routeParams = req.url?.match(route.path);

    // @ts-ignore
    const { query, ...params } = routeParams?.groups;

    // @ts-ignore
    req.params = params;
    // @ts-ignore
    req.query = query ? extractQueryParams(query) : {};

    // @ts-ignore
    return route.handler(req, res);
  }

  return res.writeHead(404).end("Not Found");
});

console.log("Runing on http://localhost:3000");
server.listen(3000);
