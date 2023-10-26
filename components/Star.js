import { BsStar, BsStarHalf } from "react-icons/bs";
import { FaStar } from "react-icons/fa";

export default function Star({ rate }) {
  const output = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rate)) {
      output.push(<FaStar color="orange" />);
    } else if (i <= Math.ceil(rate)) {
      output.push(<BsStarHalf color="orange" />);
    } else {
      output.push(<BsStar color="gray" />);
    }
  }

  return output;
}
