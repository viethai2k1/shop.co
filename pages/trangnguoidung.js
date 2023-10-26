import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useSession } from "next-auth/react";
import { Button } from "@chakra-ui/react";
import { signIn } from "next-auth/react";

export default function Trangnguoidung() {
  const session = useSession();

  const [fullName, setFullname] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();

  useEffect(() => {
    setFullname(session?.data?.user?.fullname);
    setEmail(session?.data?.user?.email);
    setPhone(session?.data?.user?.phonenumber);
  }, [session]);

  const handleUpdateUser = async () => {
    const URL = `http://localhost:8080/api/users/userupdate`;
    const payload = {
      method: "PUT",
      body: JSON.stringify({
        id: session?.data?.user?.id,
        fullName,
        email,
        phone,
      }),
      headers: {
        "Content-type": "application/json",
      },
    };

    await fetch(URL, payload);
    await signIn("credentials", {
      email: session?.data?.user?.email,
      password: session?.data?.user?.password,
      callbackUrl: "/trangnguoidung",
    });
  };

  return (
    <Layout>
      <div className="w-[1180px] mx-auto py-4">
        <div className="px-[30px] mt-[10px]">
          <div className="text-[40px] font-semibold ">Hồ sơ của tôi</div>
          <div className="text-[17px]">
            Quản lý thông tin hồ sơ để bảo mật tài khoản
          </div>
        </div>
        <div className="border bg-gray-100 flex justify-between flex-col-2 mt-[20px] p-[70px] rounded-[8px]">
          <div className="flex flex-col gap-8">
            <div className="flex gap-2 items-center">
              <label className="min-w-[150px] block">Họ và tên:</label>
              <input
                value={fullName}
                onChange={(e) => {
                  setFullname(e.target.value);
                }}
                className="border rounded px-2 py-2 w-[400px] "
              ></input>
            </div>
            <div className="flex gap-2 items-center">
              <label className="min-w-[150px] block">User name :</label>
              <input
                value={session?.data?.user?.username}
                className="border rounded px-2 py-2 w-[400px]"
                disabled
              ></input>
            </div>
            <div className="flex gap-2 items-center ">
              <label className="min-w-[150px] block">Email :</label>
              <input
                value={email}
                className="border rounded px-2 py-2 min-w-[50px] w-[400px]"
              ></input>
            </div>
            <div className="flex gap-2 items-center ">
              <label className="min-w-[150px] block">Số điện thoại :</label>
              <input
                value={phone}
                className="border rounded px-2 py-2 min-w-[50px] w-[400px]"
              ></input>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <img
              className="border rounded-[500px] w-[300px] h-[300px] bg-gray-300"
              src={session?.data?.user?.image}
            ></img>
            <button className="border rounded py-[10px] px-[30px] bg-white flex items-center justify-center">
              Chọn ảnh
            </button>
          </div>
        </div>
        <Button colorScheme="blue" onClick={handleUpdateUser}>
          Save
        </Button>
      </div>
    </Layout>
  );
}
