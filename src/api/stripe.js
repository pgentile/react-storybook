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
