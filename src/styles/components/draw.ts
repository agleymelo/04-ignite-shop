import { keyframes, styled } from "..";

export const DrawContainer = styled("nav", {
  backgroundColor: "$gray800",
  position: "fixed",
  top: 0,
  right: 0,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  transition: "all 0.35s ease-in-out",
  transform: "translateX(100%)",
  filter:
    "drop-shadow(0 20px 13px rgb(0 0 0 / 0.03)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.08))",

  padding: 24,

  minHeight: "100vh",
  width: 480,
  maxWidth: "100%",
  zIndex: 10,

  "> button": {
    backgroundColor: "transparent",
    border: 0,
    lineHeight: 0,

    position: "absolute",
    right: 24,

    color: "$gray300",
    cursor: "pointer",
  },

  variants: {
    isOpen: {
      true: {
        transform: "translateX(0)",
      },
    },
  },
});

export const DrawMain = styled("main", {
  margin: "4.5rem 1.5rem 0",
  height: "100%",
  flex: 1,
  display: "flex",
  flexDirection: "column",

  h1: {
    fontSize: "$md",
    marginBottom: 32,
  },

  footer: {
    marginTop: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "16px",

    div: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",

      p: {
        color: "$gray300",
      },
    },
  },
});

export const DrawItems = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: 24,
});

export const DrawImage = styled("div", {
  width: 95,
  height: 95,
  borderRadius: 8,
  background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
});

export const DrawItemContent = styled("div", {
  display: "flex",
  gap: 20,

  div: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "start",

    div: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "start",
      height: "50%",

      a: {
        color: "$gray500",
        textDecoration: "none",

        "&:hover": {
          textDecoration: "underline",
        },
      },
    },
  },
});

export const ButtonRemove = styled("button", {
  background: "transparent",
  border: 0,
  color: "$green500",
  cursor: "pointer",
  padding: ".25rem .25rem .25rem 0",

  "&:hover": {
    color: "$green300",
  },
});

const spinner = keyframes({
  to: {
    transform: "rotate(360deg)",
  },
});

export const DrawButton = styled("button", {
  padding: "20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: 0,
  backgroundColor: "$green300",
  color: "$white",
  fontWeight: "bold",
  borderRadius: 8,
  width: "100%",
  cursor: "pointer",
  fontSize: "$md",

  marginTop: "3.75rem",

  "&:not(:disabled):hover": {
    backgroundColor: "$green500",
  },

  "&:disabled": {
    filter: "brightness(0.7)",
    cursor: "not-allowed",
  },

  svg: {
    lineHeight: 0,
    animation: `${spinner}  .8s linear infinite`,
  },
});
