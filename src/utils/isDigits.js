const DIGITS_RGEX = /^[0-9]+$/;

export default function isDigits(value) {
  if (value === "" || value) {
    return DIGITS_RGEX.test(value);
  }
  return false;
}
