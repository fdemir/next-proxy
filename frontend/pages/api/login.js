import { proxy } from "../../server/proxy";
import Cookies from "cookies";

export default (req, res) => {
  req.url = req.url.replace(/^\/api/, "");

  return new Promise((resolve, reject) => {
    proxy.once("error", reject);

    proxy.once("proxyRes", (proxyRes, req, res) => {
      let body = [];

      proxyRes.on("data", (chunk) => body.push(chunk));

      proxyRes.once("error", reject);

      proxyRes.on("end", () => {
        try {
          body = JSON.parse(Buffer.concat(body).toString());

          if (proxyRes.statusCode !== 200) throw new Error(body);

          const cookies = new Cookies(req, res);
          cookies.set("authorization", body.accessToken, {
            httpOnly: true,
            sameSite: "lax",
          });

          res.status(200).end();
        } catch (error) {
          res.status(proxyRes.statusCode).json(body);
        }

        resolve();
      });
    });

    proxy.web(req, res, {
      selfHandleResponse: true,
    });
  });
};

export const config = {
  api: {
    bodyParser: false,
  },
};
