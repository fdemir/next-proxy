import httpProxy from "http-proxy";

export const proxy = httpProxy.createProxyServer({
  target: process.env.SERVICE_URL,
  autoRewrite: false,
});
