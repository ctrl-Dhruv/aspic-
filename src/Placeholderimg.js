import React from "react";
import CatPic from "./Cat.jpg";

export default function Placeholderimg() {
  return (
    <img
      src={CatPic}
      alt="placeholder img"
      style={{
        maxHeight: "400px",
        maxWidth: "40%",
        display: "block",
        marginleft: "auto",
        marginright: "auto",
      }}
    />
  );
}
