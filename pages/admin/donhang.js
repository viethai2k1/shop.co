import React from "react";
import LayoutAdmin from "../../components/LayoutAdmin";
import OrderAdmin from "../../components/OrderAdmin";

export default function DonHang({ orders }) {
  return (
    <LayoutAdmin>
      <div className="flex ml-[40px] mt-[30px] text-[20px] font-semibold">
        Orders
      </div>
      <div className="px-[40px] mt-[20px] flex flex-col gap-7 pb-[30px]">
        {orders.data.map((order, index) => {
          return (
            <div>
              <OrderAdmin key={index} orderAdmin={order}></OrderAdmin>
            </div>
          );
        })}
      </div>
    </LayoutAdmin>
  );
}
export const getServerSideProps = async () => {
  const URL = "http://localhost:8080/api/orders";
  const dataOrders = await fetch(URL);
  const Orders = await dataOrders.json();
  return {
    props: {
      orders: Orders,
    },
  };
};
