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
          type: "İp Deposu",
          label: "İp Deposu",
        },
        {
          id: 2,
          type: "Dokuma",
          label: "Dokuma",
        },
        {
          id: 3,
          type: "Konfeksiyon",
          label: "Konfeksiyon",
        },
        {
          id: 4,
          type: "Ütü",
          label: "Ütü",
        },
        {
          id: 5,
          type: "Aksesuar",
          label: "Aksesuar",
        },
        {
          id: 6,
          type: "Yıkama",
          label: "Yıkama",
        },
        {
          id: 7,
          type: "Bitmiş Ürün Deposu",
          label: "Bitmiş Ürün Deposu",
        },
        {
          id: 8,
          type: "Müşteri",
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
          type: "İp Deposu",
          label: "İp Deposu",
        },
        {
          id: 2,
          type: "Müşteri",
          label: "Müşteri",
        },
      ],
    },
  ];
  return (
    <div className="h-full flex flex-col md:flex-row p-6 gap-6">
      <div className="md:flex-[2] h-[40px] md:h-auto ">
        <TransactionPointList
          data={
            selectedWorkOrder.productType === "ürün"
              ? transactionPoints[0].data
              : transactionPoints[1].data
          }
        />
      </div>
      <div className="md:flex-[5] h-[500px] md:h-auto">
        <TransactionPointStories
          data={selectedWorkOrder.stories.filter(
            (item) => item.transactionPointType === selectedTransactionPoint
          )}
        />
      </div>
    </div>
  );
}
