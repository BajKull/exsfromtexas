import React, { useEffect, useRef } from "react";
import Batman from "./batman.svg";
import Bear from "./bear.svg";
import Boychild from "./boychild.svg";
import Coffee from "./coffee.svg";
import Cyborg from "./cyborg.svg";
import Geisha from "./geisha.svg";
import Girl from "./girl.svg";
import Girlchild from "./girlchild.svg";
import Grandma from "./grandma.svg";
import Hindi from "./hindi.svg";
import Muslim from "./muslim.svg";
import Scientist from "./scientist.svg";
import Sheep from "./sheep.svg";
import Vampire from "./vampire.svg";
import Watch from "./watch.svg";
import Zombie from "./zombie.svg";
import Spider from "./spider.svg";
import { useSelector } from "react-redux";

const avatars = [
  Batman,
  Bear,
  Boychild,
  Coffee,
  Cyborg,
  Geisha,
  Girl,
  Girlchild,
  Grandma,
  Hindi,
  Muslim,
  Scientist,
  Sheep,
  Vampire,
  Watch,
  Zombie,
  Spider,
];

export default function Avatar({ avatar }) {
  const avaImg = useRef(null);
  const id = useSelector((state) => state.user.avatar);

  useEffect(() => {
    if (avatar) avaImg.current.src = avatars[avatar];
    else avaImg.current.src = avatars[id];
  }, [id, avatar]);

  return (
    <div className="avatar">
      <img src={avatars[0]} alt="" ref={avaImg} />
    </div>
  );
}
