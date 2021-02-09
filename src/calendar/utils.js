import { format, parse } from "date-fns";

const PATTERN = "yyyy-MM-dd";

export function formatToString(date) {
  return format(date, PATTERN);
}

export function parseFromString(value) {
  return parse(value, PATTERN, new Date());
}
