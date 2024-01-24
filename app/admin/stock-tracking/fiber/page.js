"use client";

import FiberCard from "@/components/FiberCard";
import StockSearch from "@/components/StockSearch";
import { useWorkTrackingContext } from "@/contexts/workTrackingContext";
import { db } from "@/firebase.config";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";

export default function Fiber() {
  const { stockFiberSearch, setStockFiberSearch, refetchFiberCodes } =
    useWorkTrackingContext();
  const [data, setData] = useState([]);
  const [fiberCodeLists, setFiberCodeLists] = useState([]);
  useEffect(() => {
    const getFiberCodes = async () => {
      const querySnapshot = await getDocs(collection(db, "fiberCodes"));
      const fiberCodeDocs = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        fiberCodeDocs.push({ ...doc.data(), id: doc.id });
      });
      setFiberCodeLists(fiberCodeDocs);
      const mergedArray = fiberCodeDocs.flatMap((obj) => obj.arr);
      setData(mergedArray);
    };
    getFiberCodes();
  }, [refetchFiberCodes]);
  const filteredData = data.filter((item) =>
    item.code.includes(
      stockFiberSearch.toLocaleLowerCase("tr").replace(/\s+/g, "")
    )
  );
  return (
    <>
      <StockSearch query={stockFiberSearch} setQuery={setStockFiberSearch} />
      <section className="flex-1 relative">
        <div className="absolute inset-0 overflow-auto grid grid-cols-1 auto-rows-min md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 ">
          {filteredData.map((item, index) => (
            <FiberCard
              key={index}
              label={item.displayName}
              amount={item.amount}
              compare={item.code}
              data={fiberCodeLists}
            />
          ))}
        </div>
      </section>
    </>
  );
}
