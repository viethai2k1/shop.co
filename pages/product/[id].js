import { useState } from "react";
// import Layout from "../components/Layout";
import Layout from "../../components/Layout";

import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { AiOutlineUser } from "react-icons/ai";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

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
} from "@chakra-ui/react";
import {
  AiOutlineRight,
  AiFillStar,
  AiOutlineFilter,
  AiOutlineDown,
} from "react-icons/ai";
import Comment from "../../components/Comment";
import Link from "next/link";
import { Tab, TabList, Tabs, TabPanels, TabPanel } from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import { FaStar } from "react-icons/fa";
import { BsStar, BsStarHalf } from "react-icons/bs";
import { toast } from "react-toastify";

export default function Product({ productIds, reviews }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [review, setReview] = useState("");
  const [rate, setRate] = useState("");
  const [showAllReviews, setShowAllReviews] = useState(false);

  const [thayDoi, setThayDoi] = useState("AiOutlineFilter");
  const [thayDoiSize, setThayDoiSize] = useState("Small");
  const [anhDaiDien, setAnhDaiDien] = useState(productIds.data.images[0].url);
  const [reviewState, setReviewState] = useState(reviews);
  const session = useSession();

  const [thayDoiSoLuong, setThayDoiSoLuong] = useState(1);
  const hamTang = () => {
    setThayDoiSoLuong(thayDoiSoLuong + 1);
  };
  const hamGiam = () => {
    if (thayDoiSoLuong <= 1) {
      setThayDoiSoLuong(1);
    } else {
      setThayDoiSoLuong(thayDoiSoLuong - 1);
    }
  };
  const [thayDoiColor, setThayDoiColor] = useState("#4E4631");

  const showAdminButton = session?.data?.user?.roles?.some(
    (role) => role.role == ""
  );

  const them = async () => {
    const hamThemReview = {
      review: review,
      rate: rate,
      status: false,
      productId: productIds.data.id,
      userId: session.data.user.id,
    };
    const URL = "http://localhost:8080/api/reviews/add";
    const options = {
      method: "POST",
      body: JSON.stringify(hamThemReview),
      headers: {
        "Content-type": "application/json",
      },
    };
    await fetch(URL, options);
    onClose();
    xulyload();
  };
  const xulyload = async () => {
    const URL = `http://localhost:8080/api/reviews/product/${productIds.data.id}`;
    const datareviews = await fetch(URL);
    const datareviewsjson = await datareviews.json();
    setReviewState(datareviewsjson);
  };

  const tinhTong = reviewState.data.reduce((a, b) => a + Number(b.rate), 0);
  const ketQua =
    productIds.data.price -
    (productIds.data.price * productIds.data.discount) / 100;

  const addToCart = async () => {
    const payload = {
      userId: session.data.user.id,
      items: [
        {
          productId: productIds.data.id,
          quantity: thayDoiSoLuong,
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
    if(result.ok){
      toast.success("Sản phẩm đã thêm vào giỏ hàng.")
    }else{
      toast.error("Có lỗi xảy ra!")
    }
  };
  return (
    <Layout>
      <div className="w-[1180px] mx-auto flex gap-2 text-[12px] text-[gray] py-[20px]">
        <div className="flex items-center gap-1">
          <Link href={"http://localhost:3000/"}>Home</Link>
          <AiOutlineRight></AiOutlineRight>
        </div>
        <div className="flex items-center gap-1">
          <div>Shop</div>
          <AiOutlineRight></AiOutlineRight>
        </div>
        <div className="flex items-center gap-1">
          <div>Men</div>
          <AiOutlineRight></AiOutlineRight>
        </div>
        <div>t-Shirts</div>
      </div>
      <div className="grid grid-cols-2 gap-[150px] w-[1180px] mx-auto">
        <div className="grid grid-cols-2 gap-2 w-[220px]">
          <div className="flex flex-col gap-2">
            {productIds.data.images.map((productId, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    setAnhDaiDien(productId.url);
                  }}
                  className="w-[100px] h-[100px] bg-[#F0EFED] flex justify-center items-center rounded-[10px]"
                >
                  <img className="w-[80px]" src={productId.url}></img>
                </div>
              );
            })}
          </div>
          <div>
            <div className="w-[430px] h-[430px] bg-[#F0EFED] flex justify-center items-center rounded-[10px]">
              <img className="w-[350px]" src={anhDaiDien}></img>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="text-[35px] font-semibold">
            {productIds.data.name}
          </div>
          <div className="flex gap-2 items-center ">
            <div className="flex gap-1 text-orange-400 text-[20px]">
              <Star rate={tinhTong / reviewState.data.length} />
            </div>
            <div className="text-[13px] text-gray-400">
              {Math.round((tinhTong / reviewState.data.length) * 10) / 10}/{reviewState.data.length}
            </div>
          </div>
          {productIds.data.discount > 0 ? (
            <div className="flex items-center gap-3">
              <div className="text-[26px] font-semibold">${ketQua}</div>
              <del className="text-[26px] text-gray-300">
                {" "}
                ${productIds.data.price}
              </del>
              <div className="border rounded-[20px] bg-gray-300 text-red-500 py-1 px-4 text-[14px]">
                -{productIds.data.discount}%
              </div>
            </div>
          ) : (
            <div className="text-[26px] font-semibold">${ketQua}</div>
          )}
          <div className="text-[14px] text-gray-500 border-b-2 pb-4">
            {productIds.data.description}
          </div>
          <div className="flex flex-col gap-2 border-b-2 pb-4">
            <div className="text-gray-500">Select Colors</div>
            <div className="flex gap-2">
              <div
                onClick={() => {
                  setThayDoiColor("#4E4631");
                }}
                className={`${
                  thayDoiColor == "#4E4631"
                    ? "border-[3px] border-yellow-500"
                    : ""
                } w-[35px] h-[35px] rounded-[50px] bg-[#4E4631] text-[white]`}
              ></div>
              <div
                onClick={() => {
                  setThayDoiColor("#31504B");
                }}
                className={`${
                  thayDoiColor == "#31504B"
                    ? "border-[3px] border-yellow-500"
                    : ""
                } w-[35px] h-[35px] rounded-[50px] bg-[#31504B] text-[white]`}
              ></div>

              <div
                onClick={() => {
                  setThayDoiColor("#30344F");
                }}
                className={`${
                  thayDoiColor == "#30344F"
                    ? "border-[3px] border-yellow-500"
                    : ""
                } w-[35px] h-[35px] rounded-[50px] bg-[#30344F] text-[white]`}
              ></div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-gray-500">Choose Size</div>
            <div className="flex gap-2">
              <div
                onClick={() => {
                  setThayDoiSize("Small");
                }}
                className={`${
                  thayDoiSize == "Small" ? "!bg-black !text-white" : ""
                } border rounded-[20px] bg-gray-200 w-[80px] h-[40px] flex justify-center items-center text-[14px]`}
              >
                Small
              </div>
              <div
                onClick={() => {
                  setThayDoiSize("Medium");
                }}
                className={`${
                  thayDoiSize == "Medium" ? "!bg-black !text-white" : ""
                } border rounded-[20px] bg-gray-200 w-[80px] h-[40px] flex justify-center items-center text-[14px]`}
              >
                Medium
              </div>
              <div
                onClick={() => {
                  setThayDoiSize("Large");
                }}
                className={`${
                  thayDoiSize == "Large" ? "!bg-black !text-white" : ""
                } border rounded-[20px] bg-gray-200 w-[80px] h-[40px] flex justify-center items-center text-[14px]`}
              >
                Large
              </div>
              <div
                onClick={() => {
                  setThayDoiSize("X-Large");
                }}
                className={`${
                  thayDoiSize == "X-Large" ? "!bg-black !text-white" : ""
                } border rounded-[20px] bg-gray-200 w-[80px] h-[40px] flex justify-center items-center text-[14px]`}
              >
                X-Large
              </div>
            </div>
          </div>
          <div className="flex justify-between gap-4">
            <div className="flex items-center justify-between px-[20px] w-[150px] h-[40px] border bg-gray-200 rounded-[20px] text-[20px] ">
              <div
                onClick={() => {
                  hamGiam();
                }}
              >
                -
              </div>
              <div>{thayDoiSoLuong}</div>
              <div
                onClick={() => {
                  hamTang();
                }}
              >
                +
              </div>
            </div>
            <button
              onClick={() => {
                addToCart();
              }}
              className="w-[400px] h-[40px] border rounded-[20px] text-white bg-black text-[13px]"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-[1180px] mx-auto mt-10">
        <Tabs>
          <TabList>
            <div className="grid grid-cols-3 w-full">
              <Tab>Product Detail</Tab>
              <Tab>Rating & Reviews</Tab>
              <Tab>FAQs</Tab>
            </div>
          </TabList>

          <TabPanels>
            <TabPanel>
              <div className="w-[1180px] mx-auto flex flex-col gap-2">
                <div className="text-[20px] font-bold">PRODUCT DETAILS</div>

                {productIds.data.description}
              </div>
            </TabPanel>
            <TabPanel>
              <div className="w-[1180px] mx-auto">
                <div className="flex justify-between items-center">
                  {reviewState.data.length > 0 ? (
                    <div className="flex gap-2 items-center">
                      <div>All Reviews</div>
                      <div className="text-[14px] text-[gray]">
                        ({reviewState.data.length})
                      </div>
                    </div>
                  ) : (
                    <p>No reviews found...</p>
                  )}
                  <div className="flex gap-2">
                    {session?.data?.user ? (
                      <Menu size="sm">
                        <MenuButton>
                          <div className="flex items-center justify-center gap-1 bg-gray-200 px-5 py-[6px] rounded-full">
                            <div>Latest</div>
                            <AiOutlineDown size={12} />
                          </div>
                        </MenuButton>
                        <MenuList>
                          <MenuItem className="text-sm">
                            <Link href="">Mới nhất</Link>
                          </MenuItem>
                          <MenuItem className="text-sm">
                            <Link href="">Cũ nhất</Link>
                          </MenuItem>
                          <MenuItem className="text-sm">
                            <Link href="">Đánh giá cao</Link>
                          </MenuItem>
                          <MenuItem className="text-sm">
                            <Link href="">Đánh giá thấp</Link>
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    ) : (
                      <div>
                        <AiOutlineUser></AiOutlineUser>
                      </div>
                    )}
                    {showAdminButton && (
                      <Link>
                        <MdOutlineAdminPanelSettings></MdOutlineAdminPanelSettings>
                      </Link>
                    )}
                    <div
                      onClick={onOpen}
                      className="flex cursor-pointer items-center justify-center gap-1 bg-gray-200 px-5 py-[6px] rounded-full"
                    >
                      Write a Review
                    </div>
                    <Modal isOpen={isOpen} onClose={onClose} size="xl">
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>Thêm đánh giá</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody className="grid grid-cols gap-4">
                          <Textarea
                            value={review}
                            onChange={(e) => {
                              setReview(e.target.value);
                            }}
                            minH={170}
                            placeholder="Nhận xét của khách hàng"
                          />
                          <Input
                            value={rate}
                            onChange={(e) => {
                              setRate(e.target.value);
                            }}
                            type="number"
                            placeholder="Đánh giá của khách hàng"
                          />
                        </ModalBody>

                        <ModalFooter>
                          <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Đóng
                          </Button>
                          <Button
                            onClick={() => {
                              them();
                            }}
                            variant="ghost"
                          >
                            Lưu
                          </Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                  </div>
                </div>
                {reviewState.data.length > 0 && (
                  <>
                    <div className="grid grid-cols-2 gap-2 py-[50px] ">
                      {(showAllReviews
                        ? reviewState.data
                        : reviewState.data.slice(0, 4)
                      ).map((review, index) => {
                        return (
                          <Comment
                            key={index}
                            comment={review}
                            xulyload={xulyload}
                          ></Comment>
                        );
                      })}
                    </div>
                    {reviewState.data.length > 4 && (
                      <button
                        onClick={() => {
                          setShowAllReviews(!showAllReviews);
                        }}
                        className="border rounded-[20px] py-2 px-12 ml-[500px] mb-3 hover:bg-[black] hover:text-white "
                      >
                        Show {showAllReviews ? "less" : "more"}
                      </button>
                    )}
                  </>
                )}
              </div>
            </TabPanel>
            <TabPanel>
              Do you have a minimum order?
              <br />
              We get that trying a new supplier can be scary, so we have no
              minimum order restrictions (other than purchasing in packs). We
              also have a great first time customer incentive of 10% off (enter
              &apos;newbie&apos; at checkout) we hope you&apos;ll love our
              product as much as we loved making it and we look forward to doing
              more business with you.
              <br />I own a clothing store. Am I able to purchase Owen stock for
              it? <br />
              It&apos;s what we are here for! Our mission is to support both
              online and retail fashion businesses by providing high quality
              pieces at an affordable price point, in designs that your
              customers will love. To get started, please register a new account
              using a valid ABN (Australian Business Number) or International
              Business License. Once your account is approved, we will send you
              a buyer&apos;s kit with an introduction to us, how we operate and
              other useful information.
              <br />
              Can I purchase single pieces for myself? <br />
              We are an Australian wholesale company that designs, manufactures
              and sells clothing in bulk to retail stores only so unfortunately,
              we do not sell individual items to the public. However, we have
              lovely stockists situated all over the world so you can refer to
              our Stockists page here to find a boutique near you.
              <br />
              If you are needing a stockist in your area, we&apos;d love to hear
              from you, please email enquiries@company.com
              (mailto:enquiries@company.com) with your post code or preferable
              boutique and we&apos;ll work on it enquiries@company.com
              (mailto:enquiries@company.com)
              <br />
              Why has my order been cancelled? <br />
              On occasion, our items can sell out very quickly and the stock you
              have ordered may become unavailable. This is a rare occurrence,
              but if an item that you ordered does happen to sell out, our team
              will contact you as soon as possible to confirm the cancellation
              and to see if you would like to replace it with any other items.
              <br />
              How do pre-orders work? <br />
              To pre-order any new or repeat styles, simply leave your email
              when prompted on the product page. Once the product arrives, you
              will be notified by email that the product is available to
              purchase.
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </Layout>
  );
}

function Star({ rate }) {
  const output = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rate)) {
      output.push(<FaStar color="orange" />);
    } else if (i <= Math.ceil(rate)) {
      output.push(<BsStarHalf color="orange" />);
    } else {
      output.push(<BsStar color="gray" />);
    }
  }

  return output;
}

export const getServerSideProps = async (context) => {
  const id = context.query.id;
  const URL = `http://localhost:8080/api/products/${id}`;
  const dataProductId = await fetch(URL);
  const productId = await dataProductId.json();

  const URL_review = `http://localhost:8080/api/reviews/product/${id}`;
  const dataReviews = await fetch(URL_review);
  const reviews = await dataReviews.json();

  return {
    props: {
      productIds: productId,
      reviews: reviews,
    },
  };
};
