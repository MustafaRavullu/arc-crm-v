"use client";
import { useWorkTrackingContext } from "@/contexts/workTrackingContext";
import useWhenClickedOutside from "@/hooks/useWhenClickedOutside";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function subcontractorFollower() {
  const followers = [
    {
      id: 1,
      name: "mehmet",
    },
    {
      id: 2,
      name: "veli",
    },
  ];
  const [formData, setFormData] = useState({});
  const router = useRouter();
  const handleSubmit = (event) => {
    event.preventDefault();
    setFormData({});
    router.refresh();
  };
  const {
    customers,
    fiberTypes,
    colors,
    fiberCodes,
    workOrders,
    subcontractors,
  } = useWorkTrackingContext();
  return (
    <form
      onSubmit={handleSubmit}
      className=" relative shadow-md  h-[calc(100vh-15rem)] bg-white dark:bg-arc_black"
    >
      <div className="absolute inset-0 p-6 flex flex-col gap-2">
        <JustSelect
          data={followers}
          setFormData={setFormData}
          formData={formData}
          property={"name"}
          label={"Fason Takipçisi"}
        />
        <button type="submit" className="simple_button">
          Fason Takipçisini Sil
        </button>
      </div>
    </form>
  );
}

const JustSelect = ({ data, setFormData, formData, property, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useWhenClickedOutside(() => setIsOpen(false));
  const [query, setQuery] = useState("");
  const filteredData = data.filter((item) =>
    item.name.toLocaleLowerCase("tr").includes(query.toLocaleLowerCase("tr"))
  );
  const handleClick = (name) => {
    setFormData(name);
    setIsOpen(false);
  };
  return (
    <div className="relative flex flex-col gap-1 w-fit" ref={ref}>
      <label htmlFor="" className="font-semibold">
        {label}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="simple_button w-[300px] flex justify-between gap-10"
      >
        {formData[property] ? formData[property] : "Lütfen seçin"}
        <ChevronDownIcon className="w-5" />
      </button>
      <div
        className={`z-10 absolute flex flex-col gap-2 top-full right-0 left-0 rounded-lg bg-white shadow-md dark:bg-arc_black ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex border-b items-center border-black dark:border-white">
          <div className="pl-2.5">
            <MagnifyingGlassIcon className="w-5 " />
          </div>
          <input
            type="text"
            placeholder="Ara"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="bg-white dark:bg-arc_black p-2.5 outline-none w-[170px]"
          />
        </div>
        {filteredData.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => handleClick(item)}
            className="p-3 hover:bg-black rounded-lg hover:text-white dark:hover:bg-white dark:hover:text-black"
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};
