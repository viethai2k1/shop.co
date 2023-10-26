import React from "react";
import Sidebar from "./Sidebar";

import { BiLogoReact } from "react-icons/bi";
import { AiFillBell } from "react-icons/ai";
import { GiReturnArrow } from "react-icons/gi";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Avatar, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
export default function LayoutAdmin({ children, className }) {
  const session = useSession();

  return (
    <div className="flex flex-col h-screen">
      <div className="h-[56px] w-full px-[20px]  flex items-center justify-between mx-auto border-b">
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-2">
            <BiLogoReact className="text-[35px] font-bold"></BiLogoReact>
            <div className="text-[15px] font-semibold">Quản lý đồ thể thao</div>
          </div>
          {/* <Link href={"http://localhost:3000/"}>
            <GiReturnArrow className="text-[20px]"></GiReturnArrow>
          </Link> */}
        </div>
        <Menu>
          <MenuButton>
            <div className="flex items-center gap-8">
              <AiFillBell className="text-[20px]"></AiFillBell>
              <div className="flex items-center gap-2">
                <Avatar
                  src={session?.data?.user?.image}
                  alt={session?.data?.user?.fullname}
                />
                <div className="text-gray-500 text-[15px]">
                  {session?.data?.user?.fullname}
                </div>
              </div>
            </div>
          </MenuButton>
          <MenuList>
            <MenuItem onClick={signOut}>Đăng xuất</MenuItem>
          </MenuList>
        </Menu>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <Sidebar></Sidebar>

        <div className={`w-full overflow-y-auto bg-gray-200 ${className}`}>
          {children}
        </div>
      </div>
    </div>
  );
}
