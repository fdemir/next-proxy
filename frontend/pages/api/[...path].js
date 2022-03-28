import Cookies from "cookies";
import { proxy } from "../../server/proxy";

function handler(req, res) {
  return new Promise((resolve, reject) => {
    req.url = req.url.replace(/^\/api/, "");

    proxy.once("error", reject);

    const cookies = new Cookies(req, res);
    const authorization = cookies.get("authorization");

    req.headers.cookie = "";

    if (authorization) {
      req.headers.authorization = authorization;
    }

    proxy.web(req, res, {
      target: process.env.SERVICE_URL,
    });
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
