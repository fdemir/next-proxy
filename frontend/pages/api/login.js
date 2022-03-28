import { proxy } from "../../server/proxy";
import Cookies from "cookies";

export default function handler(req, res) {
  req.url = req.url.replace(/^\/api/, "");

  return new Promise((resolve, reject) => {
    proxy.once("error", reject);

    proxy.once("proxyRes", (proxyRes, req, res) => {
      let body = [];
      proxyRes.on("data", (chunk) => {
        body.push(chunk);
      });

      proxyRes.once("error", reject);

      proxyRes.on("end", () => {
        res.statusCode = proxyRes.statusCode;
        body = JSON.parse(Buffer.concat(body).toString());

        if (res.statusCode !== 200) {
          res.json(body);
          reject();
        }

        const { accessToken } = body;

        const cookies = new Cookies(req, res);
        cookies.set("authorization", accessToken, {
          httpOnly: true,
          sameSite: "lax",
        });

        res.json({
          message: "Login successful.",
        });
        resolve();
      });
    });

    proxy.web(req, res, {
      target: process.env.SERVICE_URL,
      selfHandleResponse: true,
    });
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
