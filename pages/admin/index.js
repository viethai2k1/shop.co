import React from "react";
import LayoutAdmin from "../../components/LayoutAdmin";
import { AiTwotoneStar } from "react-icons/ai";
export default function indexAdmin() {
  return (
    <LayoutAdmin>
      <div className="bg-gray-50 w-full">
        <div className="flex text-[20px] justify-center py-[20px] font-semibold">
          GIAO DIỆN TRANG QUẢN TRỊ ĐỒ THỂ THAO
        </div>
        <div className="px-[40px] mt-[20px]">
          <div className="flex justify-center text-[20px] font-semibold">
            NHỮNG VẬN ĐỘNG VIÊN THỜI ĐẠI
          </div>
          <div className="grid grid-cols-4 gap-5 mt-[30px]">
            {nhungVanDongVien.map((vandongvien, index) => {
              return (
                <div className="flex flex-col gap-2" key={index}>
                  <div className="bg-gray-100 rounded">
                    <img
                      className=" aspect-square "
                      src={vandongvien.anh}
                    ></img>
                  </div>
                  <div className="text-[20px] font-medium">{vandongvien.tenVĐV}</div>
                  <div>{vandongvien.quocGia}</div>
                  <div>{vandongvien.namSinh}</div>
                  <div>{vandongvien.thang_thua}</div>
                  <div>{vandongvien.danhHieu}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="px-[30px] py-[50px]">
          <div className="flex justify-center text-[20px] font-semibold">
            NHỮNG CÂY VỢT HUYỀN THOẠI
          </div>
          <div className=" mt-[30px] grid grid-cols-4 gap-4">
            {nhungCayVot.map((votcaulong, index) => {
              return (
                <div key={index}>
                  <div className="bg-gray-100 rounded">
                    <img className=" aspect-square " src={votcaulong.anh}></img>
                  </div>
                  <div className="text-[20px] font-medium">
                    {votcaulong.tenVot}
                  </div>
                  <div> {votcaulong.tenVĐV}</div>
                  <div> {votcaulong.sanXuat}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
}

const nhungCayVot = [
  {
    tenVĐV: "Lee Yong-dae",
    tenVot: "Yonex arcsaber 11",
    sanXuat: "Hàn Quốc",
    anh: "https://shopvnb.com//uploads/san_pham/vot-cau-long-yonex-arcsaber-11-2017-2.webp",
  },
  {
    tenVĐV: "Lee Chong Wei",
    tenVot: "Yonex doura 10 2016",
    sanXuat: "Malaisia",
    anh: "https://sieuthicaulong.vn/images/product/1683088943-a1e964c71ff04657b21514c96cb5d24e.jpg",
  },
  {
    tenVĐV: "Kento Momota",
    tenVot: "Yonex astrox 99",
    sanXuat: "Nhật Bản",
    anh: "https://vn.badminton-navi.net/images/racket/349_1_450.jpg",
  },
  {
    tenVĐV: "Huang Ya Qiong - VĐV Nữ",
    tenVot: "Yonex astrox 77 ",
    sanXuat: "Trung Quốc",
    anh: "https://wsport.vn/wp-content/uploads/2023/06/vot-cau-long-yonex-astrox-77-xanh-chuoi-chinh-hang-1.jpg.webp",
  },
];
const nhungVanDongVien = [
  {
    tenVĐV: "Lee Chong Wei",
    quocGia: "Malaisia",
    namSinh: "1982",
    thang_thua: "705_117",
    danhHieu: 69,
    anh: "/img/anhleechongwei.webp",
  },
  {
    tenVĐV: "Lin Dan",
    quocGia: "Trung Quốc",
    namSinh: "1983",
    thang_thua: "666_128",
    danhHieu: "Đầy đủ các danh hiệu",
    anh: "/img/anhlindan.webp",
  },
  {
    tenVĐV: "Kento Momota",
    quocGia: "Nhật Bản",
    namSinh: "1994",
    thang_thua: "306_76",
    danhHieu: 27,
    anh: "/img/anhmomota.webp",
  },
  {
    tenVĐV: "Viktor Axelsen",
    quocGia: "Đan Mạch",
    namSinh: "1994",
    thang_thua: "252-102",
    danhHieu: 11,
    anh: "/img/anhaxesen.jpg",
  },
];
