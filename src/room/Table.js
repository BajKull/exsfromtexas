import React from "react";
import Card from "./Card";
import Players from "./Players";

export default function Table() {
  return (
    <div className="table">
      <Players />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  );
}
