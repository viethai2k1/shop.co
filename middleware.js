import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const admin = ["/admin"];
const user = ["/trangnguoidung", "/checkout"]

export default async function middleware(req, res) {
  const token = await getToken({ req });
  const path = req.nextUrl.pathname;
  const matcher = [...admin, ...user].some((match) => path.startsWith(match));

  if (!matcher) {
    return;
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (
    admin.some((item) => path.startsWith(item)) &&
    !token.roles.some((item) => item.role === "admin")
  ) {
    return NextResponse.redirect(new URL("/denied", req.url));
  }
}
