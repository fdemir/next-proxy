import Cookies from "cookies";
import { proxy } from "../../server/proxy";

export default (req, res) => {
  req.url = req.url.replace(/^\/api/, "");

  return new Promise((resolve, reject) => {
    proxy.once("error", reject);

    const cookies = new Cookies(req, res);
    const authorization = cookies.get("authorization");

    req.headers.cookie = "";

    if (authorization) {
      req.headers.authorization = authorization;
    }

    proxy.web(req, res);
  });
};

export const config = {
  api: {
    bodyParser: false,
  },
};
