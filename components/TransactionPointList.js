"use client";

import { useWorkTrackingContext } from "@/contexts/workTrackingContext";
import { useEffect } from "react";
import {
  ChatBubbleBottomCenterTextIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";

export default function TransactionPointList({ data }) {
  const {
    selectedWorkOrder,
    selectedTransactionPoint,
    setSelectedTransactionPoint,
  } = useWorkTrackingContext();

  useEffect(() => {
    setSelectedTransactionPoint("İp Deposu");
  }, [selectedWorkOrder.productType]);
  return (
    <div className="h-full relative">
      <div className="absolute inset-0 flex flex-row overflow-auto md:flex-col gap-2 ">
        {data.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setSelectedTransactionPoint(item.type)}
            className={`text-left whitespace-nowrap py-2.5 px-6 font-semibold flex justify-between rounded-lg ${
              item.type === selectedTransactionPoint
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
            }`}
          >
            {item.label}
            <div className="flex gap-2">
              {selectedWorkOrder.stories.find(
                (x) => x.transactionPointType === item.type
              ) && (
                <div>
                  <ChatBubbleBottomCenterTextIcon className="w-5" />
                </div>
              )}
              {selectedWorkOrder.stories.length !== 0 &&
                selectedWorkOrder.stories[selectedWorkOrder.stories.length - 1]
                  .transactionPointType === item.type && (
                  <div>
                    <TruckIcon className="w-5" />
                  </div>
                )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
