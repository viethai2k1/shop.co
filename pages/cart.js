import React, { useState } from "react";
import Layout from "../components/Layout";
import { AiOutlineRight, AiOutlineArrowRight } from "react-icons/ai";
import Cart from "../components/Cart";
import Link from "next/link";
import { getToken } from "next-auth/jwt";
import { useSession } from "next-auth/react";

export default function cart({ data }) {
 const [cart, setCart] = useState(data)
  const sumPrice = cart?.data?.cartItem.reduce((sum, item ) => {
      return sum + item.product.price * item.quantity
  },0)
  const xulyload = async (id) => {
    const URL = `http://localhost:8080/api/cart/${id}`;
    const datareviews = await fetch(URL);
    const datareviewsjson = await datareviews.json();
    setCart(datareviewsjson);
  }
  return (
    <div>
      <Layout>
        <div className="w-[1180px] mx-auto flex gap-2 text-[14px] text-gray-400 py-[15px]">
          <div className="flex items-center gap-1">
            <Link href={"/"}>Home</Link>
            <AiOutlineRight></AiOutlineRight>
          </div>
          <div>Cart</div>
        </div>
        <div className="w-[1180px] mx-auto py-[20px]">
          <div className="text-[35px] font-bold">Your cart</div>
        </div>
        <div className="flex justify-between w-[1180px] mx-auto">
          <div className="w-[650px] border rounded-[10px]">
            {cart?.data?.cartItem.map((cart, index) => {
              return (
                <div key={index}>
                  <Cart xulyload={xulyload} cart={cart}></Cart>
                </div>
              );
            })}
          </div>
          <div className="w-[500px] border rounded-[10px] p-[20px]">
            <div className="text-[20px] font-bold">Order Summary</div>
            <div className="flex flex-col gap-4 border-b-2 pb-3 mt-[20px]">
              <div className="flex justify-between">
                <div className="text-[15px] text-gray-400">Subtotal</div>
                <div className="text-[20px] text-black font-semibold">
                  ${sumPrice}
                </div>
              </div>
              <div className="flex justify-between">
                <div className="text-[15px] text-gray-400">Shipping fee</div>
                <div className="text-[20px] text-red-500 font-semibold">
                  $15
                </div>
              </div>
              {/* <div className="flex justify-between">
                <div className="text-[15px] text-gray-400">Delivery Fee</div>
                <div>$15</div>
              </div> */}
            </div>
            <div className="flex justify-between py-[15px]">
              <div>Total</div>
              <div className="text-[22px] font-semibold">${sumPrice + 15}</div>
            </div>
            <div className="flex justify-between py-[5px] ">
              <input
                className="border bg-[#F0F0F0] rounded-[20px] px-24 py-2 pl-[20px] text-[14px]"
                placeholder="Add promo code"
              ></input>
              <button className="border rounded-[20px] px-14 py-2 text-[14px] hover:bg-black hover:text-white">
                Apply
              </button>
            </div>
            <Link href={"http://localhost:3000/checkout"}>
              <div className="flex gap-2 items-center py-4">
                <button className="border rounded-[20px] w-full flex justify-center items-center gap-2 py-2 hover:bg-black hover:text-white">
                  Go to Checkout
                  <AiOutlineArrowRight></AiOutlineArrowRight>
                </button>
              </div>
            </Link>
          </div>
        </div>
      </Layout>
    </div>
  );
}
export const getServerSideProps = async (ctx) => {
  const session = await getToken({ req: ctx.req });
  if (!session) {
    return {
      props: {
        data: {
          ok: false,
          data: [],
        },
      },
    };
  }
  const userId = session.id;
  //goi API O DAY
  const URL = `http://localhost:8080/api/cart/${userId}`;
  const dataCart = await fetch(URL);
  const cartdata = await dataCart.json();
  return {
    props: {
      data: cartdata,
    },
  };
};
