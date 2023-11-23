import { request } from "~/utils/request";

export default {
  register(data) {
    return request({ url: "/auth/local/register", method: "post", data });
  },
  login(data) {
    return request({ url: "/auth/local", method: "post", data });
  },
};
