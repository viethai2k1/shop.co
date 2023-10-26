import React, { useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
  Switch,
  Textarea,
  FormLabel,
  FormControl,
  Flex,
  Select,
  Tag,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
export default function OrderAdmin({ orderAdmin }) {
  const [stateOrderAdmin, setStateOrdersAdmin] = useState(orderAdmin);

  const date = new Date(orderAdmin.createDate);
  const dateFormat = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;

  const xulyload = async () => {
    const URL = `http://localhost:8080/api/orders/${orderAdmin.id}`;
    const dataOrderAdmin = await fetch(URL);
    const OrderAdmin = await dataOrderAdmin.json();
    setStateOrdersAdmin(OrderAdmin.data);
  };

  const handleUpdateStatus = async (e) => {
    const status = e.target.value;
    const URL = `http://localhost:8080/api/orders/status/${orderAdmin.id}`;
    const response = await fetch(URL, {
      method: "PUT",
      body: JSON.stringify({
        status: status,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    xulyload();
  };

  return (
    <div className=" mx-auto bg-gray-50  flex flex-col-2 justify-between items-center p-[30px] rounded-[10px]">
      <div className="flex flex-col gap-2">
        <div className="text-[20px] font-semibold">
          {orderAdmin.userEntity.fullname}
        </div>
        <div>{dateFormat}</div>
        <select
          className="bg-gray-200 w-[300px] rounded-[5px] h-[35px] px-[10px]"
          onChange={handleUpdateStatus}
          value={stateOrderAdmin.status}
        >
          <option value={1}>Chưa thanh toán</option>
          <option value={2}>Đã thanh toán</option>
          <option value={3}>Đang vận chuyển</option>
          <option value={4}>Đã vận chuyển</option>
          <option value={5}>Hủy</option>
        </select>
        <div className="text-[20px] font-semibold ">
          ${orderAdmin.totalprice}
        </div>
      </div>
      <div className="flex gap-3">
        {orderAdmin.products.map((imgProduct, index) => {
          return (
            <div
              key={index}
              className="border border-green-500 w-[100px] h-[100px] p-[10px]"
            >
              <img className="" src={imgProduct.image}></img>
            </div>
          );
        })}
      </div>
    </div>
  );
}
