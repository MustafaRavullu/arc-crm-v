"use client";

import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import Dropdown from "./Dropdown";
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function BarGraph({
  data,
  nameKey,
  valueKey,
  color,
  title,
  isYearSelectOn,
  type,
}) {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const selectedYearData =
    type.toLocaleLowerCase("tr") === "product"
      ? data.find((item) => item.year === selectedYear)
      : type.toLocaleLowerCase("tr") === "fiber"
      ? data.find((item) => item.year === selectedYear)
      : {};
  return (
    <div className="flex flex-col gap-6 p-6 shadow-md">
      <div className="flex justify-between">
        <div className="font-semibold">{title}</div>
        {isYearSelectOn && (
          <Dropdown buttonContent={<SelectedYearButton title={selectedYear} />}>
            <div className="shadow-md flex flex-col gap-1 w-[120px]">
              {data.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setSelectedYear(item.year)}
                  className="p-3 rounded-lg hover:bg-arc_black hover:text-white dark:hover:bg-white dark:hover:text-black"
                >
                  {item.year}
                </button>
              ))}
            </div>
          </Dropdown>
        )}
      </div>
      <ResponsiveContainer width={"100%"} height={"100%"}>
        <BarChart height={400} width={500} data={selectedYearData.data}>
          <Tooltip content={<CustomTooltip />} />
          <YAxis />
          <XAxis dataKey={nameKey} />
          <Bar dataKey={valueKey} fill={color} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-white shadow flex flex-col gap-1 rounded-md dark:bg-arc_black">
        <p className="text-medium text-lg">{label}</p>
        <p className="text-sm">
          Satış:
          <span className="ml-2 text-yellow-600">{payload[0].value}</span>
        </p>
      </div>
    );
  }
};

const SelectedYearButton = ({ title }) => {
  return (
    <span className="flex justify-between gap-5 simple_button">
      <div>{title}</div>
      <div>
        <ChevronDownIcon className="w-5" />
      </div>
    </span>
  );
};
