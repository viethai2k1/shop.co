import React from "react";
import LayoutAdmin from "../../../components/LayoutAdmin";
import ReviewAdmin from "../../../components/ReviewAdmin";

export default function Danhgia({ reviewAdmin }) {
  return (
    <LayoutAdmin className="px-6 ">
      <div className="text-[20px] font-semibold mt-[20px] ">Reviews</div>
      <div className="flex flex-col gap-4 mt-[20px]">
        {reviewAdmin.data.map((review, index) => {
          return <ReviewAdmin key={index} reviewAdmin={review}></ReviewAdmin>;
        })}
      </div>
    </LayoutAdmin>
  );
}
export const getServerSideProps = async () => {
  const URL = "http://localhost:8080/api/reviews";
  const dataReviewAdmin = await fetch(URL);
  const reviewAdmin = await dataReviewAdmin.json();

  return {
    props: {
      reviewAdmin: reviewAdmin,
    },
  };
};
