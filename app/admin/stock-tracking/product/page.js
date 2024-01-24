"use client";

import ProductCard from "@/components/ProductCard";
import StockSearch from "@/components/StockSearch";
import { useWorkTrackingContext } from "@/contexts/workTrackingContext";
import { db } from "@/firebase.config";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";

export default function Product() {
  const ready = false;
  const { stockProductSearch, setStockProductSearch } =
    useWorkTrackingContext();
  const [data, setData] = useState([]);
  const dummyInfo = [
    {
      workOrderCode: 1234,
      amount: 1000,
    },
  ];

  useEffect(() => {
    const getFiberCodes = async () => {
      const querySnapshot = await getDocs(collection(db, "workOrderLists"));
      const fiberCodeDocs = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        fiberCodeDocs.push({ ...doc.data(), id: doc.id });
      });
      const mergedArray = fiberCodeDocs.flatMap((obj) => obj.arr);
      setData(mergedArray);
    };
    getFiberCodes();
  }, []);
  const filteredData = data.filter((item) =>
    item.workOrderCode.includes(
      stockProductSearch.toLocaleLowerCase("tr").replace(/\s+/g, "")
    )
  );
  return (
    <>
      {ready && (
        <StockSearch
          query={stockProductSearch}
          setQuery={setStockProductSearch}
        />
      )}
      <section className="flex-1 relative">
        <div className="absolute inset-0 overflow-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 auto-rows-min">
          {ready &&
            filteredData.map((item, index) => (
              <ProductCard
                key={index}
                label={item.workOrderCode}
                amount={item.amount}
              />
            ))}
          <div className="text-center text-blue-500 dark:text-green-500">
            Yakında kullanıma açılacak!
          </div>
        </div>
      </section>
    </>
  );
}
