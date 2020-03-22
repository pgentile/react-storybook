import isDigits from "./isDigits";

describe("Is digits", () => {
  ["", "1234", "9"].forEach((value) => {
    test(`"${value}" is valid`, () => {
      const result = isDigits(value);
      expect(result).toBe(true);
    });
  });

  [null, "abc", "1234 5678", "a123", " "].forEach((value) => {
    test(`"${value}" is not valid`, () => {
      const result = isDigits(value);
      expect(result).toBe(false);
    });
  });
});
