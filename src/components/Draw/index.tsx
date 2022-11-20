import axios from "axios";
import Image from "next/future/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { SpinnerGap, X } from "phosphor-react";
import { useState } from "react";
import { useShoppingCart } from "use-shopping-cart";
import { api } from "../../lib/api";

import {
  ButtonRemove,
  DrawButton,
  DrawContainer,
  DrawImage,
  DrawItemContent,
  DrawItems,
  DrawMain,
} from "../../styles/components/draw";

export function Draw() {
  const {
    cartDetails,
    removeItem,
    formattedTotalPrice,
    cartCount,
    shouldDisplayCart,
    handleCartClick,
    redirectToCheckout,
    clearCart,
  } = useShoppingCart();

  const [isRedirecting, setIsRedirecting] = useState(false);

  const hasItemsInCart = !!cartCount;

  const { push } = useRouter();

  function handleRemoveProductFromCart(id: string): () => void {
    return () => removeItem(id);
  }

  async function handleRedirectUserToCheckout() {
    try {
      setIsRedirecting(true);

      const response = await api.post("/api/checkout", {
        items: cartDetails,
      });

      const { checkoutSessionId } = response.data;

      clearCart();

      const result = await redirectToCheckout(checkoutSessionId);

      console.log(result);

      if (result?.error) {
        console.error("Result error: ", result);
      }

      // const { checkoutUrl } = response.data;

      // window.location.href = checkoutUrl;
    } catch (err) {
      alert("Falha ao redirecionar ao checkout");
      console.log(err.message);
      setIsRedirecting(false);
    }
  }

  return (
    <DrawContainer isOpen={shouldDisplayCart}>
      <button onClick={handleCartClick}>
        <X size={24} />
      </button>

      <DrawMain>
        {hasItemsInCart ? (
          <h1>Sacola de compras</h1>
        ) : (
          <h1>Você não tem nenhum item selecionado, que tal selecionar um?</h1>
        )}

        <DrawItems>
          {Object.keys(cartDetails).map((key) => {
            return (
              <DrawItemContent key={cartDetails[key].id}>
                <DrawImage>
                  <Image
                    src={cartDetails[key].image}
                    alt=""
                    width={95}
                    height={95}
                  />
                </DrawImage>

                <div>
                  <div>
                    <Link href={`/product/${cartDetails[key].id}`} passHref>
                      <a>{cartDetails[key].name}</a>
                    </Link>
                    <strong>{cartDetails[key].formattedValue}</strong>
                  </div>

                  <ButtonRemove
                    onClick={handleRemoveProductFromCart(cartDetails[key].id)}
                  >
                    Remover
                  </ButtonRemove>
                </div>
              </DrawItemContent>
            );
          })}
        </DrawItems>

        <footer>
          {hasItemsInCart && (
            <>
              <div>
                <p>Quantidade</p>
                <p>
                  {hasItemsInCart
                    ? `${cartCount} item`
                    : cartCount > 1
                    ? `${cartCount} items`
                    : ""}
                </p>
              </div>
              <div>
                <strong>Valor total</strong>
                <strong>{formattedTotalPrice}</strong>
              </div>
            </>
          )}

          <DrawButton
            disabled={!hasItemsInCart || isRedirecting}
            onClick={handleRedirectUserToCheckout}
          >
            {isRedirecting ? <SpinnerGap size={22} /> : "Finalizar compra"}
          </DrawButton>
        </footer>
      </DrawMain>
    </DrawContainer>
  );
}
