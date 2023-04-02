import React from "react";
import { BsStarHalf, BsStarFill } from "react-icons/bs";
const Rating = ({ value, text }) => {
  const stars = (val) => {
    let content = [];
    for (let index = 0; index <= val; index++) {
      //   let item = <AiFillStar color="#f8e825" />;
      const item =
        index !== Math.floor(val) ? (
          <BsStarFill className="stars" color="#f8e825" />
        ) : val % 1 === 0 ? (
          <BsStarFill color="#f8e825" />
        ) : (
          <BsStarHalf color="#f8e825" />
        );
      content.push(item);
    }
    return content;
  };
  return (
    <div className="rating">
      <span>
        {stars(value)} {text}
      </span>
    </div>
  );
};

export default Rating;
