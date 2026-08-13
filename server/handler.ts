import { defineEventHandler, getRequestURL, getMethod } from "h3";
import serverEntry from "../dist/server/server.js";

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event);
  const method = getMethod(event);
  const headers = new Headers();
  for (const [k, v] of Object.entries(event.headers ?? {})) {
    if (v) headers.set(k, Array.isArray(v) ? v.join(", ") : String(v));
  }
  const request = new Request(url.href, {
    method,
    headers,
    body: ["GET", "HEAD"].includes(method) ? null : (event.node?.req as any),
    // @ts-ignore
    duplex: "half",
  });
  return await serverEntry.fetch(request, {}, {});
});
