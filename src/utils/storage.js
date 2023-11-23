class Storage {
  get(key, parse = true) {
    const value = localStorage.getItem(key);
    return parse ? JSON.parse(value) : value;
  }
  set(key, value, parse = true) {
    localStorage.setItem(key, parse ? JSON.stringify(value) : value);
  }
}

const storage = new Storage();

export default {
  setToken(token) {
    storage.set("token", token);
  },
  getToken() {
    return storage.get("token");
  },
  setUserInfo(data) {
    storage.set("userInfo", data);
  },
  getUserInfo() {
    return storage.get("userInfo");
  },
};
