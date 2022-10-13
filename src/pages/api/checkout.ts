import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../lib/stripe";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const priceId = "price_1LrsCzE3J7oW3ZhHF99eRi6O";

  const successUrl = `${process.env.NEXT_URL}/success`;
  const cancelUrl = `${process.env.NEXT_URL}/`;

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: "payment",
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
  });

  return response.status(201).json({
    checkoutUrl: checkoutSession.url,
  });
}
