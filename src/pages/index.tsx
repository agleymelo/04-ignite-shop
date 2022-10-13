import Image from "next/future/image";
import { useKeenSlider } from "keen-slider/react";
import { GetStaticProps } from "next";
import Link from "next/link";
import Stripe from "stripe";

import { HomeContainer, Product } from "../styles/pages/home";
import { stripe } from "../lib/stripe";

import "keen-slider/keen-slider.min.css";

type HomeProps = {
  products: {
    id: string;
    name: string;
    image_url: string;
    price: string;
  }[];
};

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      {products.map((product) => (
        <Link key={product.id} href={`/product/${product.id}`} prefetch={false}>
          <Product className="keen-slider__slide">
            <Image src={product.image_url} alt="" width={520} height={480} />

            <footer>
              <strong>{product.name}</strong>
              <span>{product.price}</span>
            </footer>
          </Product>
        </Link>
      ))}
    </HomeContainer>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      image_url: product.images[0],
      price: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price.unit_amount / 100),
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};
