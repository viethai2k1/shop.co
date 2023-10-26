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
export default function CategoryDetail({ categoryid }) {
  const [categories, setCategories] = useState(categoryid?.data?.categories);
  const [category, setCategory] = useState(categoryid.data);
  const [name, setName] = useState(categoryid.data.name);
  const router = useRouter();
  const sua = async () => {
    const URL = "http://localhost:8080/api/category/update";

    const categoryCu = structuredClone(category);
    const upload = await CloudinaryService.upload(category.image);
    categoryCu.image = upload.url;

    const options = {
      method: "PUT",
      body: JSON.stringify(categoryCu),
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
    const URL = `http://localhost:8080/api/category/${category.id}`;
    const dataproduct = await fetch(URL);
    const dataproductjson = await dataproduct.json();
    setCategory(dataproductjson.data);
    setImagePreview(null);
  };

  const xuLyXoa = async (id) => {
    const URL = `http://localhost:8080/api/category/${id}`;
    const options = {
      method: "DELETE",
    };
    const raw = await fetch(URL, options);
    await raw.json();
    router.push("/admin/category");
  };
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  return (
    <div>
      <LayoutAdmin>
        <div className="w-full px-[20px] bg-gray-200 flex flex-col gap-4 mb-[20px] ">
          <div className="flex items-center justify-between px-[20px]  mt-[20px] font-semibold text-[20px]">
            <div>{name}</div>
            <div className="flex gap-4 items-center">
              <div
                onClick={() => {
                  xuLyXoa(category.id);
                }}
                className="text-[17px] border bg-red-400 text-white rounded px-5 py-1 cursor-pointer "
              >
                Xóa
              </div>
              <div
                onClick={() => {
                  sua();
                }}
                className="text-[17px] border bg-[#13F09C] text-white rounded px-3 py-1 cursor-pointer "
              >
                Cập nhật
              </div>
            </div>
          </div>

          <div className="w-full bg-white rounded flex flex-col gap-6 py-3 pb-6 px-4">
            <FormControl>
              <FormLabel>Tên sản phẩm</FormLabel>
              <Input
                value={category.name ?? ""}
                onChange={(e) => {
                  const cux = structuredClone(category);
                  cux.name = e.target.value;
                  setCategory(cux);
                }}
                placeholder="Mô tả"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Mô tả sản phẩm</FormLabel>
              <Textarea
                spellCheck={false}
                value={category.description ?? ""}
                onChange={(e) => {
                  const value = e.target.value;
                  const categoryCopy = structuredClone(category);
                  categoryCopy.description = value
                  setCategory(categoryCopy);
                }}
                minH={300}
                placeholder="Mô tả"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Ảnh sản phẩm</FormLabel>
              <div className="flex gap-2">
                <label
                  onClick={() => {
                  }}
                  htmlFor="inputanh"
                  className="h-24 w-24 border rounded flex items-center justify-center cursor-pointer select-none"
                >
                  <span className="text-[30px]">{loading ? "..." : "+"}</span>
                </label>
                
                <Input
                  onChange={(e) => {
                    try {
                      const file = e.target.files[0];
                      const categoryCapNhat = structuredClone(category);
                      categoryCapNhat.image = file;

                      const blobUrl = URL.createObjectURL(file);
                      setImagePreview(blobUrl);

                      setCategory(categoryCapNhat);
                    } catch (error) {
                      toast.error("Có lỗi xảy ra!");
                    }
                  }}
                  className="hidden"
                  id="inputanh"
                  type="file"
                />
                <div className="w-24 h-24 rounded border-2 border-green-500">
                  <img src={imagePreview ?? category.image}></img>
                </div>
              </div>
            </FormControl>
            
          </div>
        </div>
      </LayoutAdmin>
    </div>
  );
}
export const getServerSideProps = async (context) => {
  const id = context.query.id;
  const URL = `http://localhost:8080/api/category/${id}`;
  const datacategoryid = await fetch(URL);
  const categoryid = await datacategoryid.json();
  return {
    props: {
      categoryid: categoryid,
    },
  };
};
