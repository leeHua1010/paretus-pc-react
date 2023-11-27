import request from "~/utils/request";

export default {
  register(data) {
    return request.post("/auth/local/register", data);
  },
  login(data) {
    return request.post("/auth/local", data);
  },
};
