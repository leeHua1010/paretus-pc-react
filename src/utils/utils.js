import qs from "qs";

export function stringify(query) {
  return qs.stringify(query, { encodeValuesOnly: true });
}
