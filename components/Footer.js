import React from "react";
import {
  AiOutlineMail,
  AiOutlineInstagram,
  AiFillGithub,
} from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";

export default function Footer() {
  return (
    <div className="bg-[#F0F0F0] relative mt-36 pt-24">
      <div className="absolute w-[1180px] top-0 -translate-y-24 left-1/2 -translate-x-1/2 mx-auto py-10 rounded-[10px] bg-[black] text-[white] flex items-center justify-between p-16">
        <div className="text-[40px] w-[550px] font-bold">
          STAY UPTO DATE ABOUT OUR LATEST OFFERS
        </div>
        <div className="flex flex-col gap-4">
          <div className="w-[330px] relative">
            <input
              placeholder="Enter your email address"
              className="flex items-center pl-[40px]  gap-2 border bg-[white] text-[13px] h-[45px] rounded-[20px] w-[330px] text-[gray] "
            ></input>
            <AiOutlineMail className="absolute top-4 right-[300px] text-[gray]"></AiOutlineMail>
          </div>
          <button className="border bg-[white] text-[13px] h-[45px] font-semibold rounded-[20px] w-[330px] text-[black] ">
            Subscribe to Newsletter
          </button>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-[100px] mx-auto w-[1180px] border-b-2 py-[50px] ">
        <div className="flex flex-col gap-2">
          <div className="text-[28px] font-bold">SHOP.CO</div>
          <div className="text-[gray] text-[15px]">
            We have clothes that suits your style and which you’re proud to
            wear. From women to men.
          </div>
          <div className="flex gap-4">
            <div className="w-[30px] h-[30px] aspect-square border flex justify-center items-center rounded-[40px] bg-[white] text-[black] hover:bg-black hover:text-white">
              <RiTwitterXFill />
            </div>
            <div className="w-[30px] h-[30px] aspect-square border flex justify-center items-center rounded-[40px] bg-[white] text-[black] hover:bg-black hover:text-white">
              <FaFacebookF></FaFacebookF>
            </div>
            <div className="w-[30px] h-[30px] aspect-square border flex justify-center items-center rounded-[40px] bg-[white] text-[black] hover:bg-black hover:text-white">
              <AiOutlineInstagram></AiOutlineInstagram>
            </div>
            <div className="w-[30px] h-[30px] aspect-square border flex justify-center items-center rounded-[40px] bg-[white] text-[black] hover:bg-black hover:text-white">
              <AiFillGithub></AiFillGithub>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-[19px] font-medium">Company</div>
          <div className="flex flex-col gap-2 text-[gray] text-[15px]">
            <div>About</div>
            <div>Features</div>
            <div>Works</div>
            <div>Career</div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="text-[19px] font-medium">Help</div>
          <div className="flex flex-col gap-2 text-[gray] text-[15px]">
            <div>Customer Support</div>
            <div>Delivery Details</div>
            <div>Terms & Conditions</div>
            <div>Privacy Policy</div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="text-[19px] font-medium">FAQ</div>
          <div className="flex flex-col gap-2 text-[gray] text-[15px]">
            <div> Account</div>
            <div>Manage Deliveries</div>
            <div>Orders</div>
            <div>Payments</div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="text-[19px] font-medium">Resources</div>
          <div className="flex flex-col gap-2 text-[gray] text-[15px]">
            <div> Free eBooks</div>
            <div>Development Tutorial</div>
            <div>How to - Blog</div>
            <div>Youtube Playlist</div>
          </div>
        </div>
      </div>
      <div className="w-[1180px] mx-auto flex items-center justify-between py-[30px]">
        <div className="text-[gray]">
          Shop.co © 2000-{new Date().getFullYear()}, All Rights Reserved
        </div>
        <div className="flex">
          <img className="w-[55px]" src="/img/anh01.png"></img>
          <img className="w-[55px]" src="/img/anh02.png"></img>
          <img className="w-[55px]" src="/img/anh03.png"></img>
          <img className="w-[55px]" src="/img/anh04.png"></img>
          <img className="w-[55px]" src="/img/anh05.png"></img>
        </div>
      </div>
    </div>
  );
}
