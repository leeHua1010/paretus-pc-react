import request from "~/utils/request";

export default {
  me(query) {
    return request.get(`/users/me?${query}`);
  },
  update(id, query, data) {
    return request.put(`/users/${id}?${query}`, data);
  },
};
