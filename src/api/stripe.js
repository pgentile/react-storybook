// See https://stripe.com/docs/api#create_card_token
const apiKey = "sk_test_BQokikJOvBiI2HlWgH4olfQ2";

export async function createToken({ cardNumber, expirationDate, cvv }) {
  const [year, month] = expirationDate.split("-");

  const body = new URLSearchParams();
  body.append("card[number]", cardNumber);
  body.append("card[exp_month]", month);
  body.append("card[exp_year]", year);
  body.append("card[cvc]", cvv);

  const response = await fetch("https://api.stripe.com/v1/tokens", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      Accept: "application/json"
    },
    body
  });

  return await response.json();
}

export async function charge({ token, amount, currency, description }) {
  const body = new URLSearchParams();
  body.append("amount", Math.trunc(amount * 100));
  body.append("currency", currency);
  body.append("source", token);
  body.append("description", description);
  body.append("capture", "true");

  const response = await fetch("https://api.stripe.com/v1/charges", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      Accept: "application/json"
    },
    body
  });

  return await response.json();
}

export async function createCard({ token }) {
  const body = new URLSearchParams();
  body.append("type", "card");
  body.append("token", token);

  const response = await fetch("https://api.stripe.com/v1/sources", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      Accept: "application/json"
    },
    body
  });

  return await response.json();
}

export async function create3DSSource({ cardId, amount, currency }) {
  const body = new URLSearchParams();
  body.append("type", "three_d_secure");
  body.append("amount", Math.trunc(amount * 100));
  body.append("currency", currency);
  body.append("redirect[return_url]", window.location);
  body.append("three_d_secure[card]", cardId);

  const response = await fetch("https://api.stripe.com/v1/sources", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      Accept: "application/json"
    },
    body
  });

  return await response.json();
}
