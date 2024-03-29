import { styled } from "..";

export const HeaderContainer = styled("header", {
  padding: "2rem 0",
  width: "100%",
  maxWidth: 1180,
  margin: "0 auto",

  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",

  "> button": {
    border: 0,
    padding: 12,
    borderRadius: 6,

    lineHeight: 0,

    cursor: "pointer",
    transition: "all 0.2s ease",
    position: "relative",

    backgroundColor: "$gray800",
    color: "$gray300",

    "&:hover": {
      filter: "brightness(0.8)",
    },

    "> div": {
      borderRadius: 99999,
      height: 28,
      width: 28,
      backgroundColor: "$green500",
      right: 0,
      top: 0,
      marginRight: -7,
      marginTop: -7,
      position: "absolute",
      border: "3px solid $gray900",

      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "$white",
      "> div": {
        borderRadius: 99999,
        height: 24,
        width: 24,
        backgroundColor: "$green500",
        position: "absolute",
        right: 0,
        top: 0,
      },
    },
  },
});
