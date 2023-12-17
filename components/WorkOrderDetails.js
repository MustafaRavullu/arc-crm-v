"use client";

import { useWorkTrackingContext } from "@/contexts/workTrackingContext";
import {
  ClipboardDocumentListIcon,
  PlayIcon,
  UserIcon,
  StopIcon,
} from "@heroicons/react/24/outline";
import Card from "./Card";

export default function WorkOrderDetails({ productType }) {
  const { selectedWorkOrder } = useWorkTrackingContext();
  const commonDetails = [
    {
      id: 1,
      title: "Müşteri",
      icon: <UserIcon className="w-5" />,
      value: selectedWorkOrder.customer,
    },
    {
      id: 2,
      title: "Başlangıç Zamanı",
      icon: <PlayIcon className="w-5" />,
      value: selectedWorkOrder.startedAt,
    },
    {
      id: 3,
      title: "Bitiş Zamanı",
      icon: <StopIcon className="w-5" />,
      value: selectedWorkOrder.finishedAt,
    },
  ];
  const specificDetails = [
    {
      id: 1,
      title: "Gramaj",
      value: selectedWorkOrder.grammage,
    },
    {
      id: 2,
      title: "İplik Türleri",
      value: selectedWorkOrder.fiber
        ?.map((item) => item.charAt(0).toUpperCase() + item.slice(1))
        .join(", "),
    },
    {
      id: 3,
      title: "Açıklama",
      value:
        selectedWorkOrder.description?.charAt(0).toLocaleUpperCase("tr") +
        selectedWorkOrder.description?.slice(1),
    },
    {
      id: 4,
      title: "Beden Boyu",
      value: selectedWorkOrder.bedenBoy,
    },
    {
      id: 5,
      title: "Beden Eni",
      value: selectedWorkOrder.bedenEn,
    },
    {
      id: 6,
      title: "Kol Boyu",
      value: selectedWorkOrder.kolBoyu,
    },
    {
      id: 7,
      title: "Kol Pazu Ölçüsü",
      value: selectedWorkOrder.kolPazu,
    },
    {
      id: 8,
      title: "Kol Eni",
      value: selectedWorkOrder.kolEni,
    },
    {
      id: 9,
      title: "Ön Yaka Düşüklüğü",
      value: selectedWorkOrder.onYakaDusuklugu,
    },
    {
      id: 10,
      title: "Arka Yaka Düşüklüğü",
      value: selectedWorkOrder.arkaYakaDusuklugu,
    },
    {
      id: 11,
      title: "Omuz Düşüklüğü",
      value: selectedWorkOrder.omuzDusuklugu,
    },
    {
      id: 12,
      title: "Ense Ölçüsü",
      value: selectedWorkOrder.ense,
    },
    {
      id: 13,
      title: "Beden Ön Band Genişliği",
      value: selectedWorkOrder.bedenOnBandGenisligi,
    },
    {
      id: 14,
      title: "Beden Ön Band Uzunluğu",
      value: selectedWorkOrder.bedenOnBandUzunlugu,
    },
    {
      id: 15,
      title: "Beden Lastik Boyu",
      value: selectedWorkOrder.bedenLastikBoyu,
    },
    {
      id: 16,
      title: "Yaka Yüksekliği",
      value: selectedWorkOrder.yakaYuksekligi,
    },
    {
      id: 17,
      title: "Yaka Eni",
      value: selectedWorkOrder.yakaEni,
    },
    {
      id: 18,
      title: "Makina No",
      value: selectedWorkOrder.makinaNo,
    },
  ];
  return (
    <div className="p-6 flex h-full flex-col gap-6">
      {/* Başlık */}
      <div className="flex justify-between">
        <div className="font-semibold">İş Emri Detayları</div>
        <div>
          <ClipboardDocumentListIcon className="w-5" />
        </div>
      </div>
      {/* Ürün Detayları */}
      <div className="flex flex-col gap-6 h-fit">
        {commonDetails.map((item) => (
          <Card
            key={item.id}
            {...item}
            padding={"p-3"}
            valueSize={"text-2xl"}
          />
        ))}
      </div>
      {productType === "ürün" && (
        <div className="flex-1 relative">
          <div className="absolute inset-0 flex flex-col gap-6 overflow-auto">
            {specificDetails.map((item) => (
              <Card
                key={item.id}
                {...item}
                padding={"p-3"}
                valueSize={"text-2xl"}
                margin={"m-2"}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
