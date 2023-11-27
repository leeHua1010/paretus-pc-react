import request from "~/utils/request";

export default {
  create(data) {
    return request.post("/articles", data);
  },
  list(query) {
    return request.get(`/articles?${query}`);
  },
  read(id) {
    return request.get(`/articles/${id}`);
  },
  detail(id, query) {
    return request.get(`/articles/${id}?${query}`);
  },
};
