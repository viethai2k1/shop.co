/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
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

export default function ProductDetail({ productIds, dataCategory }) {
  const [categories, setCategories] = useState(productIds?.data?.categories);
  const [product, setProduct] = useState(productIds.data);
  const [name, setName] = useState(productIds.data.name);
  const [fieldNameError, setFieldNameError] = useState(false);
  const router = useRouter();

  const sua = async () => {
    if(!product.name){
      setFieldNameError(true);
      return;
    }else{
      setFieldNameError(false);
    }
    const URL = "http://localhost:8080/api/products/update";

    const productCu = structuredClone(product);
    productCu.images = [...product.images, ...imagePreview];
    productCu.categories = categories;

    const options = {
      method: "PUT",
      body: JSON.stringify(productCu),
      headers: {
        "Content-type": "application/json",
      },
    };
    const response = await fetch(URL, options);
    response.json().then((data) => {
      if (data.ok) {
        toast.success("Cap nhat thanh cong.", { position: "bottom-center" });
        xulyload();
      } else {
        toast.error("Cap nhat that bai.");
      }
    });
  };
  const xulyload = async () => {
    const URL = `http://localhost:8080/api/products/${product.id}`;
    const dataproduct = await fetch(URL);
    const dataproductjson = await dataproduct.json();

    setProduct(dataproductjson.data);
    setName(dataproductjson.data.name);
    setImagePreview([]);
  };

  const xuLyXoa = async (id) => {
    const URL = `http://localhost:8080/api/products/${id}`;
    const options = {
      method: "DELETE",
    };
    const raw = await fetch(URL, options);
    await raw.json();
    router.push("/admin/product");
  };

  const [imagePreview, setImagePreview] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleRemoveCategory = (category) => {
    const filter = categories.filter(item => item.id != category.id);
    setCategories(filter);
  };

  return (
    <LayoutAdmin>
      <div className="w-full px-[20px] bg-gray-200 flex flex-col gap-4 ">
        <div className="flex items-center justify-between px-[20px]  mt-[20px] font-semibold text-[20px]">
          <div>{name}</div>
          <div className="flex gap-4  items-center">
            <button
              className="text-[17px] border bg-red-400 text-white rounded px-5 py-1"
              onClick={() => {
                xuLyXoa(product.id);
              }}
            >
              Xóa
            </button>
            <button
              className="text-[17px] border bg-[#13F09C] text-white rounded px-3 py-1 "
              onClick={sua}
            >
              Cập nhật
            </button>
          </div>
        </div>

        <div className="w-full bg-white rounded flex flex-col gap-6 py-3 pb-6 px-4">
          <FormControl>
            <FormLabel>Tên sản phẩm</FormLabel>
            <Input
              value={product.name ?? ""}
              onChange={(e) => {
                const cux = structuredClone(product);
                cux.name = e.target.value;
                setProduct(cux);
              }}
              style={{borderColor: fieldNameError ? "red" : ""}}
              placeholder="Mô tả"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Mô tả sản phẩm</FormLabel>
            <Textarea
              spellCheck={false}
              value={product.description ?? ""}
              // onChange={(e) => {
              //   setDescription(e.target.value);
              // }}
              onChange={(e) => {
                const productCapNhat = structuredClone(product);
                productCapNhat.description = e.target.value;

                setProduct(productCapNhat);
              }}
              minH={300}
              placeholder="Mô tả"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Ảnh sản phẩm</FormLabel>
            <div className="flex gap-2">
              {product.images.map((image, index) => {
                return (
                  <div key={index} className="w-24 h-24 rounded relative">
                    <img className="w-24 h-24 rounded" src={image.url}></img>
                    <div
                      className="absolute top-1 right-2 cursor-pointer"
                      onClick={() => {
                        const productCu = structuredClone(product);
                        productCu.images = productCu.images.filter(
                          (item) => item.url !== image.url
                        );

                        setProduct(productCu);
                      }}
                    >
                      x
                    </div>
                  </div>
                );
              })}
              {imagePreview.map((image, index) => {
                return (
                  <div
                    className="w-24 h-24 rounded border-2 border-green-500"
                    key={index}
                  >
                    <img
                      className="w-full h-full object-cover"
                      src={image.url}
                    ></img>
                  </div>
                );
              })}
              <label
                onClick={() => {}}
                htmlFor="inputanh"
                className="h-24 w-24 border rounded flex items-center justify-center cursor-pointer select-none"
              >
                <span className="text-[30px]">{loading ? "..." : "+"}</span>
              </label>
              <Input
                multiple
                onChange={async (e) => {
                  setLoading(true);
                  const files = e.target.files;
                  const output = [];
                  for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    const uploadData = await CloudinaryService.upload(file);
                    output.push({
                      name: uploadData.original_filename,
                      url: uploadData.url,
                    });
                  }
                  setLoading(false);

                  setImagePreview(output);
                }}
                className="hidden"
                id="inputanh"
                type="file"
              />
            </div>
          </FormControl>

          <FormControl>
            <div className="flex items-center mb-2 gap-2">
              <div className="font-semibold mr-4">Danh mục sản phẩm</div>
              {categories.map((category, index) => {
                return (
                  <Tag
                    onClick={() => {
                      handleRemoveCategory(category);
                    }}
                    colorScheme="green"
                    key={index}
                    className="cursor-pointer"
                  >
                    {category.name}
                  </Tag>
                );
              })}
            </div>
            <Select
              placeholder="Chọn danh mục"
              onChange={(e) => {
                const data = JSON.parse(e.target.value);
                setCategories([...categories, data]);
              }}
            >
              {dataCategory.data.map((category) => (
                <option key={category.id} value={JSON.stringify(category)}>
                  {category.name}
                </option>
              ))}
            </Select>
          </FormControl>

          <div className="grid grid-cols-4 gap-4">
            <FormControl>
              <FormLabel>Giá</FormLabel>
              <Input
                value={product.price ?? ""}
                onChange={(e) => {
                  const productCapNhat = structuredClone(product);
                  productCapNhat.price = e.target.value;

                  setProduct(productCapNhat);
                }}
                placeholder="Mô tả"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Giảm giá</FormLabel>
              <Input
                value={product.discount ?? ""}
                onChange={(e) => {
                  const productCapNhat = structuredClone(product);
                  productCapNhat.discount = e.target.value;

                  setProduct(productCapNhat);
                }}
                placeholder="Mô tả"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Số lượng</FormLabel>
              <Input
                value={product.quantity ?? ""}
                onChange={(e) => {
                  const productCapNhat = structuredClone(product);
                  productCapNhat.quantity = e.target.value;

                  setProduct(productCapNhat);
                }}
                placeholder="Mô tả"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Đã bán</FormLabel>
              <Input
                value={product.sold ?? ""}
                onChange={(e) => {
                  const productCapNhat = structuredClone(product);
                  productCapNhat.sold = e.target.value;

                  setProduct(productCapNhat);
                }}
                placeholder="Mô tả"
              />
            </FormControl>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
}


export const getServerSideProps = async (context) => {
  const id = context.query.id;
  const URL = `http://localhost:8080/api/products/${id}`;
  const dataproductid = await fetch(URL);
  const productId = await dataproductid.json();

  const cagegoryURL = `http://localhost:8080/api/category`;
  const dataCategoryRaw = await fetch(cagegoryURL);
  const dataCategory = await dataCategoryRaw.json();

  return {
    props: {
      productIds: productId,
      dataCategory: dataCategory,
    },
  };
};
