"use client";
import { useWorkTrackingContext } from "@/contexts/workTrackingContext";
import { db } from "@/firebase.config";
import useWhenClickedOutside from "@/hooks/useWhenClickedOutside";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import { toast } from "sonner";

export default function WorkOrder() {
  const [formData, setFormData] = useState({
    workOrderCode: "",
  });
  const router = useRouter();
  const [refetch, setRefetch] = useState(1);
  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    await deleteDoc(doc(db, "workOrders", formData.id));
    const querySnapshot2 = await getDocs(collection(db, "workOrderLists"));
    let x = [];
    querySnapshot2.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      x.push({ ...doc.data(), id: doc.id });
    });
    const searchedDoc = x.find((item) =>
      item.arr.find(
        (item) =>
          item.workOrderCode ===
          formData.workOrderCode.toLocaleLowerCase("tr-TR")
      )
    );
    const updatedArr = searchedDoc.arr.filter(
      (item) => item.workOrderCode !== formData.workOrderCode
    );
    const docRef = doc(db, "workOrderLists", searchedDoc.id);
    await setDoc(docRef, {
      arr: updatedArr,
    });
    setFormData({
      workOrderCode: "",
    });
    setLoading(false);
    setRefetch((prev) => prev + 1);
    toast.success("İş emri başarıyla silindi.", { position: "top-center" });
  };
  useEffect(() => {
    const getActiveWorkOrders = async () => {
      const querySnapshot = await getDocs(collection(db, "workOrderLists"));
      const workOrderLists = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        workOrderLists.push({ ...doc.data(), id: doc.id });
      });
      const mergedArray = workOrderLists.flatMap((obj) => obj.arr);
      setWorkOrders(mergedArray);
    };
    getActiveWorkOrders();
  }, [refetch]);
  const {
    customers,
    setWorkOrders,
    fiberTypes,
    colors,
    fiberCodes,
    workOrders,
  } = useWorkTrackingContext();
  const [loading, setLoading] = useState(false);
  return (
    <form
      onSubmit={handleSubmit}
      className=" relative shadow-md  h-[calc(100vh-15rem)] bg-white dark:bg-arc_black"
    >
      <div className="absolute inset-0 p-6 flex flex-col gap-2">
        <JustSelect
          data={workOrders.filter(
            (item) =>
              item.jobType.toLocaleLowerCase("tr") !== "iade" &&
              item.productType.toLocaleLowerCase("tr") !== "ip" &&
              item.active === true
          )}
          setFormData={setFormData}
          formData={formData}
          property={"workOrderCode"}
          label={"İş Emri"}
          setLoading={setLoading}
        />
        <button
          type="submit"
          disabled={loading || formData.workOrderCode === ""}
          className="simple_button flex justify-center w-full md:w-fit"
        >
          {loading ? <HashLoader size={20} color="#008000" /> : "İş Emrini Sil"}
        </button>
      </div>
    </form>
  );
}

const JustSelect = ({
  data,
  setFormData,
  formData,
  property,
  label,
  setLoading,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useWhenClickedOutside(() => setIsOpen(false));
  const [searchQuery, setSearchQuery] = useState("");
  const filteredData = data.filter((item) =>
    item.workOrderCode
      .toLocaleLowerCase("tr")
      .includes(searchQuery.toLocaleLowerCase("tr"))
  );
  const handleClick = async (item) => {
    setIsOpen(false);

    setLoading(true);
    const q = query(
      collection(db, "workOrders"),
      where(
        "workOrderCode",
        "==",
        item.workOrderCode.toLocaleLowerCase("tr-TR")
      )
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      setFormData({ ...doc.data(), id: doc.id });
    });
    setLoading(false);
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
        className={`z-10 absolute flex flex-col  top-full right-0 left-0 rounded-lg bg-arc_black text-white dark:text-black shadow-md dark:bg-white ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex border-b items-center border-white dark:border-black">
          <div className="pl-2.5">
            <MagnifyingGlassIcon className="w-5 " />
          </div>
          <input
            type="text"
            placeholder="Ara"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="bg-arc_black dark:bg-white p-2.5 outline-none w-[170px]"
          />
        </div>
        <div className="flex flex-col gap-2 h-[200px] overflow-auto">
          {filteredData.map((item, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleClick(item)}
              className="p-3 hover:bg-white rounded-lg hover:text-arc_black dark:hover:bg-arc_black dark:hover:text-white"
            >
              {item.workOrderCode}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
