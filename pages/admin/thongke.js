import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import LayoutAdmin from "../../components/LayoutAdmin";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  plugins: {
    title: {
      display: true,
      text: "Thống kê doanh thu theo tháng",
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

export default function ThongKe({ dataAnalystic }) {
  const dataSelect = dataAnalystic.data.slice(0, 12);
  const labels = dataSelect.map((item) => item[0]);
  const data = {
    labels,
    datasets: [
      {
        label: "Doanh thu",
        data: dataSelect.map((item) => item[1]),
        backgroundColor: "rgb(255, 99, 132)",
      },
    ],
  };
  return (
    <LayoutAdmin>
      <Bar options={options} data={data} />
    </LayoutAdmin>
  );
}

export const getServerSideProps = async () => {
  const dataAnalystic = await fetch(
    "http://localhost:8080/api/orders/analystic"
  )
    .then((res) => res.json())
    .then((res) => res);

  return {
    props: {
      dataAnalystic: dataAnalystic,
    },
  };
};
