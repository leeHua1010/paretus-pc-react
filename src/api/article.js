import { request } from "~/utils/request";

export default {
  create(data) {
    return request({ url: "/articles", method: "post", data });
  },
  list(query) {
    return request({ url: `/articles?${query}`, method: "get" });
  },
  read(id) {
    return request({ url: `/articles/${id}`, method: "get" });
  },
  detail(id, query) {
    return request({ url: `/articles/${id}?${query}`, method: "get" });
  },
};
