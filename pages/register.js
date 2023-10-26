import React, { useState } from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function Register() {
  const [type, setType] = useState("password");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    //dinh nghia payload
    //url va options(headers: {"Content-type" : "application/json"})
    //goi api bang fetch
    //kiem tra ket qua tra ve va xu ly logic tiep theo
    if(email === ""){
      toast.warning("Phải nhập email!");
      return;
    }

    const payload = {
      fullName : fullName,
      email: email,
      password: password
    }
    const URL ="http://localhost:8080/api/auth/register"
    const options = {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-type" : "application/json"
      }
    }
    const dangKy = await fetch(URL, options);
    const ketQuaDangKy = await dangKy.json(); 
    if(ketQuaDangKy.ok) {
      toast.success("Đăng kí thành công")
    }else {
      toast.error("Đăng ký thất bại")
    }

  };

  return (
    <div>
      <Layout>
        <div className="w-[1180px] mx-auto py-[50px]">
          <div className="w-[1180px] h-[350px] flex flex-col justify-center items-center gap-[20px]">
            <div className="text-[22px] font-semibold">CREATE AN ACCOUNT.</div>
            <div className="flex flex-col gap-[20px] justify-center">
              <input
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
                placeholder="Full Name"
                className="w-[450px] h-[45px] rounded-[5px] border-[1px] border-[gray] pl-[20px]"
              ></input>
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Email address *"
                className="w-[450px] h-[45px] rounded-[5px] border-[1px] border-[gray] pl-[20px]"
              ></input>
              <input
                value={password}
                onChange={(e) => {
                  setPassWord(e.target.value);
                }}
                type={type}
                placeholder="Password *"
                className="w-[450px] h-[45px] rounded-[5px] border-[1px] border-[gray] pl-[20px]"
              ></input>
              <button
                onClick={handleRegister}
                className="w-[450px] h-[45px] bg-[black] rounded-[5px] text-[white]"
              >
                Create Account
              </button>
              <div className="border-[1px] "></div>
            </div>
            <div className=" w-[450px] flex text-[14px] justify-between">
              <div className="flex gap-[10px]">
                <div>Already have an account?</div>
                <Link href="/login">
                  <u> Sign in</u>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
