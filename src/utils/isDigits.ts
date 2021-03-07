const DIGITS_REGEX = /^[0-9]*$/;

export default function isDigits(value: string): boolean {
  if (value === "" || value) {
    return DIGITS_REGEX.test(value);
  }
  return false;
}
