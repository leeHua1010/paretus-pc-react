import request from "~/utils/request";

export default {
  create(data) {
    return request.post("/articles", data);
  },
  update(id, data) {
    return request.put(`/articles/${id}`, data);
  },
  read(id, query) {
    return request.get(`/articles/${id}?${query}`);
  },
  list(query) {
    return request.get(`/articles?${query}`);
  },
};
