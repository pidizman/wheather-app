"use client";
import { useRef, useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { request } from "../../lib/util";

interface Data {
  dewpoint?: string;
  temperature?: string;
  date?: string;
  time?: string;
}

export default function Graph() {
  const [data, setData] = useState<Data[]>();
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await request({
        path: "read",
        method: "GET",
      });
      const data: Data[] = await response.json();
      setData(data);
    };
    fetchData();

    if (chartRef && chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      // Destroy previous chart instance, if exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(ctx, {
        type: "line",
        data: {},
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return <canvas ref={chartRef}></canvas>;
}
