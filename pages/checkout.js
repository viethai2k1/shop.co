import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { AiOutlineCheck } from "react-icons/ai";
import { BsArrowReturnLeft, BsCash } from "react-icons/bs";
import Link from "next/link";
import { GrDocumentTransfer } from "react-icons/gr";
import { MdPayment } from "react-icons/md";
import { getToken } from "next-auth/jwt";
import { useSession } from "next-auth/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Flex,
  Toast,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Checkout({ data, dvhc }) {
  const session = useSession();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [cart, setCart] = useState(data);
  const sumPrice = cart?.data?.cartItem.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);
  const xulyload = async (id) => {
    const URL = `http://localhost:8080/api/cart/${id}`;
    const datareviews = await fetch(URL);
    const datareviewsjson = await datareviews.json();
    setCart(datareviewsjson);
  };
  const updateCart = async (quantity, productId) => {
    const id = session?.data?.user?.id;
    const payload = {
      userId: id,
      items: [
        {
          productId: productId,
          quantity: quantity,
        },
      ],
    };
    const URL = "http://localhost:8080/api/cart/add";
    const option = {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json",
      },
    };
    const response = await fetch(URL, option);
    const result = await response.json();
    xulyload(id);
  };

  const [quanHuyen, setQuanHuyen] = useState();
  const [xaPhuong, setXaPhuong] = useState();

  const [level1, setLevel1] = useState("");
  const [level2, setLevel2] = useState("");
  const [level3, setLevel3] = useState("");
  const [level4, setLevel4] = useState("");
  const [note, setNote] = useState("");

  const capNhatQuanHuyen = (tinhThanh) => {
    const find = dvhc.data.find((item) => item.name === tinhThanh);
    setLevel1(tinhThanh);
    setQuanHuyen(find);
    setXaPhuong({});
  };

  const capNhatXaPhuong = (qh) => {
    const find = quanHuyen?.level2s?.find((item) => item.name === qh);
    setXaPhuong(find);
    setLevel2(qh);
  };

  const placeOrder = async () => {
    const products = cart.data.cartItem.map((item) => {
      return {
        productId: item.product.id,
        discount: item.product.discount,
        name: item.product.name,
        image: item.product.images.length > 0 ? item.product.images[0].url : "",
        price: item.product.price,
        rate: item.product.rate,
        quantity: item.quantity,
        totalRate: item.product.totalRate,
      };
    });
    const payload = {
      createDate: new Date(),
      totalprice: sumPrice,
      lv1: level1,
      lv2: level2,
      lv3: level3,
      lv4: level4,
      status: paymentType,
      userEntity: {
        id: session?.data?.user?.id,
      },
      products: products,
    };

    const URL = "http://localhost:8080/api/orders/add";
    const options = {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json",
      },
    };
    const data = await fetch(URL, options);
    const checkout = await data.json();
    if (checkout.ok) {
      toast.success("Đặt hàng thành công.");
      router.push("/orders");
      products.forEach(async (product) => {
        await updateCart(0, product.productId);
      });
    } else {
      toast.error("Chưa thanh toán được!");
    }
   
  };

  const [paymentType, setPaymentType] = useState(1);

  return (
    <Layout>
      <div className="flex w-[1180px] mx-auto pb-6">
        <div className="w-[160px] bg-gray-100">
          <div className="flex flex-col ">
            <div className="flex flex-col justify-center items-center gap-2 mt-[20px]">
              <div className="w-[50px] h-[50px] rounded-[200px] bg-[#1CDFCB] relative">
                <AiOutlineCheck className="absolute top-3 right-3 text-[25px] text-[white]"></AiOutlineCheck>
              </div>
              <div className="text-[13px] font-bold">Shoping</div>
              <div className=" text-[#1CDFCB]">|</div>
            </div>

            <div className="flex flex-col justify-center items-center gap-2 mt-[20px]">
              <div className="w-[50px] h-[50px] rounded-[200px] bg-[#1CDFCB] relative">
                <AiOutlineCheck className="absolute top-3 right-3 text-[25px] text-[white]"></AiOutlineCheck>
              </div>
              <div className="text-[14px] font-bold">Personal Detaill</div>
              <div className=" text-[#1CDFCB]">|</div>
            </div>

            <div className="flex flex-col justify-center items-center gap-2 mt-[20px]">
              <div className="w-[50px] h-[50px] rounded-[200px] bg-[#6B48FF] relative">
                <div className="absolute top-[6px] right-[17px] text-[25px] text-[white]">
                  3
                </div>
              </div>
              <div className="text-[14px] font-bold">Payment</div>
              <div className=" text-[#1CDFCB]">|</div>
            </div>

            <div className="flex flex-col justify-center items-center gap-2 mt-[20px]">
              <div className="w-[50px] h-[50px] rounded-[200px] bg-gray-200 relative">
                <div className="absolute top-1 right-5 text-[25px] text-gray-500">
                  4
                </div>
              </div>
              <div className="text-[14px] font-bold">Review</div>
            </div>
          </div>
        </div>
        <div className="w-[720px] px-[60px]  py-8">
          <div className="flex flex-col gap-4">
            <div className="text-[45px] mt-[20px] mb-[20px] font-medium">
              Payment
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label>Tỉnh thành</label>
                <select
                  className="h-[35px] rounded pl-2 bg-gray-100"
                  onChange={(e) => {
                    capNhatQuanHuyen(e.target.value);
                  }}
                >
                  <option selected>Chọn tỉnh thành</option>
                  {dvhc.data.map((tinhThanh) => {
                    return <option key={tinhThanh.id}>{tinhThanh.name}</option>;
                  })}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label>Quận/ huyện</label>
                <select
                  className="h-[35px] rounded pl-2 bg-gray-100"
                  onChange={(e) => {
                    capNhatXaPhuong(e.target.value);
                  }}
                  value={level2}
                >
                  <option selected>Chọn quận huyện</option>
                  {quanHuyen?.level2s?.map((quanhuyen, index) => {
                    return <option key={quanhuyen.id}>{quanhuyen.name}</option>;
                  })}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label>Xã/ phường</label>
                <select
                  className="h-[35px] rounded pl-2 bg-gray-100"
                  onChange={(e) => {
                    setLevel3(e.target.value);
                  }}
                  value={level3}
                >
                  <option selected>Chọn xã phường</option>
                  {xaPhuong?.level3s?.map((xaPhuong) => {
                    return (
                      <option value={xaPhuong.id} key={xaPhuong.id}>
                        {xaPhuong.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label>Địa chỉ số nhà</label>
                <input
                  className="h-[35px] rounded pl-2 bg-gray-100"
                  value={level4}
                  onChange={(e) => {
                    setLevel4(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label>Ghi chú</label>
              <textarea
                value={note}
                onChange={(e) => {
                  setNote(e.target.value);
                }}
                style={{ minHeight: 200, padding: 12 }}
                className="rounded pl-2 bg-gray-100"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label>Hình thức thanh toán</label>
              <div className="grid grid-cols-2 gap-4 mt-[10px]">
                <button
                  onClick={() => {
                    setPaymentType(1);
                  }}
                  style={{
                    border: paymentType == 1 ? "1px solid black" : "none",
                  }}
                  className="bg-gray-100 h-[80px] px-[10px] rounded flex flex-col gap-2 justify-center items-center"
                >
                  <BsCash className="w-[30px] h-[30px]"></BsCash>
                  <div className="text-[14px]">Thanh toán khi nhận hàng</div>
                </button>
                <button
                  onClick={() => {
                    setPaymentType(2);
                    onOpen();
                  }}
                  className={`bg-gray-100 h-[80px] rounded flex flex-col gap-2 justify-center items-center ${
                    paymentType == 2 ? "border border-black" : ""
                  }`}
                >
                  <MdPayment className="w-[30px] h-[30px]"></MdPayment>
                  <div className="text-[14px]">Chuyển khoản</div>
                </button>
                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Vui lòng thanh toán</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <img
                        src={`https://img.vietqr.io/image/BIDV-4510802391-compact2.png?amount=${
                          sumPrice * 24550
                        }&accountName=Dinh%20Viet%20Hai`}
                      />
                    </ModalBody>

                    <ModalFooter>
                      <Button colorScheme="green" onClick={onClose}>
                        Đã thanh toán
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </div>
            </div>
          </div>
          <Flex
            alignItems="center"
            gap={4}
            mt={4}
            justifyContent={"space-between"}
          >
            <Link href={"http://localhost:3000/cart"}>
              <button className="flex items-center gap-2 mt-[20px]">
                <BsArrowReturnLeft></BsArrowReturnLeft>
                <div>Back</div>
              </button>
            </Link>
            <Button onClick={placeOrder}>Đặt hàng</Button>
          </Flex>
        </div>
        <div className="w-[300px] bg-gray-100 px-[15px]">
          <div className="flex flex-col gap-2 ">
            <div className="pb-2 border-b-[2px] flex items-center justify-between">
              <div className="text-[18px] mt-2 font-medium">Order</div>
              <div className="text-[18px] mt-2 font-medium">${sumPrice}</div>
            </div>
            {cart.data.cartItem.map((itemCart, index) => {
              return (
                <div
                  key={index}
                  className="flex justify-between gap-4 border-b-2 mt-[10px]"
                >
                  <div className="w-[70px] h-[70px] rounded bg-gray-200 flex items-center justify-center">
                    <img
                      className="w-[50px] h-[50px]"
                      src={itemCart?.product?.images[0].url}
                    ></img>
                  </div>
                  <div>
                    <div className="text-[14px] font-semibold">
                      {itemCart.product.name}
                    </div>
                    <div className="text-[14px]">
                      Đánh giá: {itemCart.product.rate}
                    </div>
                    <button
                      onClick={() => {
                        updateCart(0, itemCart.product.id);
                      }}
                      className="text-red-500 text-[14px] font-bold"
                    >
                      REMOVE
                    </button>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="w-[35px] h-[35px] flex justify-center items-center rounded bg-[white]">
                      {itemCart.quantity}
                    </div>
                    <div className="mb-5 font-bold">
                      ${itemCart.product.price}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
export const getServerSideProps = async (ctx) => {
  const session = await getToken({ req: ctx.req });
  if (!session) {
    return {
      props: {
        data: {
          ok: false,
          data: [],
        },
      },
    };
  }
  const userId = session.id;
  //goi API O DAY
  const URL = `http://localhost:8080/api/cart/${userId}`;
  const URL_DVCH = `http://localhost:3000/api/dvhc`;
  const dataCart = await fetch(URL);
  const cartdata = await dataCart.json();
  return {
    props: {
      data: cartdata,
      dvhc: await fetch(URL_DVCH).then((res) => res.json()),
    },
  };
};
