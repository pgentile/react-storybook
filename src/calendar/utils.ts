import { format, parse } from "date-fns";

export type ISODate = string;

const PATTERN = "yyyy-MM-dd";

export function formatToString(date: Date): ISODate {
  return format(date, PATTERN);
}

export function parseFromString(value: ISODate): Date {
  return parse(value, PATTERN, new Date());
}
