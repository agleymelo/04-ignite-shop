import { useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import Image from "next/future/image";

import Stripe from "stripe";
import axios from "axios";

import { stripe } from "../../lib/stripe";
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "../../styles/pages/product";
import Head from "next/head";
import { useShoppingCart } from "use-shopping-cart";

type ProductProps = {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    description: string;
    priceId: string;
    priceNotFormatted: number;
  };
};

export default function Product({ product }: ProductProps) {
  const { isFallback } = useRouter();

  const { addItem, cartDetails } = useShoppingCart();

  const isItemAlreadyExistsInCart = !!cartDetails[product.id];

  function addToCart() {
    if (isItemAlreadyExistsInCart) return;

    addItem({
      currency: "USD",
      id: product.id,
      name: product.name,
      price: product.priceNotFormatted,
      price_id: product.priceId,
      image: product.imageUrl,
      description: product.description,
    });
  }

  if (isFallback) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>{product.description}</p>

          <button disabled={isItemAlreadyExistsInCart} onClick={addToCart}>
            {isItemAlreadyExistsInCart ? "ITEM ALREADY IN CART" : "ADD TO CART"}
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          id: "prod_Mb4LFrqRY1iDd5",
        },
      },
    ],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0] ?? "",
        price: new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(price.unit_amount / 100),
        priceId: price.id,
        description: product.description,
        priceNotFormatted: price.unit_amount,
      },
    },
    revalidate: 64 * 64 * 1, // 1 hour
  };
};
