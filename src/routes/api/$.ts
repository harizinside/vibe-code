import { createFileRoute } from "@tanstack/react-router";
import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import { compress } from "hono/compress";
import { logger } from "hono/logger";
import { languageDetector } from "hono/language";
import { setupOpenAPI } from "./-openapi";

const app = new Hono().basePath("/api");

app.use(compress());

app.use(logger());

app.use(
  languageDetector({
    supportedLanguages: ["en", "id"],
    fallbackLanguage: "en",
  }),
);

app.use(
  "/assets/*",
  serveStatic({
    root: `${process.cwd()}`,
    rewriteRequestPath: (path) => path.replace(/^\/api\/v2\/assets/, "/storages/public"),
  }),
);

app.use(
  "/files/*",
  serveStatic({
    root: `${process.cwd()}`,
    rewriteRequestPath: (path) => path.replace(/^\/api\/v2\/files/, "/storages/private"),
  }),
);

setupOpenAPI(app);

const handle = ({ request }: { request: Request }) => app.fetch(request);

export const Route = createFileRoute("/api/$")({
  server: {
    handlers: {
      GET: handle,
      POST: handle,
      HEAD: handle,
      PUT: handle,
      DELETE: handle,
      PATCH: handle,
      OPTIONS: handle,
    },
  },
});
