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
  useDisclosure,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BsStar, BsStarHalf } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { BiDotsVerticalRounded } from "react-icons/bi";
export default function Comment({ comment, xulyload }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const xuLyXoa = async (id) => {
    const URL = `http://localhost:8080/api/reviews/${id}`;
    const options = {
      method: "DELETE",
    };
    const raw = await fetch(URL, options);
    await raw.json();
    // setStateComment(raw);
    xulyload(raw);
  };

  const [rate, setRate] = useState(comment?.rate);
  const [review, setReview] = useState(comment?.review);
  const sua = async () => {
    const URL = "http://localhost:8080/api/reviews/update";
    const commentReview = {
      id: comment.id,
      rate: rate,
      review: review,
    };

    const options = {
      method: "PUT",
      body: JSON.stringify(commentReview),
      headers: {
        "Content-type": "application/json",
      },
    };
    await fetch(URL, options);
    xulyload();
    onClose();
  };
  const date = new Date(comment?.createDate);
  const dateFormat = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;

  const session = useSession();
  const [stateSuaXoa, setStateSuaXoa] = useState("");
  const duocQuyenSua = comment?.user?.id === session?.data?.user?.id;
  console.log(session);

  return (
    <div>
      <div className="border p-[20px] flex flex-col gap-2 rounded-[10px] relative ">
        <div className="text-orange-400 flex gap-1 text-[20px] items-center">
          <Star rate={comment.rate} />
        </div>

        {duocQuyenSua && (
          <div className="flex flex-col gap-4 text-[28px] absolute top-4 right-3 ">
            <BiDotsVerticalRounded
              className="absolute top-1 right-0 text-[35px]"
              onClick={() => {
                setStateSuaXoa(!stateSuaXoa);
              }}
            ></BiDotsVerticalRounded>
            {stateSuaXoa && (
              <div className="flex gap-2 absolute top-12 right-2 ">
                <div>
                  <AiOutlineEdit onClick={onOpen}></AiOutlineEdit>
                </div>
                <div>
                  <AiOutlineDelete
                    onClick={() => {
                      xuLyXoa(comment?.id);
                    }}
                  ></AiOutlineDelete>
                </div>
              </div>
            )}
          </div>
        )}
        <div className="flex gap-1">
          <div className="font-semibold">{comment?.user?.fullname}</div>
        </div>
        <div className="text-[14px]">{comment?.review}</div>
        <div className="font-semibold text-gray-400">{dateFormat}</div>
      </div>
      <div>
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Thêm đánh giá</ModalHeader>
            <ModalCloseButton />
            <ModalBody className="grid grid-cols gap-4">
              <Input
                value={rate}
                onChange={(e) => {
                  setRate(e.target.value);
                }}
                placeholder="Rate"
              />
              <Input
                value={review}
                onChange={(e) => {
                  setReview(e.target.value);
                }}
                placeholder="Đánh giá của khách hàng"
              />
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Đóng
              </Button>
              <Button onClick={sua} variant="ghost">
                Lưu
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}

function Star({ rate }) {
  const output = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rate)) {
      output.push(<FaStar color="orange" key={i} />);
    } else if (i <= Math.ceil(rate)) {
      output.push(<BsStarHalf color="orange" key={i} />);
    } else {
      output.push(<BsStar color="gray" key={i} />);
    }
  }

  return output;
}
