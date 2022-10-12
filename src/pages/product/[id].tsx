import Image from "next/future/image";
import { useRouter } from "next/router";
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "../../styles/pages/product";

export default function Product() {
  const { query } = useRouter();

  return (
    <ProductContainer>
      <ImageContainer>{/* <Image /> */}</ImageContainer>

      <ProductDetails>
        <h1>Camiseta X</h1>
        <span>USD 20.00</span>

        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore,
          quis! Laboriosam aliquam suscipit, error delectus, libero tempora
          cupiditate reiciendis corporis laborum dignissimos porro consequatur
          similique voluptatibus sint, commodi voluptate tenetur.
        </p>

        <button>BUY NOW</button>
      </ProductDetails>
    </ProductContainer>
  );
}
