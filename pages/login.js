import { signIn } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import Layout from "../components/Layout";
import { BsEye, BsEyeSlash } from "react-icons/bs";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [typeIsPassword, setType] = useState(true);

  const handleLogin = async () => {
    await signIn("credentials", {
      email: email,
      password: password,
      callbackUrl: "/",
    });
  };

  return (
    <div>
      <Layout>
        <div className="w-[1180px] mx-auto py-[50px]">
          <div className="w-[1180px] h-[350px] flex flex-col justify-center items-center gap-[20px]">
            <div className="text-[22px] font-semibold">SIGN IN.</div>
            <div className="flex flex-col gap-[20px] justify-center">
              <input
                placeholder="Email address *"
                className="w-[450px] h-[45px] rounded-[5px] border-[1px] border-[gray] pl-[20px]"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></input>
              <div className="relative">
                <input
                  placeholder="Password *"
                  className="w-[450px] h-[45px] rounded-[5px] border-[1px] border-[gray] pl-[20px]"
                  value={password}
                  type={typeIsPassword ? "password" : "text"}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                ></input>
                <div
                  onClick={() => {
                    setType(!typeIsPassword);
                  }}
                  className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {typeIsPassword ? <BsEye /> : <BsEyeSlash />}
                </div>
              </div>
              <button
                onClick={handleLogin}
                className="w-[450px] h-[45px] bg-[black] rounded-[5px] text-[white]"
              >
                Sign in
              </button>
              <div className="border-[1px] "></div>
            </div>
            <div className=" w-[450px] flex text-[14px] justify-between">
              <div className="flex gap-[10px]">
                <div>New to Hydrogen?</div>
                <Link href="/register">
                  <u>Create an account</u>
                </Link>
              </div>
              <div className="text-[gray]">Forgot password</div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
