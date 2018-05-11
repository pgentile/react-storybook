import validateCreditCard from './validateCreditCard';

// References:
//   - https://www.cybersource.com/developers/other_resources/quick_references/test_cc_numbers/
//   - http://www.vulgumtechus.com/Identifier_la_banque_d%27origine_d%27une_carte_bancaire
//   - https://en.wikipedia.org/wiki/Payment_card_number

describe('Valid VISA cards', () => {
  const creditCards = [
    '4111 1111 1111 1111',
    '4742 0163 5779 3141',
    '4778 1357 4772 9230',
    '4250 4977 1554 2988',
  ];

  creditCards.forEach((creditCard) => {
    test(`${creditCard} is a valid VISA credit card number`, () => {
      const validated = validateCreditCard(removeWhitespace(creditCard));
      expect(validated).toBe(true);
    });
  });
});


describe('Valid Mastercard cards', () => {
  const creditCards = [
    '5212 5349 2870 6168',
    '5363 5408 1075 1615',
    '5342 3217 6638 4297',
    '5579 0498 7984 3339',
  ];

  creditCards.forEach((creditCard) => {
    test(`${creditCard} is a valid Mastercard credit card number`, () => {
      const validated = validateCreditCard(removeWhitespace(creditCard));
      expect(validated).toBe(true);
    });
  });
});


describe('Valid AMEX cards', () => {
  const creditCards = [
    '3791 9410 9437 636',
    '3723 2984 5398 059',
    '3782 8224 6310 005',
  ];

  creditCards.forEach((creditCard) => {
    test(`${creditCard} is a valid AMEX credit card number`, () => {
      const validated = validateCreditCard(removeWhitespace(creditCard));
      expect(validated).toBe(true);
    });
  });
});

describe('Valid Maestro cards', () => {
  const creditCards = [
    '6759 9800 8097 4762',
    '5033 9619 8909 17',
    '5868 2416 0825 5333 38',
    '6759 4111 0000 0008',
    '6759 5600 4500 5727 054',
    '5641 8211 1116 6669',
  ];

  creditCards.forEach((creditCard) => {
    test(`${creditCard} is a valid Maestro credit card number`, () => {
      const validated = validateCreditCard(removeWhitespace(creditCard));
      expect(validated).toBe(true);
    });
  });
});

describe('Invalid card numbers', () => {
  const cases = {
    'Too small': '1234567',
    'Too big': '1111 1111 1111 1111 1111 1111 1111',
    'Not a Luhn number': '6759 5600 4500 5727 055',
    'Unsupported IIN': '3566 1111 1111 1113',
  };

  Object.keys(cases).forEach((key) => {
    const creditCard = cases[key];
    test(key, () => {
      const validated = validateCreditCard(removeWhitespace(creditCard));
      expect(validated).toBeFalsy();
    });
  });
});


function removeWhitespace(s) {
  return s.replace(/ /g, '');
}
