"use client";
import { useWorkTrackingContext } from "@/contexts/workTrackingContext";
import { db } from "@/firebase.config";
import useWhenClickedOutside from "@/hooks/useWhenClickedOutside";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import { toast } from "sonner";

export default function FiberType() {
  const [formData, setFormData] = useState({
    name: "",
  });
  const [loading, setLoading] = useState(false);
  const [refetch, setRefetch] = useState(1);
  const router = useRouter();
  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    await deleteDoc(doc(db, "fiberTypes", formData.id));
    setFormData({
      name: "",
    });
    setLoading(false);
    setRefetch((prev) => prev + 1);
    toast.success("İplik türü başarıyla silindi.", { position: "top-center" });
  };
  const {
    customers,
    fiberTypes,
    setFiberTypes,
    colors,
    fiberCodes,
    workOrders,
  } = useWorkTrackingContext();
  useEffect(() => {
    const getActiveWorkOrders = async () => {
      const querySnapshot = await getDocs(collection(db, "fiberTypes"));
      const workOrderLists = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        workOrderLists.push({ ...doc.data(), id: doc.id });
      });
      setFiberTypes(workOrderLists);
    };
    getActiveWorkOrders();
  }, [refetch]);
  return (
    <form
      onSubmit={handleSubmit}
      className=" relative shadow-md  h-[calc(100vh-15rem)] bg-white dark:bg-arc_black"
    >
      <div className="absolute inset-0 p-6 flex flex-col gap-2">
        <JustSelect
          data={fiberTypes}
          setFormData={setFormData}
          formData={formData}
          property={"displayName"}
          label={"İplik Türü"}
        />
        <button
          type="submit"
          disabled={loading || formData.name === ""}
          className="simple_button flex justify-center w-full md:w-fit"
        >
          {loading ? (
            <HashLoader size={20} color="#008000" />
          ) : (
            "İplik Kodunu Sil"
          )}
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
    <div className="relative flex flex-col gap-1 w-full md:w-fit" ref={ref}>
      <label htmlFor="" className="font-semibold">
        {label}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="simple_button w-full md:w-[200px] flex justify-between gap-10"
      >
        {formData[property] ? formData[property] : "Lütfen seçin"}
        <ChevronDownIcon className="w-5" />
      </button>
      <div
        className={`z-10 absolute flex flex-col  top-full right-0 left-0 rounded-lg bg-arc_black shadow-md text-white dark:text-arc_black dark:bg-white ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex border-b items-center border-white dark:border-arc_black">
          <div className="pl-2.5">
            <MagnifyingGlassIcon className="w-5 " />
          </div>
          <input
            type="text"
            placeholder="Ara"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="bg-arc_black dark:bg-white p-2.5 outline-none w-[170px]"
          />
        </div>
        <div className="flex flex-col gap-2 h-[200px] overflow-auto">
          {filteredData.map((item, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleClick(item)}
              className="p-3 hover:bg-white rounded-lg hover:text-black dark:hover:bg-arc_black dark:hover:text-white"
            >
              {item.displayName}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
