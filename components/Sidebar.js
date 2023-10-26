import Link from "next/link";
import React from "react";
import {
  AiOutlineTags,
  AiFillHome,
  AiOutlineUser,
  AiFillSetting,
} from "react-icons/ai";
import { BsClipboardCheck, BsFillBarChartLineFill } from "react-icons/bs";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { GiReturnArrow } from "react-icons/gi";
import { RiAdminLine } from "react-icons/ri";
export default function Sidebar() {
  const MENUS = [
    {
      title: "Quản lý",
      icon: <AiFillHome />,
      children: [
        {
          title: "Sản phẩm",
          path: "/admin/product",
          icon: <AiOutlineTags />,
        },
        {
          title: "Danh mục",
          path: "/admin/category",
          icon: <BsClipboardCheck />,
        },
        {
          title: "Người dùng",
          path: "/admin/users",
          icon: <AiOutlineUser />,
        },
        {
          title: "Đơn hàng",
          path: "/admin/donhang",
          icon: <BsClipboardCheck />,
        },
        {
          title: "Đánh giá",
          path: "/admin/danhgia",
          icon: <BiMessageRoundedDetail />,
        },
      ],
    },
    {
      title: "Thống kê",
      icon: <BsFillBarChartLineFill></BsFillBarChartLineFill>,
      children: [
        {
          title: "Doanh thu",
          path: "/admin/thongke",
          icon: <AiOutlineTags />,
        },
      ],
    },
  ];
  return (
    <div className="w-[250px] bg-white border-r h-full flex flex-col justify-between p-4 px-5">
      <div className="flex flex-col gap-3">
        {MENUS.map((menu, index) => {
          return (
            <div key={index}>
              <div className="flex gap-2 items-center">
                <p>{menu.icon}</p>
                <p className="text-md font-bold mb-2">{menu.title}</p>
              </div>

              <div className="flex flex-col gap-2">
                {menu.children.map((children, index) => {
                  return (
                    <Link
                      href={children.path}
                      className="text-sm flex items-center gap-1"
                      key={index}
                    >
                      {children.icon}
                      {children.title}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
        <Link
          className="flex items-center gap-2"
          href={"http://localhost:3000/"}
        >
          <GiReturnArrow></GiReturnArrow>
          <div>Trở về màn chính</div>
        </Link>
        <Link
          className="flex items-center gap-2"
          href={"http://localhost:3000/admin"}
        >
          <RiAdminLine></RiAdminLine>

          <div>Trở về trang chủ admin</div>
        </Link>
      </div>
      <div className="flex gap-2 items-center">
        <AiFillSetting className="text-[20px]"></AiFillSetting>
        <div className="text-[13px]">Settings</div>
      </div>
    </div>
  );
}
