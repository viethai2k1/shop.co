import React from "react";
import Layout from "../../components/Layout";
import ProductOrderDetail from "../../components/ProductOrderDetail";

export default function OrderDetail({ orderInfo }) {
  return (
    <Layout>
      <div className="w-[1180px] mx-auto">
        <div className="text-[25px] font-semibold mt-[30px]">
          Chi tiết đơn hàng đã đặt
        </div>

        <div className="mt-[20px] flex flex-col gap-4">
          {orderInfo.data.products.map((product, index) => {
            return (
              <ProductOrderDetail
                key={index}
                user={orderInfo.data.userEntity}
                product={product}
              />
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
export const getServerSideProps = async (context) => {
  const id = context.query.id;
  const URL = `http://localhost:8080/api/orders/${id}`;
  const response = await fetch(URL);
  const order = await response.json();
  return {
    props: {
      orderInfo: order,
    },
  };
};
