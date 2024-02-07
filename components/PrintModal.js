"use client";

import { useWorkTrackingContext } from "@/contexts/workTrackingContext";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { forwardRef, useRef } from "react";
import { useReactToPrint } from "react-to-print";

const PrintModal = forwardRef(function PrintModal({}, ref) {
  const { selectedWorkOrder } = useWorkTrackingContext();
  const printDetails = [
    {
      label: "Model No",
      attr: "workOrderCode",
    },
    {
      label: "Beden Boy",
      attr: "bedenBoy",
    },
    {
      label: "Beden Eni",
      attr: "bedenEn",
    },
    {
      label: "Kol Boyu",
      attr: "kolBoyu",
    },
    {
      label: "Kol Pazu",
      attr: "kolPazu",
    },
    {
      label: "Kol Eni",
      attr: "kolEni",
    },
    {
      label: "Ön Yaka Düşüklüğü",
      attr: "onYakaDusuklugu",
    },
    {
      label: "Arka Yaka Düşüklüğü",
      attr: "arkaYakaDusuklugu",
    },
    {
      label: "Omuz Düşüklüğü",
      attr: "omuzDusuklugu",
    },
    {
      label: "İplik",
      attr: "fiber",
    },
    {
      label: "Gramaj",
      attr: "grammage",
    },
    {
      label: "Ense",
      attr: "ense",
    },
    {
      label: "Beden Ön Band Genişliği",
      attr: "bedenOnBandGenisligi",
    },
    {
      label: "Beden Ön Band Uzunluğu",
      attr: "bedenOnBandUzunlugu",
    },
    {
      label: "Beden Lastik Boyu",
      attr: "bedenLastikBoyu",
    },
    {
      label: "Yaka Yüksekliği",
      attr: "yakaYuksekligi",
    },
    {
      label: "Yaka Eni",
      attr: "yakaEni",
    },
    {
      label: "Makina No",
      attr: "makinaNo",
    },
  ];
  const printPageRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => printPageRef?.current,
  });
  return (
    <dialog ref={ref} className="h-screen w-full  md:h-[800px] md:w-[700px]">
      <div className="flex h-full flex-col gap-1 p-3">
        {!!selectedWorkOrder && (
          <div ref={printPageRef} className="flex flex-1 flex-col p-3 gap-3">
            <div className=" flex gap-3">
              {selectedWorkOrder?.image ? (
                <div className="w-1/2 aspect-auto relative">
                  <Image
                    src={selectedWorkOrder.image}
                    alt={selectedWorkOrder.workOrderCode}
                    fill={true}
                    priority
                    sizes="(min-width: 780px) calc(17.93vw - 21px), calc(100vw - 47px)"
                    className="rounded-lg"
                  />
                </div>
              ) : null}
              <div className="divide-y flex flex-col">
                {printDetails.map((item, index) => {
                  if (item.attr === "fiber") {
                    return (
                      <div className="" key={index}>
                        <span className="text-red-500 font-bold">
                          {item.label}:
                        </span>{" "}
                        {selectedWorkOrder.productType === "ürün" &&
                          selectedWorkOrder[item.attr].join(", ")}
                      </div>
                    );
                  } else {
                    return (
                      <div className="" key={index}>
                        <span className="text-red-500 font-bold">
                          {item.label}:
                        </span>{" "}
                        {selectedWorkOrder[item.attr] !== ""
                          ? selectedWorkOrder[item.attr]
                          : "-"}
                      </div>
                    );
                  }
                })}
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="flex flex-col gap-2">
                <span className="font-extrabold underline">HEDEF MİKTAR</span>
                <div className="flex flex-col gap-1 flex-wrap">
                  {selectedWorkOrder.targetAmount.length !== 0
                    ? selectedWorkOrder.targetAmount.map((item, index) => (
                        <div key={index} className="flex gap-3">
                          {item.color} <ArrowRightIcon className="w-5" />{" "}
                          <span className="text-red-500 font-bold">
                            {item.amount}
                          </span>{" "}
                          adet
                        </div>
                      ))
                    : "Belirtilmedi"}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-extrabold underline">AÇIKLAMA</span>
                <div>
                  {selectedWorkOrder.description !== ""
                    ? selectedWorkOrder.description
                    : "-"}
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="flex justify-between">
          <button
            type="button"
            className="py-2 px-4 border rounded-lg"
            onClick={() => ref?.current?.close()}
          >
            Vazgeç
          </button>
          <button type="button" onClick={handlePrint} className="simple_button">
            Yazdır
          </button>
        </div>
      </div>
    </dialog>
  );
});

export default PrintModal;
