import React from "react";
import { ReactComponent as Chip } from "./chip.svg";

export default function Chips({ amount }) {
  if (amount !== 0)
    return (
      <>
        <Chip className="chipImg" />
        <p className="chips">{amount}</p>
      </>
    );
  return null;
}
