import React from "react";
import { AiFillStar } from "react-icons/ai";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Flex, Tag } from "@chakra-ui/react";
export default function Order({ order }) {
  const session = useSession();

  const date = new Date(order.createDate);
  const dateFormat = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;

  const reducePrice = order.products.reduce((sum, item) => {
   
    return sum + item.price * item.quantity;
  }, 0);

  return (
    <Link
      href={`http://localhost:3000/orders/${order.id}`}
      className=" border rounded-[10px] p-[30px] "
    >
      <Flex className="justify-between">
        <Flex direction={"column"} gap={2}>
          <div className="text-[25px] font-semibold">
            {order.userEntity.fullname}
          </div>
          <div className="text-md font-semibold text-gray-600">
            {dateFormat}
          </div>
          <div>
            <StatusOrder status={order.status} />
          </div>
          <div className="text-[30px] font-bold">${reducePrice}</div>
        </Flex>
        <Flex gap={4} mt={4}>
          {order.products.map((product, key) => {
            return (
              <div className="border p-4 h-[180px]">
                <img
                  key={key}
                  className="h-full aspect-square  rounded-lg"
                  alt="chưa có ảnh"
                  src={product.image}
                ></img>
              </div>
            );
          })}
        </Flex>
      </Flex>
    </Link>
  );
}

function StatusOrder({ status }) {
  switch (status) {
    case 1:
      return <Tag colorScheme="red">Chưa thanh toán</Tag>;
    case 2:
      return <Tag colorScheme="green">Đã thanh toán</Tag>;
    case 3:
      return <Tag colorScheme="yellow">Đang giao hàng</Tag>;
    case 4:
      return <Tag colorScheme="blue">Đã giao hàng</Tag>;
    default:
      break;
  }
}
