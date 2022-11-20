import { AppProps } from "next/app";
import { CartProvider } from "use-shopping-cart";
import { Header } from "../components/Header";
import { globalStyles } from "../styles/global";

import { Container } from "../styles/pages/app";

globalStyles();

const stripeKey =
  "pk_test_51Lrs73E3J7oW3ZhHwVfykhx1UEG0H4UHh6YCgSgpe9rfG7SKKjxIxJiF7BA5w1EeWdTz3ZnTVVkeOzL9kOTCsoug00PAeVwPJd";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider cartMode="checkout-session" stripe={stripeKey} currency="USD">
      <Container>
        <Header />
        <Component {...pageProps} />
      </Container>
    </CartProvider>
  );
}
