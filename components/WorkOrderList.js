"use client";

import { useWorkTrackingContext } from "@/contexts/workTrackingContext";
import { db } from "@/firebase.config";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { collection, query, where, getDoc, getDocs } from "firebase/firestore";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function WorkOrderList({ data }) {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterParams, setFilterParams] = useState({
    productType: "ürün",
    jobType: "normal",
  });
  const { selectedWorkOrder, setSelectedWorkOrder } = useWorkTrackingContext();
  const productTypeFilters = [
    {
      id: 1,
      label: "Ürün",
      value: "ürün",
    },
    {
      id: 2,
      label: "İp",
      value: "ip",
    },
  ];
  const jobTypeFilters = [
    {
      id: 1,
      label: "Normal",
      value: "normal",
    },
    {
      id: 2,
      label: "İade",
      value: "iade",
    },
  ];
  const firstFilter = data.filter((item) =>
    item.workOrderCode.includes(searchQuery)
  );
  const secondFilter = firstFilter.filter(
    (item) => item.productType === filterParams.productType
  );
  const thirdFilter = secondFilter.filter(
    (item) => item.jobType === filterParams.jobType
  );
  const handleSelectWorkOrder = async (code) => {
    // setSelectedWorkOrder(
    //   data.find((x) => x.workOrderCode === item.workOrderCode)
    // )
    setGlobalLoading(true);
    const q = query(
      collection(db, "workOrders"),
      where(
        "workOrderCode",
        "==",
        code.replace(/\s/g, "").toLocaleLowerCase("tr")
      )
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setSelectedWorkOrder({ ...doc.data(), id: doc.id });
    });
    setGlobalLoading(false);
  };
  const { setGlobalLoading } = useWorkTrackingContext();
  return (
    <div className="min-h-[400px] md:min-h-full flex flex-col gap-6 p-6">
      {/* Başlık */}
      <div className="font-bold text-lg">
        {pathname.includes("active-work-orders")
          ? "AKTİF İŞ EMİRLERİ"
          : pathname.includes("completed-work-orders")
          ? "TAMAMLANMIŞ İŞ EMİRLERİ"
          : ""}
      </div>
      {/* Arama Kutusu */}
      <div className="flex items-center border-b border-arc_black dark:border-white">
        <div className="pl-3">
          <MagnifyingGlassIcon className="w-5" />
        </div>
        <input
          type="text"
          placeholder="Ara"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          className="bg-white text-base outline-none p-3 w-full dark:bg-arc_black"
        />
      </div>
      {/* Filtreler */}
      <div className="flex gap-3">
        {productTypeFilters.map((item) => (
          <button
            type="button"
            key={item.id}
            onClick={() =>
              setFilterParams({ ...filterParams, productType: item.value })
            }
            className={`border grow font-semibold border-arc_black p-2 rounded-lg dark:border-white ${
              filterParams.productType === item.value &&
              "bg-arc_black text-white dark:bg-white dark:text-black"
            }`}
          >
            {item.label}
          </button>
        ))}
        {jobTypeFilters.map((item) => (
          <button
            type="button"
            key={item.id}
            onClick={() =>
              setFilterParams({ ...filterParams, jobType: item.value })
            }
            className={`border grow font-semibold border-arc_black p-2 rounded-lg dark:border-white ${
              filterParams.jobType === item.value &&
              "bg-arc_black text-white dark:bg-white dark:text-black"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      {/* İş Emir Kodları */}
      <div className="flex-1 relative">
        <div className="absolute inset-0 overflow-auto flex flex-col gap-3">
          {thirdFilter.length > 0
            ? thirdFilter.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectWorkOrder(item.workOrderCode)}
                  className={`p-3 rounded-lg font-bold text-base ${
                    selectedWorkOrder &&
                    item.workOrderCode === selectedWorkOrder.workOrderCode
                      ? "bg-arc_black text-white dark:bg-white dark:text-black"
                      : "hover:bg-arc_black hover:text-white dark:hover:bg-white dark:hover:text-black"
                  }`}
                >
                  {item.workOrderCode}
                </button>
              ))
            : "Aradığınız kriterlere uygun ürün yok"}
        </div>
      </div>
    </div>
  );
}
