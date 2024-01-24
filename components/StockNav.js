"use client";

import { useWorkTrackingContext } from "@/contexts/workTrackingContext";
import Link from "next/link";

export default function StockNav() {
  const {
    activePage,
    setActivePage,
    setStockFiberSearch,
    setStockProductSearch,
  } = useWorkTrackingContext();
  return (
    <nav className="flex justify-between items-center">
      <div className="font-bold text-lg whitespace-nowrap">STOK TAKİP</div>
      <div className="flex gap-3">
        <Link
          onClick={() => {
            setActivePage("ip");
            setStockFiberSearch("");
            setStockProductSearch("");
          }}
          href={"/admin/stock-tracking/fiber"}
          className={`${
            activePage === "ip"
              ? "bg-black dark:bg-white text-white dark:text-black"
              : "bg-transparent"
          } p-3 rounded-lg font-bold w-[75px] flex justify-center items-center md:w-[100px] `}
        >
          İp
        </Link>
        <Link
          onClick={() => {
            setActivePage("ürün");
            setStockFiberSearch("");
            setStockProductSearch("");
          }}
          href={"/admin/stock-tracking/product"}
          className={`${
            activePage === "ürün"
              ? "bg-black dark:bg-white text-white dark:text-black"
              : "bg-transparent"
          } p-3 rounded-lg font-bold w-[75px]  flex justify-center items-center md:w-[100px] `}
        >
          Ürün
        </Link>
      </div>
    </nav>
  );
}
