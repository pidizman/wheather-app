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
  dewpoint?: number;
  temperature?: number;
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

  const options = {
    elements: {
      point: {
        radius: 3,
        hoverRadius: 5,
        hitRadius: 10,
        backgroundColor: "rgba(0, 0, 255, 1)",
      },
      line: {
        borderColor: "rgba(0, 0, 255, 0.1)",
      },
    },
    plugins: {
      tooltip: {
        displayColors: false,
        xAlign: "center",
        yAlign: "bottom",
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Temperature",
        data: temps,
      },
    ],
  };

  return <Line data={data} options={options} />;
}
