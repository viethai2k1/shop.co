import React from "react";

export default function ProductOrderDetail({ product, user }) {
  return (
    <div className="w-[1180px] mx-auto bg-gray-100  flex flex-col-3 justify-between p-[40px] rounded-[10px]">
      <div className="w-[300px] h-[300px] bg-gray-200 rounded flex items-center justify-center">
        <img className="w-[200px] h-[200px] " src={product.image}></img>
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex gap-5 items-center  ">
          <label className="min-w-[110px]">Tên sản phẩm: </label>
          <div className="text-[25px] font-medium ">{product.name}</div>
        </div>
        <div className="flex gap-5 items-center  ">
          <label className="min-w-[110px]">Giá sản phẩm: </label>
          <div className="text-[25px]">{product.price}</div>
        </div>
        <div className="flex gap-5 items-center  ">
          <label className="min-w-[110px]">Số lượng: </label>
          <div className="text-[25px]">{product.quantity}</div>
        </div>
        <div className="flex gap-5 items-center  ">
          <label className="min-w-[110px]">Đánh giá: </label>
          <div className="text-[25px]">{product.rate}</div>
        </div>
        <div className="flex gap-5 items-center  ">
          <label className="min-w-[110px]">Tổng sản phẩm: </label>
          <div className="text-[25px]">{product.totalRate}</div>
        </div>
      </div>
      <div className="flex flex-col gap-10">
        <div className="w-[90px] h-[90px] bg-gray-200 flex justify-center items-center rounded">
          <img className="w-[70px] h-[70px]" src={user.image}></img>
        </div>
        <div className="flex gap-2 items-center">
          <label className="min-w-[100px]">Tên người đặt:</label>
          <div className="text-[17px] font-semibold">
            {user.fullname}
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <label className="min-w-[100px]">Số điện thoại:</label>
          <div className="text-[17px] font-semibold">
            {user.phonenumber}
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <label className="min-w-[100px]">User name:</label>
          <div className="text-[17px] font-semibold">
            {user.username}
          </div>
        </div>
      </div>
    </div>
  );
}
