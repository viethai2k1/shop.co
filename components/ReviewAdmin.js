import { Switch } from "@chakra-ui/react";
import React, { useState } from "react";
import Star from "../components/Star";
import Link from "next/link";

export default function ReviewAdmin({ reviewAdmin }) {
  const [statusState, setStatusState] = useState(reviewAdmin);

  const date = new Date(reviewAdmin.createDate);
  const dateFormat = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;

  const updateStatus = async () => {
    const URL = `http://localhost:8080/api/reviews/status/${reviewAdmin.id}`;
    const response = await fetch(URL, {
      method: "PUT",
    });
    hamloadStatus();
  };

  const hamloadStatus = async () => {
    const URL = `http://localhost:8080/api/reviews/${reviewAdmin.id}`;
    const data = await fetch(URL);
    const dataStatus = await data.json();
    setStatusState(dataStatus.data);
  };

  return (
    <div className="h-[200px] bg-white flex flex-col-2 justify-between items-center p-5 rounded-[10px]">
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 items-center">
            <div className="border border-gray-200 w-12 aspect-square rounded-full">
              <img
                className="w-full h-full rounded-full"
                src={reviewAdmin.user.image}
              ></img>
            </div>
            <div>
              <div className="font-semibold">{reviewAdmin.user.fullname}</div>
              <div>{dateFormat}</div>
            </div>
          </div>

          <div>
            <div className="flex gap-1 mb-2">
              <Star rate={reviewAdmin.rate} />
            </div>
            <div>{reviewAdmin.review}</div>
          </div>
        </div>
        <Switch onChange={updateStatus} isChecked={statusState.status} />
      </div>

      <Link href={`/product/${reviewAdmin.product.id}`} target="_blank" className="flex flex-col gap-2">
        <div className="w-[150px] h-[150px] bg-gray-300 flex items-center justify-center rounded-[8px]">
          <img
            className="w-[100px] h-[100px] "
            src={reviewAdmin.product.images[0].url}
          ></img>
        </div>
        <div className="flex justify-center text-[14px] font-semibold">
          {reviewAdmin.product.name}
        </div>
      </Link>
    </div>
  );
}
