import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useSession } from "next-auth/react";

export default function Cart({ cart, xulyload }) {
  const session = useSession();
  const updateCart = async (quantity) => {
    const id = session?.data?.user?.id;
    const payload = {
      userId: id,
      items: [
        {
          productId: cart.product.id,
          quantity: quantity,
        },
      ],
    };
    const URL = "http://localhost:8080/api/cart/add";
    const option = {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json",
      },
    };
    const response = await fetch(URL, option);
    const result = await response.json();
    xulyload(id);
  };

  const increaseQuantity = async () => {
    updateCart(cart.quantity + 1)
  }
  const decreaseQuantity = async () => {
    updateCart(cart.quantity - 1)
  }

  return (
    <div className="w-[1180px] mx-auto">
      <div className="flex justify-between w-[650px] gap-2  p-[20px]">
        <div className="flex items-center gap-4">
          <div className="w-[150px] h-[150px] bg-gray-200 flex justify-center items-center rounded-[10px]">
            <img
              className="w-[100px] h-[100px]"
              src={cart.product.images[0]?.url}
            ></img>
          </div>
          <div>
            <div className="font-bold text-[20px]"> {cart.product.name}</div>
            <div className="flex gap-2">
              <div>Đánh giá:</div>
              <div>{cart.product.rate}</div>
            </div>
            <div className="text-[30px] font-semibold">
              ${cart.product.price}
            </div>
          </div>
        </div>
        <div className="mt-[10px] relative  ">
          <AiOutlineDelete
            onClick={() => {updateCart(0)}}
            className="text-[30px] absolute top-0 right-4"
          ></AiOutlineDelete>
          <div className="absolute top-[85px] right-2 border rounded-[20px] bg-gray-200 flex items-center justify-between w-[150px] h-[35px] px-[20px] text-[20px]">
            <div
              onClick={() => {
                decreaseQuantity();
              }}
              className="cursor-pointer font-medium text-[25px] select-none"
            >
              -
            </div>
            <div>{cart.quantity}</div>
            <div
              className="cursor-pointer font-medium text-[25px] select-none"
              onClick={() => {
                increaseQuantity();
              }}
            >
              +
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
