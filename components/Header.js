import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { BsCartDash, BsChevronDown } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
export default function Header() {
  const session = useSession();

  const showAdminButton = session?.data?.user?.roles?.some(
    (role) => role.role == "admin"
  );

  return (
    <div>
      <div className="h-[38px] bg-black text-white flex justify-center items-center">
        <div className="w-[1180px] flex items-center justify-center gap-[400px] ">
          <div className="text-[13px]">
            Sign up and get 20% off to your first order.<u> Sign Up Now</u>
          </div>
        </div>
      </div>
      <div className="w-[1180px] mx-auto flex justify-between border-b-2 py-[20px]">
        <Link href={"http://localhost:3000/"} className="text-[27px] font-bold">
          SHOP.CO
        </Link>
        <div className="flex items-center gap-4">
          <div className="flex gap-1 items-center justify-center hover:text-gray-400">
            <div>Shop</div>
            <BsChevronDown></BsChevronDown>
          </div>
          <div className="hover:text-gray-400">On Sale</div>
          <div className="hover:text-gray-400">New Arrivals</div>
          <div className="hover:text-gray-400">Brands</div>
        </div>
        <div className="relative">
          <input
            className="bg-[#F0F0F0] w-[350px] pl-[20px] text-[14px] h-[35px] rounded-[40px]"
            placeholder="Search for products...."
          ></input>
          <CiSearch className="text-[20px] absolute top-[8px] right-[20px]"></CiSearch>
        </div>
        <div className="flex gap-2 items-center text-[22px] relative z-[10000]">
          <Link href={"/cart"}>
            <BsCartDash></BsCartDash>
          </Link>
          {session?.data?.user ? (
            <Menu size="sm">
              <MenuButton>
                <AiOutlineUser></AiOutlineUser>
              </MenuButton>
              <MenuList>
                <MenuItem className="text-sm">
                  <Link href="/trangnguoidung">Trang cá nhân</Link>
                </MenuItem>
                <MenuItem className="text-sm">
                  <Link href="/cart">Giỏ hàng</Link>
                </MenuItem>
                <MenuItem className="text-sm" onClick={signOut}>
                  Đăng xuất
                </MenuItem>
                <Link href={"http://localhost:3000/orders"}>
                  <MenuItem className="text-sm">
                    Danh sách các đơn hàng
                  </MenuItem>
                </Link>
              </MenuList>
            </Menu>
          ) : (
            <Link href={"/login"}>
              <AiOutlineUser></AiOutlineUser>
            </Link>
          )}
          {showAdminButton && (
            <Link href={"/admin"}>
              <MdOutlineAdminPanelSettings></MdOutlineAdminPanelSettings>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
