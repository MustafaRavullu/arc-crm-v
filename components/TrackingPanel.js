"use client";

import { useWorkTrackingContext } from "@/contexts/workTrackingContext";
import TransactionPointList from "./TransactionPointList";
import TransactionPointStories from "./TransactionPointStories";

export default function TrackingPanel() {
  const { selectedWorkOrder, selectedTransactionPoint } =
    useWorkTrackingContext();
  const transactionPoints = [
    {
      id: 1,
      productType: "ürün",
      data: [
        {
          id: 1,
          type: "ipdeposu",
          label: "İp Deposu",
        },
        {
          id: 2,
          type: "dokuma",
          label: "Dokuma",
        },
        {
          id: 3,
          type: "konfeksiyon",
          label: "Konfeksiyon",
        },
        {
          id: 4,
          type: "ütü",
          label: "Ütü",
        },
        {
          id: 5,
          type: "aksesuar",
          label: "Aksesuar",
        },
        {
          id: 6,
          type: "yıkama",
          label: "Yıkama",
        },
        {
          id: 7,
          type: "bitmişmaldeposu",
          label: "Bitmiş Mal Deposu",
        },
        {
          id: 8,
          type: "müşteri",
          label: "Müşteri",
        },
      ],
    },
    {
      id: 2,
      productType: "ip",
      data: [
        {
          id: 1,
          type: "ipdeposu",
          label: "İp Deposu",
        },
        {
          id: 2,
          type: "müşteri",
          label: "Müşteri",
        },
      ],
    },
  ];
  return (
    <div className="h-full flex p-6 gap-6">
      <div className="flex-[2]">
        <TransactionPointList
          data={
            selectedWorkOrder.productType === "ürün"
              ? transactionPoints[0].data
              : transactionPoints[1].data
          }
        />
      </div>
      <div className="flex-[5]">
        <TransactionPointStories
          data={selectedWorkOrder.stories.filter(
            (item) => item.transactionPointType === selectedTransactionPoint
          )}
        />
      </div>
    </div>
  );
}
