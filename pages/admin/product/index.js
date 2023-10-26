/* eslint-disable @next/next/no-img-element */
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
  Tag,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import {
  AiFillCaretDown,
  AiFillCaretUp,
  AiOutlineDown,
  AiOutlineUser,
} from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import LayoutAdmin from "../../../components/LayoutAdmin";

import Link from "next/link";
import { useState } from "react";
import CloudinaryService from "../../../service/CloudinaryService";
import { useDebounce } from "use-debounce";
import { signOut, useSession } from "next-auth/react";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
export default function Product({ sanphams, categorys }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [categorySelect, setCategorySelect] = useState([]);
  const [images, setImages] = useState([]);
  const [trangThai, setTrangThai] = useState(null);
  const [input, setInput] = useState("");

  const [query, setQuery] = useState("");
  const [queryDebounce] = useDebounce(query, 500);

  const [products, setProducts] = useState(sanphams.data);
  const session = useSession();

  const handleSort = (type) => {
    switch (type) {
      case "name":
        const filteredData = [...products].sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setProducts(filteredData);
        break;
      case "date":
        const filter = [...products].sort((a, b) => a.price - b.price);
        setProducts(filter);
        break;

      default:
        break;
    }
  };



  const them = async () => {
    const listAnhUpload = [];

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const response = await CloudinaryService.upload(image);

      listAnhUpload.push({
        name: response.original_filename,
        url: response.url,
      });
    }

    const sanphamnho = {
      description: description,
      discount: discount,
      createDate: new Date(),
      name: name,
      price: price,
      quantity: quantity,
      status: true,
      categories: categorySelect,
      images: listAnhUpload,
    };

    const URL = "http://localhost:8080/api/products/add";
    const options = {
      method: "POST",
      body: JSON.stringify(sanphamnho),
      headers: {
        "Content-type": "application/json",
      },
    };
    await fetch(URL, options);

    onClose();
    xulyload();
  };

  useEffect(() => {
    const goiAPI = async () => {
      const URL = `http://localhost:8080/api/products/search?query=${query}`;
      const response = await fetch(URL);
      const data = await response.json();
      setProducts(data.data);
    };

    goiAPI();
  }, [queryDebounce]);

  const xulyload = async () => {
    const URL = "http://localhost:8080/api/products";
    const dataproduct = await fetch(URL);
    const dataproductjson = await dataproduct.json();
    setProducts(dataproductjson.data);
  };

  const handleUpdateStatus = async (id) => {
    const URL = `http://localhost:8080/api/products/status/${id}`;
    const response = await fetch(URL, { method: "PUT" });
    xulyload();
  };

  return (
    <LayoutAdmin>
      <div className=" flex flex-col gap-2">
        <div className="flex items-center justify-between px-[15px] mt-[30px]">
          <div className="font-medium text-[20px]">Sản phẩm</div>
          <Button
            bg="blue.400"
            color="white"
            _hover={{ bg: "blue.400" }}
            onClick={() => {
              onOpen();
              setName("");
              setPrice("");
              setQuantity("");
              setDiscount("")
              setDescription("")
            }}
          >
            Thêm sản phẩm
          </Button>
        </div>
        <Modal isOpen={isOpen} onClose={onClose} size="4xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Thêm sản phẩm</ModalHeader>
            <ModalCloseButton />
            <ModalBody className="grid grid-cols-2 gap-4">
              <Input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="Tên sản phẩm"
              />
              <Input
                value={quantity}
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
                placeholder="Số lượng sản phẩm"
              />
              <Input
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                type="number"
                placeholder="Giá sản phẩm"
              />
              <Input
                value={discount}
                onChange={(e) => {
                  setDiscount(e.target.value);
                }}
                placeholder="Giảm giá"
              />
              <div className="col-span-2 relative">
                <Select
                  value={category}
                  onChange={(e) => {
                    const categoryObject = JSON.parse(e.target.value);
                    setCategory(e.target.value);

                    const locKhongTrung = categorySelect.filter(
                      (category) => category.id != categoryObject.id
                    );
                    setCategorySelect([...locKhongTrung, categoryObject]);
                  }}
                  placeholder="Chọn danh mục"
                >
                  {categorys.data.map((category) => {
                    return (
                      <option
                        key={category.id}
                        value={JSON.stringify(category)}
                      >
                        {category.name}
                      </option>
                    );
                  })}
                </Select>
                <div className="absolute right-1 top-1/2 -translate-y-1/2 flex gap-2">
                  {categorySelect.map((category) => {
                    return (
                      <Tag
                        key={category.id}
                        colorScheme="green"
                        className="relative cursor-pointer"
                        onClick={() => {
                          const ketQua = categorySelect.filter((item) => {
                            return item.id != category.id;
                          });
                          setCategorySelect(ketQua);
                          //     alert(category.id);
                        }}
                      >
                        {category.name}
                      </Tag>
                    );
                  })}
                </div>
              </div>
              <FormControl>
                <Flex justify="space-between">
                  <FormLabel>Mô tả sản phẩm</FormLabel>
                  <Switch defaultChecked />
                </Flex>
                <Textarea
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  minH={170}
                  placeholder="Mô tả"
                />
              </FormControl>
              <div>
                <FormLabel>Ảnh sản phẩm</FormLabel>
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
                  multiple
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
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
                className="flex-1 pl-[30px] h-[35px]  text-[14px] font-medium rounded border"
                placeholder="Lọc sản phẩm...."
              ></input>
              <BsSearch className="absolute pl-2 top-2 text-[20px] "></BsSearch>
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
                    <option value="date">Sắp xếp theo giá</option>
                  </Select>
                </div>
              ) : (
                <div>
                  <AiOutlineUser></AiOutlineUser>
                </div>
              )}
            </div>
            <TableContainer>
              <Table className="bg-gray-50">
               
                <Thead>
                  <Tr>
                    <Th>Ảnh sản phẩm</Th>
                    <Th>Tên sản phẩm</Th>
                    <Th>Giá sản phẩm</Th>
                    <Th>Số lượng</Th>
                    <Th>Trạng thái </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {products.map((data, index) => {
                    const dieuKien =
                      trangThai === null || data.status == trangThai;

                    return (
                      dieuKien && (
                        <Tr key={index}>
                          <Td>
                            <img
                              className="min-w-12 h-12 aspect-square rounded"
                              src={data?.images[0]?.url}
                            />
                          </Td>
                          <Td>
                            <Link
                              href={`/admin/product/${data.id}`}
                              className="flex justify-between "
                            >
                              {data.name}
                            </Link>
                          </Td>
                          <Td>${data.price}</Td>
                          <Td className="text-xs">
                            Còn {data.quantity} trong kho
                          </Td>
                          <Td>
                            <div
                              onClick={() => {
                                handleUpdateStatus(data.id);
                              }}
                            >
                              <Switch isChecked={data.status} />
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
    </LayoutAdmin>
  );
}
export const getServerSideProps = async () => {
  const URL = "http://localhost:8080/api/products";
  const dataproducts = await fetch(URL);
  const productsdata = await dataproducts.json();

  const URLCategory = "http://localhost:8080/api/category";
  const dataCategorys = await fetch(URLCategory);
  const categorys = await dataCategorys.json();

  return {
    props: {
      sanphams: productsdata,
      categorys: categorys,
    },
  };
};
