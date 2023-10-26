import React from "react";
import LayoutAdmin from "../../../components/LayoutAdmin";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
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
  Tag,
  Select,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import CloudinaryService from "../../../service/CloudinaryService";

export default function Id({ userIds }) {
  // const [phonenumber, setPhonenumber] = useState("");
  // const [email, setImail] = useState("");
  // const [status, setStatus] = useState("");

  const [users, setUsers] = useState(userIds.data);
  const [name, setName] = useState(userIds.data.fullname);
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState(null);

  const sua = async () => {
    const URL = "http://localhost:8080/api/users/update";

    const userCu = structuredClone(users);
    const upload = await CloudinaryService.upload(users.image);
    userCu.image = upload.url;

    // userCu.images = [...category.images, ...imagePreview];

    const options = {
      method: "PUT",
      body: JSON.stringify(userCu),
      headers: {
        "Content-type": "application/json",
      },
    };
    const reponse = await fetch(URL, options);
    const datauserjson = await reponse.json();

    if (datauserjson.ok) {
      toast.success("Cap nhat thanh cong.", { position: "bottom-center" });
    } else {
      toast.error("Cap nhat thất bại.");
    }
    xulyload();
  };
  const xulyload = async () => {
    const URL = `http://localhost:8080/api/users/${users.id}`;
    const datausers = await fetch(URL);
    const datauserjson = await datausers.json();
    setUsers(datauserjson.data);
    setImagePreview(null);
  };
  const xuLyXoa = async (id) => {
    const URL = `http://localhost:8080/api/users/${id}`;
    const options = {
      method: "DELETE",
    };
    const raw = await fetch(URL, options);
    await raw.json();
    router.push("/admin/users");
  };
  const [loading, setLoading] = useState(false);

  const handleToggleStatus = async (id) => {
    const URL = `http://localhost:8080/api/users/status/${id}`;
    const data = await fetch(URL, { method: "PUT" });
    xulyload();
  };

  return (
    <LayoutAdmin>
      <div className="w-full px-[20px] bg-gray-200 flex flex-col gap-4 mb-[20px] ">
        <div className="flex items-center justify-between px-[20px]  mt-[20px] font-semibold text-[20px]">
          <div>{name}</div>
          <div className="flex gap-4 items-center">
            <div
              onClick={() => {
                xuLyXoa(users.id);
              }}
              className="text-[17px] border bg-red-400 text-white rounded px-5 py-1 cursor-pointer"
            >
              Xóa
            </div>
            <div
              onClick={sua}
              className="text-[17px] border bg-[#13F09C] text-white rounded px-3 py-1 cursor-pointer "
            >
              Cập nhật
            </div>
          </div>
        </div>

        <div className="w-full bg-white rounded flex flex-col gap-6 py-3 pb-6 px-4">
          <FormControl>
            <FormLabel>Tên người dùng</FormLabel>
            <Input
              value={users.fullname ?? ""}
              onChange={(e) => {
                const cux = structuredClone(users);
                cux.fullname = e.target.value;
                setUsers(cux);
              }}
              placeholder="Mô tả"
            />
          </FormControl>

          <div className="grid grid-cols-3 gap-4">
            <FormControl>
              <FormLabel>Số điện thoại người dùng</FormLabel>
              <Input
                value={users.phonenumber ?? ""}
                onChange={(e) => {
                  // setPhonenumber(e.target.value)
                  const userCapNhat = structuredClone(users);
                  userCapNhat.phonenumber = e.target.value;

                  setUsers(userCapNhat);
                }}
                placeholder="Mô tả"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Email người dùng</FormLabel>
              <Input
                onChange={(e) => {
                  // setPhonenumber(e.target.value)
                  const userCapNhat = structuredClone(users);
                  userCapNhat.email = e.target.value;

                  setUsers(userCapNhat);
                }}
                value={users.email ?? ""}
                placeholder="Mô tả"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Trạng thái</FormLabel>
              {/* <Input value={users.status ?? ""} placeholder="Mô tả" /> */}
              <div
                onClick={() => {
                  handleToggleStatus(users.id);
                }}
              >
                <Switch isChecked={users.status} />
              </div>
            </FormControl>
            <FormControl>
              <FormLabel>Quyền người dùng</FormLabel>
              {users.roles.map((roleuser, index) => {
                return <div key={index}>{roleuser.role}</div>;
              })}
            </FormControl>

            <FormControl>
              <FormLabel>Ảnh sản phẩm</FormLabel>
              <div className="flex gap-2">
                <label
                  onClick={() => {}}
                  htmlFor="inputanh"
                  className="h-24 w-24 border rounded flex items-center justify-center cursor-pointer select-none"
                >
                  <span className="text-[30px]">{loading ? "..." : "+"}</span>
                </label>
                <Input
                  onChange={(e) => {
                    try {
                      const file = e.target.files[0];
                      const userCapNhat = structuredClone(users);
                      userCapNhat.image = file;

                      const blobUrl = URL.createObjectURL(file);
                      setImagePreview(blobUrl);

                      setUsers(userCapNhat);
                    } catch (error) {
                      toast.error("Có lỗi xảy ra!");
                    }
                  }}
                  className="hidden"
                  id="inputanh"
                  type="file"
                />
                <div className="w-24 h-24 rounded border-2 border-green-500">
                  <img src={imagePreview ?? users.image}></img>
                </div>
              </div>
            </FormControl>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
}
export const getServerSideProps = async (context) => {
  const id = context.query.id;
  const URL = `http://localhost:8080/api/users/${id}`;
  const datausersid = await fetch(URL);
  const usersid = await datausersid.json();
  return {
    props: {
      userIds: usersid,
    },
  };
};
