import { useRef, useCallback } from "react";
import Layout from "../components/Layout";
import Product from "../components/Product";

import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import {
  AiOutlineArrowRight,
  AiOutlineArrowLeft,
  AiOutlineLike,
  AiOutlineDislike,
} from "react-icons/ai";
import Comment from "../components/Comment";
import Link from "next/link";
import Category from "../components/Category";
export default function Index({ products, categorys }) {
  const sliderRef = useRef(null);
  const handlePrev = () => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  };
  const handleNext = () => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  };
  return (
    <div>
      <Layout>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          autoplay={{ delay: 2000 }}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          direction="horizontal"
        >
          <SwiperSlide>
            <div className="h-[500px] bg-[#F2F0F1]">
              <div className=" w-[1180px] h-[480px] mx-auto flex items-center justify-between">
                <div className="flex flex-col gap-4">
                  <div className="text-[35px] w-[400px] font-extrabold">
                    FIND CLOTHES THAT MATCHES YOUR STYLE
                  </div>
                  <div className="text-[13px] w-[400px] text-[gray]">
                    Browse through our diverse range of meticulously crafted
                    garments, designed to bring out your individuality and cater
                    to your sense of style.
                  </div>
                  <button className="broder bg-[black] text-[white] text-[14px] w-[200px] h-[40px] rounded-[20px]">
                    Shop now
                  </button>
                  <div className="flex gap-10">
                    <div>
                      <div className="text-[30px] font-bold">200+</div>
                      <div className="text-[13px] text-[gray]">
                        International Brands
                      </div>
                    </div>
                    <div>
                      <div className="text-[30px] font-bold">2,000+</div>
                      <div className="text-[13px] text-[gray]">
                        High-Quality Products
                      </div>
                    </div>
                    <div>
                      <div className="text-[30px] font-bold">30,000+</div>
                      <div className="text-[13px] text-[gray]">
                        Happy Customers
                      </div>
                    </div>
                  </div>
                </div>
                <img
                  className="w-[380px] h-[475px]"
                  src="/img/anh22xoanen.png"
                ></img>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="h-[500px] bg-[#F2F0F1]">
              <div className=" w-[1180px] h-[480px] mx-auto flex items-center justify-between">
                <div className="flex flex-col gap-4">
                  <div className="text-[35px] w-[400px] font-extrabold">
                    FIND CLOTHES THAT MATCHES YOUR STYLE
                  </div>
                  <div className="text-[13px] w-[400px] text-[gray]">
                    Browse through our diverse range of meticulously crafted
                    garments, designed to bring out your individuality and cater
                    to your sense of style.
                  </div>
                  <button className="broder bg-[black] text-[white] text-[14px] w-[200px] h-[40px] rounded-[20px]">
                    Shop now
                  </button>
                  <div className="flex gap-10">
                    <div>
                      <div className="text-[30px] font-bold">200+</div>
                      <div className="text-[13px] text-[gray]">
                        International Brands
                      </div>
                    </div>
                    <div>
                      <div className="text-[30px] font-bold">2,000+</div>
                      <div className="text-[13px] text-[gray]">
                        High-Quality Products
                      </div>
                    </div>
                    <div>
                      <div className="text-[30px] font-bold">30,000+</div>
                      <div className="text-[13px] text-[gray]">
                        Happy Customers
                      </div>
                    </div>
                  </div>
                </div>
                <img
                  className="w-[420px] h-[555px]"
                  src="/img/anh28xoanen.png"
                ></img>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
        <div className="h-[100px] bg-[black]  text-[white]">
          <div className="font-hai w-[1180px] h-[100px] mx-auto text-[35px] font-semibold flex justify-between items-center">
            <div>YONEX</div>
            <div>VICTOR</div>
            <div>LINING</div>
            <div>MIZUNO</div>
            <div>KAWASAKI</div>
          </div>
        </div>
        <div>
          <div className=" font-bold text-[40px] py-[30px] flex justify-center">
            PRODUCTS
          </div>
          <div className=" w-[1180px] mx-auto">
            <Swiper
              modules={[Navigation, Scrollbar, A11y, Autoplay]}
              spaceBetween={20}
              slidesPerView={4}
              navigation
              scrollbar={{ draggable: true }}
            >
              <div className="mt-[20px] w-[1180px] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {products.data.map((sanpham, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <Product product={sanpham} />
                    </SwiperSlide>
                  );
                })}
              </div>
            </Swiper>
            <button className="border w-[150px] h-[40px] mt-[30px] mb-[30px]  ml-[500px] rounded-[20px] hover:bg-black hover:text-white ">
              View All
            </button>
          </div>
        </div>
        <div className="w-[1180px] mx-auto bg-[#F0F0F0] rounded-[10px]">
          <div className="text-[35px] font-bold flex justify-center pt-[40px] ">
            CATEGORIES
          </div>
          <div className="grid grid-cols-3 gap-3 mt-[20px] p-[30px]">
            {categorys.data.map((category, index) => {
              return <Category key={index} categoryz={category}></Category>;
            })}
          </div>
        </div>
        <div className="w-[1180px] mx-auto ">
          <div className="flex justify-between items-center py-[30px]">
            <div className="text-[40px] font-bold">OUR HAPPY CUSTOMERS</div>
            <div className="flex gap-3 text-[20px]">
              <AiOutlineArrowLeft
                className="cursor-pointer"
                onClick={handlePrev}
              ></AiOutlineArrowLeft>
              <AiOutlineArrowRight
                className="cursor-pointer"
                onClick={handleNext}
              ></AiOutlineArrowRight>
            </div>
          </div>
          <div className="w-[1180px] mx-auto">
            <Swiper
              ref={sliderRef}
              modules={[Navigation, Scrollbar, A11y, Autoplay]}
              spaceBetween={20}
              slidesPerView={3}
              scrollbar={{ draggable: true }}
            >
              <SwiperSlide>
                <div className="border rounded flex flex-col gap-6 p-[20px] ">
                  <div className="flex gap-2 items-center">
                    <div className="text-[20px] font-semibold">
                      Đinh Việt Hải
                    </div>
                    <div className="text-gray-500 text-[14px]">
                      1 tháng trước
                    </div>
                  </div>
                  <div className="text-[14px]">
                    Sản phẩm trên cả tuyệt vời luôn ạ, mình mua đến nay đã là 10
                    sản phẩm ở shop này để cho họ hàng mình dùng rồi nó vô cùng
                    bền lắm luôn
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <AiOutlineLike className="text-[25px]"></AiOutlineLike>
                      <div>5</div>
                    </div>
                    <div className="flex items-center gap-1">
                      <AiOutlineDislike className="text-[25px]" ></AiOutlineDislike>
                      <div>0</div>
                    </div>
                    <div className="text-[15px] font-semibold">Phản hồi</div>
                  </div>
                </div>
              </SwiperSlide>
              
              <SwiperSlide>
                <div className="border rounded flex flex-col gap-6 p-[20px] ">
                  <div className="flex gap-2 items-center">
                    <div className="text-[20px] font-semibold">
                      Đinh Việt Hải
                    </div>
                    <div className="text-gray-500 text-[14px]">
                      1 tháng trước
                    </div>
                  </div>
                  <div className="text-[14px]">
                    Sản phẩm trên cả tuyệt vời luôn ạ, mình mua đến nay đã là 10
                    sản phẩm ở shop này để cho họ hàng mình dùng rồi nó vô cùng
                    bền lắm luôn
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <AiOutlineLike className="text-[25px]"></AiOutlineLike>
                      <div>5</div>
                    </div>
                    <div className="flex items-center gap-1">
                      <AiOutlineDislike className="text-[25px]" ></AiOutlineDislike>
                      <div>0</div>
                    </div>
                    <div className="text-[15px] font-semibold">Phản hồi</div>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className="border rounded flex flex-col gap-6 p-[20px] ">
                  <div className="flex gap-2 items-center">
                    <div className="text-[20px] font-semibold">
                      Đinh Việt Hải
                    </div>
                    <div className="text-gray-500 text-[14px]">
                      1 tháng trước
                    </div>
                  </div>
                  <div className="text-[14px]">
                    Sản phẩm trên cả tuyệt vời luôn ạ, mình mua đến nay đã là 10
                    sản phẩm ở shop này để cho họ hàng mình dùng rồi nó vô cùng
                    bền lắm luôn
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <AiOutlineLike className="text-[25px]"></AiOutlineLike>
                      <div>5</div>
                    </div>
                    <div className="flex items-center gap-1">
                      <AiOutlineDislike className="text-[25px]" ></AiOutlineDislike>
                      <div>0</div>
                    </div>
                    <div className="text-[15px] font-semibold">Phản hồi</div>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className="border rounded flex flex-col gap-6 p-[20px] ">
                  <div className="flex gap-2 items-center">
                    <div className="text-[20px] font-semibold">
                      Đinh Việt Hải
                    </div>
                    <div className="text-gray-500 text-[14px]">
                      1 tháng trước
                    </div>
                  </div>
                  <div className="text-[14px]">
                    Sản phẩm trên cả tuyệt vời luôn ạ, mình mua đến nay đã là 10
                    sản phẩm ở shop này để cho họ hàng mình dùng rồi nó vô cùng
                    bền lắm luôn
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <AiOutlineLike className="text-[25px]"></AiOutlineLike>
                      <div>5</div>
                    </div>
                    <div className="flex items-center gap-1">
                      <AiOutlineDislike className="text-[25px]" ></AiOutlineDislike>
                      <div>0</div>
                    </div>
                    <div className="text-[15px] font-semibold">Phản hồi</div>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className="border rounded flex flex-col gap-6 p-[20px] ">
                  <div className="flex gap-2 items-center">
                    <div className="text-[20px] font-semibold">
                      Đinh Việt Hải
                    </div>
                    <div className="text-gray-500 text-[14px]">
                      1 tháng trước
                    </div>
                  </div>
                  <div className="text-[14px]">
                    Sản phẩm trên cả tuyệt vời luôn ạ, mình mua đến nay đã là 10
                    sản phẩm ở shop này để cho họ hàng mình dùng rồi nó vô cùng
                    bền lắm luôn
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <AiOutlineLike className="text-[25px]"></AiOutlineLike>
                      <div>5</div>
                    </div>
                    <div className="flex items-center gap-1">
                      <AiOutlineDislike className="text-[25px]" ></AiOutlineDislike>
                      <div>0</div>
                    </div>
                    <div className="text-[15px] font-semibold">Phản hồi</div>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className="border rounded flex flex-col gap-6 p-[20px] ">
                  <div className="flex gap-2 items-center">
                    <div className="text-[20px] font-semibold">
                      Đinh Việt Hải
                    </div>
                    <div className="text-gray-500 text-[14px]">
                      1 tháng trước
                    </div>
                  </div>
                  <div className="text-[14px]">
                    Sản phẩm trên cả tuyệt vời luôn ạ, mình mua đến nay đã là 10
                    sản phẩm ở shop này để cho họ hàng mình dùng rồi nó vô cùng
                    bền lắm luôn
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <AiOutlineLike className="text-[25px]"></AiOutlineLike>
                      <div>5</div>
                    </div>
                    <div className="flex items-center gap-1">
                      <AiOutlineDislike className="text-[25px]" ></AiOutlineDislike>
                      <div>0</div>
                    </div>
                    <div className="text-[15px] font-semibold">Phản hồi</div>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className="border rounded flex flex-col gap-6 p-[20px] ">
                  <div className="flex gap-2 items-center">
                    <div className="text-[20px] font-semibold">
                      Đinh Việt Hải
                    </div>
                    <div className="text-gray-500 text-[14px]">
                      1 tháng trước
                    </div>
                  </div>
                  <div className="text-[14px]">
                    Sản phẩm trên cả tuyệt vời luôn ạ, mình mua đến nay đã là 10
                    sản phẩm ở shop này để cho họ hàng mình dùng rồi nó vô cùng
                    bền lắm luôn
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <AiOutlineLike className="text-[25px]"></AiOutlineLike>
                      <div>5</div>
                    </div>
                    <div className="flex items-center gap-1">
                      <AiOutlineDislike className="text-[25px]" ></AiOutlineDislike>
                      <div>0</div>
                    </div>
                    <div className="text-[15px] font-semibold">Phản hồi</div>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className="border rounded flex flex-col gap-6 p-[20px] ">
                  <div className="flex gap-2 items-center">
                    <div className="text-[20px] font-semibold">
                      Đinh Việt Hải
                    </div>
                    <div className="text-gray-500 text-[14px]">
                      1 tháng trước
                    </div>
                  </div>
                  <div className="text-[14px]">
                    Sản phẩm trên cả tuyệt vời luôn ạ, mình mua đến nay đã là 10
                    sản phẩm ở shop này để cho họ hàng mình dùng rồi nó vô cùng
                    bền lắm luôn
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <AiOutlineLike className="text-[25px]"></AiOutlineLike>
                      <div>5</div>
                    </div>
                    <div className="flex items-center gap-1">
                      <AiOutlineDislike className="text-[25px]" ></AiOutlineDislike>
                      <div>0</div>
                    </div>
                    <div className="text-[15px] font-semibold">Phản hồi</div>
                  </div>
                </div>
              </SwiperSlide>
              
            </Swiper>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export const getServerSideProps = async () => {
  const URL = "http://localhost:8080/api/products";
  const dataProducts = await fetch(URL);
  const Productsdata = await dataProducts.json();

  const URL_Category = "http://localhost:8080/api/category";
  const dataCategory = await fetch(URL_Category);
  const Categorydata = await dataCategory.json();

  return {
    props: {
      products: Productsdata,
      categorys: Categorydata,
    },
  };
};
