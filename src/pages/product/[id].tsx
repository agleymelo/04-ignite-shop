import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/future/image";
import { useRouter } from "next/router";
import Stripe from "stripe";
import { stripe } from "../../lib/stripe";
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "../../styles/pages/product";

type ProductProps = {
  product: {
    id: string;
    name: string;
    image_url: string;
    price: string;
    description: string;
    defaultPriceId: string;
  };
};

export default function Product({ product }: ProductProps) {
  const { isFallback } = useRouter();

  function handleBuyProduct() {
    console.log(product.defaultPriceId);
  }

  if (isFallback) {
    return <p>Loading...</p>;
  }

  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={product.image_url} width={520} height={480} alt="" />
      </ImageContainer>

      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>

        <p>{product.description}</p>

        <button onClick={handleBuyProduct}>BUY NOW</button>
      </ProductDetails>
    </ProductContainer>
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
        image_url: product.images[0],
        price: new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(price.unit_amount / 100),
        description: product.description,
        defaultPriceId: price.id,
      },
    },
    revalidate: 64 * 64 * 1, // 1 hour
  };
};
