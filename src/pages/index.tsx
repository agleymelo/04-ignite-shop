import { styled } from "../styles";

const Button = styled("button", {
  backgroundColor: "Purple",
  borderRadius: 4,
});

export default function Home() {
  return (
    <div>
      <h1>hello world</h1>

      <Button>Enviar</Button>
    </div>
  );
}
