import React from "react";
import LayoutAdmin from "../../../components/LayoutAdmin";
import { useState } from "react";
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
  Select,
} from "@chakra-ui/react";
import Link from "next/link";
import CloudinaryService from "../../../service/CloudinaryService";
import { AiOutlineUser } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { useSession } from "next-auth/react";
export default function Category({ categorys }) {
  console.log(categorys);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [trangThai, setTrangThai] = useState(null);

  const [description, setDescription] = useState("");
  const [name, setName] = useState("");

  const [images, setImages] = useState([]);
  const [danhMuc, setDanhMuc] = useState(categorys.data);
 

  const them = async () => {
    const anhCanUpload = images[0];
    const response = await CloudinaryService.upload(anhCanUpload);

    const categorynho = {
      description: description,
      createDate: new Date(),
      name: name,
      status: true,
      image: response.url,
    };

    const URL = "http://localhost:8080/api/category/add";
    const options = {
      method: "POST",
      body: JSON.stringify(categorynho),
      headers: {
        "Content-type": "application/json",
      },
    };
    await fetch(URL, options);

    onClose();
    xulyload();
  };

  const xulyload = async () => {
    const URL = "http://localhost:8080/api/category";
    const datacategory = await fetch(URL);
    const datacategoryjson = await datacategory.json();
    setDanhMuc(datacategoryjson.data);
  };
  const session = useSession();
  const handleSort = (type) => {
    switch (type) {
      case "name":
        const filteredData = [...danhMuc].sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setDanhMuc(filteredData);
        break;

      default:
        break;
    }
  };

  const hamUpdateStatus = async (id) => {
    const URL = `http://localhost:8080/api/category/status/${id}`;
    const data = await fetch(URL, {method: "PUT"});
    const dataStatus = await data.json();
    xulyload()
  };

  return (
    <LayoutAdmin>
      <div className=" flex flex-col gap-2">
        <div className="flex items-center justify-between px-[15px] mt-[30px]">
          <div className="font-medium text-[20px]">Category</div>
          <Button
            bg="blue.400"
            color="white"
            _hover={{ bg: "blue.400" }}
            onClick={() => {
              onOpen()
            }}
          >
            Thêm category
          </Button>
        </div>
        <Modal isOpen={isOpen} onClose={onClose} size="4xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Thêm category</ModalHeader>
            <ModalCloseButton />
            <ModalBody className="grid grid-cols-1 gap-4">
              <div>
                <FormLabel>Tên category</FormLabel>
                <Input
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  placeholder="Tên category"
                />
              </div>

              <FormControl>
                <Flex justify="space-between">
                  <FormLabel>Mô tả category</FormLabel>
                  <Switch defaultChecked />
                </Flex>
                <Textarea
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  minH={100}
                  placeholder="Mô tả"
                />
              </FormControl>
              <div>
                <FormLabel>Ảnh category</FormLabel>
                <div className="flex gap-1 flex-wrap">
                  <label
                    htmlFor="inputanh"
                    className="h-24 w-24 border rounded flex items-center justify-center cursor-pointer select-none"
                  >
                    <span className="text-[30px]">+</span>
                  </label>
                  {images.map((image, key) => {
                    const url = URL.createObjectURL(image);

                    return (
                      <div
                        className="h-24 w-24 border rounded relative"
                        key={key}
                      >
                        <img
                          className="bg-white w-full h-full object-cover rounded "
                          src={url}
                          alt={key}
                        />
                        <div
                          onClick={() => {
                            const ketQua = images.filter((item) => {
                              return item.name != image.name;
                            });
                            setImages(ketQua);
                          }}
                          className="absolute top-1 right-1"
                        >
                          X
                        </div>
                      </div>
                    );
                  })}
                </div>

                <Input
                  // multiple
                  id="inputanh"
                  className="hidden"
                  onChange={(e) => {
                    const files = e.target.files;
                    setImages(Array.from(files));
                  }}
                  type="file"
                  placeholder="Image"
                />
              </div>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Đóng
              </Button>
              <Button onClick={them} variant="ghost">
                Lưu
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <div className="px-[15px]">
          <div className=" border bg-gray-50 flex flex-col gap-6 py-8 px-2 mt-[20px] rounded-[8px]">
            <div className="flex gap-10 ">
              <div
                onClick={() => {
                  setTrangThai(null);
                }}
                className={`${
                  trangThai === null ? "border-b-4 border-green-800" : ""
                } text-[14px] pb-3 `}
              >
                Tất cả
              </div>
              <div
                onClick={() => {
                  setTrangThai(true);
                }}
                className={`${
                  trangThai ? "border-b-4 border-green-800" : ""
                } text-[14px] pb-3 `}
              >
                Đang hoạt động
              </div>
              <div
                onClick={() => {
                  setTrangThai(false);
                }}
                className={`${
                  trangThai === false ? "border-b-4 border-green-800" : ""
                } text-[14px] pb-3 `}
              >
                Ngừng hoạt động
              </div>
            </div>
            <div className="relative flex w-full items-center gap-[20px]">
              <input
                className="flex-1 pl-[30px] h-[35px]  text-[14px] border border-gray-300 font-medium rounded"
                placeholder="Lọc sản phẩm...."
              ></input>
              <BsSearch className="absolute pl-2 top-2 text-[20px] "></BsSearch>
              <div className="flex gap-[10px]">
                <div class="flex divide-x bg-white  border-gray-300 ">
                  {session?.data?.user ? (
                    <div>
                      <Select
                        onChange={(e) => {
                          handleSort(e.target.value);
                        }}
                        className="w-36"
                        placeholder="Sắp xếp"
                      >
                        <option defaultChecked value="name">
                          Sắp xếp theo tên
                        </option>
                      </Select>
                    </div>
                  ) : (
                    <div>
                      <AiOutlineUser></AiOutlineUser>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <TableContainer>
              <Table className="bg-gray-50">
                <Thead>
                  <Tr>
                    <Th>Id Category </Th>
                    <Th>Ảnh Category</Th>
                    <Th>Tên Category</Th>
                    <Th>Trạng thái</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {danhMuc.map((category, index) => {
                    const dieuKien =
                      trangThai === null || category.status == trangThai;

                    return (
                      dieuKien && (
                        <Tr key={index}>
                          <Td>
                            <div>
                              <div>{category.id}</div>
                            </div>
                          </Td>
                          <Td>
                            <img
                              className="w-12 h-12 rounded object-cover"
                              src={category.image}
                            ></img>
                          </Td>
                          <Td>
                            <Link href={`/admin/category/${category.id}`}>
                              {category.name}
                            </Link>
                          </Td>
                          <Td>
                            <div onClick={(() => {
                              hamUpdateStatus(category.id)
                            })}>

                            <Switch isChecked={category.status} />
                            </div>
                          </Td>
                        </Tr>
                      )
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
      <div></div>
    </LayoutAdmin>
  );
}
export const getServerSideProps = async () => {
  const URL = "http://localhost:8080/api/category";
  const category = await fetch(URL);
  const categorydata = await category.json();

  return {
    props: {
      categorys: categorydata,
    },
  };
};
