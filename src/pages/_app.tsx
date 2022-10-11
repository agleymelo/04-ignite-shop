import Image from "next/future/image";
import { AppProps } from "next/app";
import { globalStyles } from "../styles/global";

import LogoImg from "../assets/Logo.svg";
import { Container, Header } from "../styles/pages/app";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Image src={LogoImg} alt="" />
      </Header>
      <Component {...pageProps} />
    </Container>
  );
}
