import React, { useState } from "react";
import Layout from "../../components/Layout";
import {
  AiOutlineRight,
  AiOutlineFilter,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
} from "react-icons/ai";
import { PiCaretDownBold } from "react-icons/pi";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import Link from "next/link";


import Category from "../../components/Category";
import Product from "../../components/Product";
export default function Categorys({ products }) {
  
  const [thayDoiMau1, setThayDoiMau1] = useState("");
  const [thayDoiMauChitiet1, setThayDoiMauChiTiet1] = useState("#00C02C");
  const [thayDoiSize1, setThayDoiSize1] = useState("");
  const [thayDoiSize, setThayDoiSize] = useState();
  const [thayDoiStyle1, setThayDoiStyle1] = useState("");
  const [thayDoiStyle, setThayDoiStyle] = useState();
  return (
    <Layout>
      <div className="w-[1180px] mx-auto flex gap-2 py-[20px]  text-[14px] text-gray-400">
        <div className="flex gap-1 items-center ">
          <Link href={"/"}>Home</Link>
          <AiOutlineRight></AiOutlineRight>
        </div>
        <div>Casual</div>
      </div>
      <div className="w-[1180px] mx-auto flex gap-6">
        <div className="min-w-[300px] border rounded-[10px] p-[20px]">
          <div className="flex items-center justify-between border-b-2 pb-4">
            <div className="font-bold">Filters</div>
            <AiOutlineFilter className="text-gray-400 text-[20px]"></AiOutlineFilter>
          </div>
          <div className="flex flex-col gap-4 text-gray-400 border-b-2 py-[20px] ">
            <div className="flex justify-between items-center">
              <div>T-shirts</div>
              <AiOutlineRight></AiOutlineRight>
            </div>
            <div className="flex justify-between items-center ">
              <div>Shorts</div>
              <AiOutlineRight></AiOutlineRight>
            </div>
            <div className="flex justify-between items-center ">
              <div>Shirts</div>
              <AiOutlineRight></AiOutlineRight>
            </div>
            <div className="flex justify-between items-center ">
              <div>Hoodie</div>
              <AiOutlineRight></AiOutlineRight>
            </div>
            <div className="flex justify-between items-center ">
              <div>Jeans</div>
              <AiOutlineRight></AiOutlineRight>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between border-b-2 py-[20px]">
              <div>Price</div>
              <AiOutlineRight></AiOutlineRight>
            </div>
          </div>
          <div>
            <div className="flex flex-col gap-2">
              <div
                onClick={() => {
                  setThayDoiMau1(!thayDoiMau1);
                }}
                className="flex justify-between items-center mt-[20px]"
              >
                <div className="text-gray-400">Colors</div>
                <div>
                  {thayDoiMau1 ? (
                    <MdOutlineKeyboardArrowUp></MdOutlineKeyboardArrowUp>
                  ) : (
                    <PiCaretDownBold></PiCaretDownBold>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-5 gap-2 mt-[10px]">
                {thayDoiMau1 && (
                  <div
                    onClick={() => {
                      setThayDoiMauChiTiet1("#00C02C");
                    }}
                    className={`${
                      thayDoiMauChitiet1 == "#00C02C"
                        ? "border-2 border-black"
                        : ""
                    } w-[35px] h-[35px] border rounded-[40px] bg-[#00C02C]`}
                  ></div>
                )}
                {thayDoiMau1 && (
                  <div
                    onClick={() => {
                      setThayDoiMauChiTiet1("#F60707");
                    }}
                    className={`${
                      thayDoiMauChitiet1 == "#F60707"
                        ? "border-2 border-black"
                        : ""
                    } w-[35px] h-[35px] border rounded-[40px] bg-[#F60707]`}
                  ></div>
                )}
                {thayDoiMau1 && (
                  <div
                    onClick={() => {
                      setThayDoiMauChiTiet1("#F6DD07");
                    }}
                    className={`${
                      thayDoiMauChitiet1 == "#F6DD07"
                        ? "border-2 border-black"
                        : ""
                    } w-[35px] h-[35px] border rounded-[40px] bg-[#F6DD07]`}
                  ></div>
                )}
                {thayDoiMau1 && (
                  <div
                    onClick={() => {
                      setThayDoiMauChiTiet1("#F57907");
                    }}
                    className={`${
                      thayDoiMauChitiet1 == "#F57907"
                        ? "border-2 border-black"
                        : ""
                    } w-[35px] h-[35px] border rounded-[40px] bg-[#F57907]`}
                  ></div>
                )}
                {thayDoiMau1 && (
                  <div
                    onClick={() => {
                      setThayDoiMauChiTiet1("#06C9F5");
                    }}
                    className={`${
                      thayDoiMauChitiet1 == "#06C9F5"
                        ? "border-2 border-black"
                        : ""
                    } w-[35px] h-[35px] border rounded-[40px] bg-[#06C9F5]`}
                  ></div>
                )}
                {thayDoiMau1 && (
                  <div
                    onClick={() => {
                      setThayDoiMauChiTiet1("#063BF5");
                    }}
                    className={`${
                      thayDoiMauChitiet1 == "#063BF5"
                        ? "border-2 border-black"
                        : ""
                    } w-[35px] h-[35px] border rounded-[40px] bg-[#063BF5]`}
                  ></div>
                )}
                {thayDoiMau1 && (
                  <div
                    onClick={() => {
                      setThayDoiMauChiTiet1("#7D06F4");
                    }}
                    className={`${
                      thayDoiMauChitiet1 == "#7D06F4"
                        ? "border-2 border-black"
                        : ""
                    } w-[35px] h-[35px] border rounded-[40px] bg-[#7D06F4]`}
                  ></div>
                )}
                {thayDoiMau1 && (
                  <div
                    onClick={() => {
                      setThayDoiMauChiTiet1("#F606A5");
                    }}
                    className={`${
                      thayDoiMauChitiet1 == "#F606A5"
                        ? "border-2 border-black"
                        : ""
                    } w-[35px] h-[35px] border rounded-[40px] bg-[#F606A5]`}
                  ></div>
                )}
                {thayDoiMau1 && (
                  <div
                    onClick={() => {
                      setThayDoiMauChiTiet1("#FFFFFF");
                    }}
                    className={`${
                      thayDoiMauChitiet1 == "#FFFFFF"
                        ? "border-2 border-black"
                        : ""
                    } w-[35px] h-[35px] border-2 rounded-[40px] bg-[#FFFFFF]`}
                  ></div>
                )}
                {thayDoiMau1 && (
                  <div
                    onClick={() => {
                      setThayDoiMauChiTiet1("#000000");
                    }}
                    className={`${
                      thayDoiMauChitiet1 == "#000000"
                        ? "border-2 border-black"
                        : ""
                    } w-[35px] h-[35px] border rounded-[40px] bg-[#000000]`}
                  ></div>
                )}
              </div>
            </div>
          </div>
          <div>
            <div
              onClick={() => {
                setThayDoiSize1(!thayDoiSize1);
              }}
              className="flex items-center justify-between"
            >
              <div>Size</div>
              <div>
                {thayDoiSize1 ? (
                  <MdOutlineKeyboardArrowUp></MdOutlineKeyboardArrowUp>
                ) : (
                  <PiCaretDownBold></PiCaretDownBold>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-[10px]">
              {thayDoiSize1 && (
                <div
                  onClick={() => {
                    setThayDoiSize("XX-Small");
                  }}
                  className={`${
                    thayDoiSize == "XX-Small" ? "bg-black text-white" : ""
                  } w-[100px] h-[35px] border rounded-[40px] flex items-center justify-center`}
                >
                  XX-Small
                </div>
              )}
              {thayDoiSize1 && (
                <div
                  onClick={() => {
                    setThayDoiSize("X-Small");
                  }}
                  className={`${
                    thayDoiSize == "X-Small" ? "bg-black text-white" : ""
                  } w-[100px] h-[35px] border rounded-[40px] flex items-center justify-center`}
                >
                  X-Small
                </div>
              )}
              {thayDoiSize1 && (
                <div
                  onClick={() => {
                    setThayDoiSize("Small");
                  }}
                  className={`${
                    thayDoiSize == "Small" ? "bg-black text-white" : ""
                  } w-[100px] h-[35px] border rounded-[40px] flex items-center justify-center`}
                >
                  Small
                </div>
              )}
              {thayDoiSize1 && (
                <div
                  onClick={() => {
                    setThayDoiSize("Medium");
                  }}
                  className={`${
                    thayDoiSize == "Medium" ? "bg-black text-white" : ""
                  } w-[100px] h-[35px] border rounded-[40px] flex items-center justify-center`}
                >
                  Medium
                </div>
              )}
              {thayDoiSize1 && (
                <div
                  onClick={() => {
                    setThayDoiSize("Large");
                  }}
                  className={`${
                    thayDoiSize == "Large" ? "bg-black text-white" : ""
                  } w-[100px] h-[35px] border rounded-[40px] flex items-center justify-center`}
                >
                  Large
                </div>
              )}
              {thayDoiSize1 && (
                <div
                  onClick={() => {
                    setThayDoiSize("X-Large");
                  }}
                  className={`${
                    thayDoiSize == "X-Large" ? "bg-black text-white" : ""
                  } w-[100px] h-[35px] border rounded-[40px] flex items-center justify-center`}
                >
                  X-Large
                </div>
              )}
              {thayDoiSize1 && (
                <div
                  onClick={() => {
                    setThayDoiSize("XX-Large");
                  }}
                  className={`${
                    thayDoiSize == "XX-Large" ? "bg-black text-white" : ""
                  } w-[100px] h-[35px] border rounded-[40px] flex items-center justify-center`}
                >
                  XX-Large
                </div>
              )}
              {thayDoiSize1 && (
                <div
                  onClick={() => {
                    setThayDoiSize("3X-Large");
                  }}
                  className={`${
                    thayDoiSize == "3X-Large" ? "bg-black text-white" : ""
                  } w-[100px] h-[35px] border rounded-[40px] flex items-center justify-center`}
                >
                  3X-Large
                </div>
              )}
              {thayDoiSize1 && (
                <div
                  onClick={() => {
                    setThayDoiSize("4X-Large");
                  }}
                  className={`${
                    thayDoiSize == "4X-Large" ? "bg-black text-white" : ""
                  } w-[100px] h-[35px] border rounded-[40px] flex items-center justify-center`}
                >
                  4X-Large
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div
              onClick={() => {
                setThayDoiStyle1(!thayDoiStyle1);
              }}
              className=" flex items-center justify-between mt-[20px]"
            >
              <div className="">Dress Style</div>
              <div>
                {thayDoiStyle1 ? (
                  <MdOutlineKeyboardArrowUp></MdOutlineKeyboardArrowUp>
                ) : (
                  <PiCaretDownBold></PiCaretDownBold>
                )}
              </div>
            </div>
            <div>
              {thayDoiStyle1 && (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between ">
                    <div>Casual</div>
                    <AiOutlineRight></AiOutlineRight>
                  </div>
                  <div className="flex items-center justify-between ">
                    <div>Formal</div>
                    <AiOutlineRight></AiOutlineRight>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>Party</div>
                    <AiOutlineRight></AiOutlineRight>
                  </div>
                  <div className="flex items-center justify-between ">
                    <div>Gym</div>
                    <AiOutlineRight></AiOutlineRight>
                  </div>
                </div>
              )}
            </div>
          </div>
          <button className="px-10 py-2 border rounded-[20px] ml-[50px] mt-[20px]  hover:bg-black hover:text-white">
            Apply Filter
          </button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {products.data.map((product, index) => {
              return(
                <Product key={index} product={product} />
              )
          })}

        </div>
      </div>
      <div className="w-[1180px] mx-auto flex justify-between py-[30px] ">
        <button className="border py-2 px-5 text-[14px] flex gap-2 items-center rounded-[5px] font-semibold">
          Previous
          <AiOutlineArrowLeft />
        </button>
        <div className="flex gap-2">
          <button className="border rounded-[5px] px-4 py-2 hover:bg-red-500 hover:text-white">
            1
          </button>
          <button className="border rounded-[5px] px-4 py-2 hover:bg-red-500 hover:text-white">
            2
          </button>
          <button className="border rounded-[5px] px-4 py-2 hover:bg-red-500 hover:text-white">
            3
          </button>
          <button className="border rounded-[5px] px-4 py-2 hover:bg-red-500 hover:text-white">
            4
          </button>
          <button className="border rounded-[5px] px-4 py-2 hover:bg-red-500 hover:text-white">
            5
          </button>
        </div>
        <button className="border py-2 px-5 text-[14px] flex gap-2 items-center rounded-[5px] font-semibold">
          Next
          <AiOutlineArrowRight />
        </button>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async (context) => {
  const id = context.query.ed;
  const URL = `http://localhost:8080/api/products/category/${id}`
  const response = await fetch(URL);
  const products = await response.json();

  return {
    props: {
      products: products,
    },
  };
};
