import luhn from "fast-luhn";

export default validateAll(
  minMaxSizeValidator(8, 19),
  onlyDigits,
  luhn,
  validateAny(
    // AMEX
    validateAll(fixedSizeValidator(15), validateAny(iinPrefixValidator("34"), iinPrefixValidator("37"))),
    // Visa
    validateAll(
      iinPrefixValidator("4"),
      validateAny(fixedSizeValidator(13), fixedSizeValidator(16), fixedSizeValidator(19))
    ),
    // Mastercard
    validateAll(
      fixedSizeValidator(16),
      validateAny(iinPrefixRangeValidator("51", "55"), iinPrefixRangeValidator("2221", "2720"))
    ),
    // Maestro
    validateAll(
      minMaxSizeValidator(12, 19),
      validateAny(iinPrefixValidator("50"), iinPrefixValidator("6"), iinPrefixRangeValidator("56", "58"))
    )
  )
);

function validateAny(...validators) {
  return creditCard => validators.some(validator => validator(creditCard));
}

function validateAll(...validators) {
  return creditCard => validators.every(validator => validator(creditCard));
}

function onlyDigits(creditCard) {
  return /^\d+$/.test(creditCard);
}

function fixedSizeValidator(size) {
  return creditCard => creditCard.length === size;
}

function minMaxSizeValidator(min, max) {
  return creditCard => min <= creditCard.length && creditCard.length <= max;
}

function iinPrefixValidator(prefix) {
  return creditCard => creditCard.startsWith(prefix);
}

function iinPrefixRangeValidator(minPart, maxPart) {
  if (minPart.length !== maxPart.length) {
    throw new Error(`Invalid range: ${minPart}-${maxPart}`);
  }

  const prefixLength = minPart.length;
  const min = Number.parseInt(minPart);
  const max = Number.parseInt(maxPart);

  return creditCard => {
    const prefix = creditCard.substring(0, prefixLength);
    if (creditCard.startsWith(prefix)) {
      const prefixAsNumber = Number.parseInt(prefix);
      return min <= prefixAsNumber && prefixAsNumber <= max;
    }
    return false;
  };
}
