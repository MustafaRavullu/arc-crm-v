"use client";

import {
  MinusIcon,
  PencilIcon,
  PlusIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import { useRef } from "react";
import StockFiberAddModal from "./StockFiberAddModal";
import StockFiberSubtractModal from "./StockFiberSubtractModal";

export default function FiberCard({ label, amount, compare, data }) {
  const subtractRef = useRef(null);
  const addRef = useRef(null);
  return (
    <>
      <StockFiberAddModal
        ref={addRef}
        label={label}
        compare={compare}
        data={data}
      />
      <StockFiberSubtractModal
        ref={subtractRef}
        label={label}
        compare={compare}
        data={data}
      />
      <div className="flex flex-col justify-between h-[135px] border border-black dark:border-white rounded-lg p-3">
        <div className="flex justify-between">
          <div className="font-bold">{label}</div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => subtractRef?.current?.showModal()}
              className="bg-arc_black rounded-lg dark:bg-white text-white dark:text-black p-2"
            >
              <MinusIcon className="w-5" />
            </button>
            <button
              type="button"
              onClick={() => addRef?.current?.showModal()}
              className="bg-arc_black rounded-lg dark:bg-white text-white dark:text-black p-2"
            >
              <PlusIcon className="w-5" />
            </button>
          </div>
        </div>
        <div className="flex justify-between items-end">
          <div className="font-bold text-4xl">{amount.toFixed(2)}</div>
          <div>Kg</div>
        </div>
      </div>
    </>
  );
}
