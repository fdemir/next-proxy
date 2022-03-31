import Cookies from "cookies";
import { proxy } from "../../server/proxy";

export default (req, res) => {
  return new Promise((resolve, reject) => {
    req.url = req.url.replace(/^\/api/, "");

    const cookies = new Cookies(req, res);
    const authorization = cookies.get("authorization");

    req.headers.cookie = "";

    if (authorization) {
      req.headers.authorization = authorization;
    }

    proxy.once("error", reject);
    proxy.web(req, res);
  });
};

export const config = {
  api: {
    bodyParser: false,
  },
};
