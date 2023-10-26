import React from "react";
import Layout from "../../components/Layout";
import Order from "../../components/Order";
import Link from "next/link";
import { BsArrowReturnLeft } from "react-icons/bs";
import { getToken } from "next-auth/jwt";
export default function Index({ data }) {
  return (
    <Layout>
      <div className="w-[1180px] mx-auto">
        <div className="flex justify-between items-center px-[20px] mt-[70px]">
          <div className="text-[25px] font-semibold ">
            Danh sách các đơn hàng đã đặt
          </div>
        </div>
        <div className="mt-[20px] flex flex-col gap-[30px]">
          {data.data.map((order, index) => {
            return <Order key={index} order={order}></Order>;
          })}
        </div>
      </div>
    </Layout>
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
  const URL = `http://localhost:8080/api/orders/user/${userId}`;
  const dataOrder = await fetch(URL);
  const Orderdata = await dataOrder.json();
  return {
    props: {
      data: Orderdata,
    },
  };
};
