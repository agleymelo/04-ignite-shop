import Image from "next/future/image";
import { useShoppingCart } from "use-shopping-cart";
import { Handbag } from "phosphor-react";
import Link from "next/link";
import { useRouter } from "next/router";

import { HeaderContainer } from "../../styles/components/header";

import LogoImg from "../../assets/Logo.svg";
import { Draw } from "../Draw";

export function Header() {
  const { cartCount, handleCartClick } = useShoppingCart();
  const { asPath } = useRouter();

  const isOnSuccessPage = asPath.includes("/success");

  return (
    <HeaderContainer>
      <Link href="/" passHref prefetch={false}>
        <Image src={LogoImg} alt="" />
      </Link>

      {!isOnSuccessPage && (
        <>
          <button onClick={() => handleCartClick()}>
            <div>{cartCount ?? ""}</div>
            <Handbag size={24} />
          </button>

          <Draw />
        </>
      )}
    </HeaderContainer>
  );
}
