"use client";

import React, { useEffect, useState } from "react";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { request } from "../../lib/util";

interface Data {
  dewpoint?: string;
  temperature?: string;
  date?: string;
  time?: string;
}

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

export default function Graph() {
  const [output, setOutput] = useState<Data[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await request({
        path: "read",
        method: "GET",
      });
      const data: Data[] = await response.json();
      setOutput(data);
    };
    fetchData();
  }, []);

  const labels: String[] = [];
  for (let i = 0; i < output.length; i++) {
    labels.push(`${output[i].date} ${output[i].time}`);
  }

  const temps: Number[] = [];
  for (let i = 0; i < output.length; i++) {
    temps.push(Number(output[i].temperature));
  }

  console.log(labels, temps);

  // const labels = [
  //   "January",
  //   "February",
  //   "March",
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  // ];

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: temps,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return <Line data={data} />;
}
