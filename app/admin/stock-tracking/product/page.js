"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase.config";
import ProductStockCard from "@/components/ProductStockCard";
import { SparklesIcon } from "@heroicons/react/24/solid";

export default function Product() {
  const [activeOrders, setActiveOrders] = useState([]);
  useEffect(() => {
    const getWorkOrders = async () => {
      let orders = [];
      const q = query(
        collection(db, "workOrders"),
        where("active", "==", true),
        where("productType", "==", "ürün")
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        orders.push({ ...doc.data(), id: doc.id });
      });
      setActiveOrders(orders);
    };
    getWorkOrders();
  }, []);
  const isAvailableInStock = activeOrders.some((item) =>
    item.stories.some(
      (element) => element.transactionPointType === "Bitmiş Ürün Deposu"
    )
  );
  return (
    <main className=" flex-1 flex flex-col gap-6">
      <section className="flex-1  relative">
        <div className="absolute inset-0 overflow-auto grid grid-cols-1 auto-rows-min md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {isAvailableInStock ? (
            activeOrders.map((item) => (
              <ProductStockCard
                key={item.id}
                workOrder={item.workOrderCode}
                stories={item.stories}
              />
            ))
          ) : (
            <div className="absolute inset-0 flex justify-center items-center font-bold text-xl gap-5">
              <SparklesIcon className="w-10" />
              Depoda şu an ürün yok.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
