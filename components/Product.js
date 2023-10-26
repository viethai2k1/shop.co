import React from "react";
import { AiFillStar } from "react-icons/ai";
import Link from "next/link";
import Star from "./Star";
export default function Product({ product }) {
  return (
    <div className="flex flex-col gap-1">
      <Link
        href={`/product/${product.id}`}
        className={`${
          product.images.length >= 2 ? "image-slide" : ""
        } aspect-square flex overflow-x-hidden w-full rounded-[10px]`}
      >
        <img
          className="p-8 aspect-square w-full bg-[#F0EFED]"
          src={product.images[0]?.url}
        ></img>
        <img
          className="p-8 aspect-square w-full bg-[#F0EFED]"
          src={product?.images[1]?.url}
        ></img>
      </Link>

      <div className="flex flex-col gap-2">
        <div className="text-lg font-semibold">{product.name}</div>
        <div className="flex gap-2 items-center">
          <Star rate={product.rate} /> ({product.totalRate})
        </div>
        <div className="text-[22px] font-semibold">${product.price}</div>
      </div>
    </div>
  );
}
