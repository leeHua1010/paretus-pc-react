import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";

dayjs.extend(relativeTime);
dayjs.locale("zh-cn");

export function formatTime(date, template = "YYYY-MM-DD HH:mm:ss") {
  return dayjs(date).format(template);
}

export function formatRelativeTime(date) {
  return dayjs(date).fromNow();
}
