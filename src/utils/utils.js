import qs from "qs";
import storage from "~/utils/storage";

export function stringify(query) {
  return qs.stringify(query, { encodeValuesOnly: true });
}

export function getAvatarSrc() {
  const userInfo = storage.getUserInfo();
  const mediaApi = import.meta.env.VITE_MEDIA_API;
  const avatar = userInfo?.avatar;
  return avatar ? `${mediaApi}${avatar.url}` : "";
}
