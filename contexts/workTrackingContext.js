"use client";

import { createContext, useContext, useState } from "react";

const WorkTrackingContext = createContext(null);

export default function WorkTrackingContextProvider({ children }) {
  // All work orders
  const [workOrders, setWorkOrders] = useState([
    // {
    //   id: 1,
    //   workOrderCode: "1234-1", //1
    //   productType: "ürün",
    //   customer: "",
    //   image: "/57018638_85_B.avif", // 1
    //   startedAt: "11.12.2023", // new Date().toLocaleDateString("tr-TR")
    //   finishedAt: "",
    //   active: true,
    //   jobType: "normal", //1
    //   fiber: ["pamuk", "tiftik"],
    //   description: "",
    //   grammage: "",
    //   bedenBoy: "",
    //   bedenEn: "",
    //   kolBoyu: "",
    //   kolPazu: "",
    //   kolEni: "",
    //   onYakaDusuklugu: "",
    //   arkaYakaDusuklugu: "",
    //   omuzDusuklugu: "",
    //   ense: "",
    //   bedenOnBandGenisligi: "",
    //   bedenOnBandUzunlugu: "",
    //   bedenLastikBoyu: "",
    //   yakaYuksekligi: "",
    //   yakaEni: "",
    //   makinaNo: "",
    //   targetAmount: [
    //     {
    //       id: 1,
    //       color: "siyah",
    //       amount: 300,
    //     },
    //     {
    //       id: 2,
    //       color: "beyaz",
    //       amount: 1500,
    //     },
    //     {
    //       id: 3,
    //       color: "sarı",
    //       amount: 900,
    //     },
    //     {
    //       id: 4,
    //       color: "turuncu",
    //       amount: 1300,
    //     },
    //   ],
    //   stories: [
    //     {
    //       id: 1,
    //       operationType: "Teslim Al",
    //       subcontractorFollower: "Mehmet",
    //       operationNumber: "1",
    //       operationTime: "12.12.2023 16:03:10",
    //       workOrderCode: "1234-1",
    //       fiberAmount: [
    //         {
    //           id: 1,
    //           code: "23424",
    //           amount: "300",
    //           unit: "kg",
    //         },
    //         {
    //           id: 2,
    //           code: "23423",
    //           amount: "11",
    //           unit: "kg",
    //         },
    //       ],
    //       transactionPointType: "İp Deposu",
    //       transactionPoint: "İp deposu",
    //     },
    //     {
    //       id: 2,
    //       operationType: "Teslim Al",
    //       subcontractorFollower: "Mehmet",
    //       operationNumber: "2",
    //       operationTime: "12.12.2023 16:30:45",
    //       workOrderCode: "1234-1",
    //       productAmount: [
    //         {
    //           id: 1,
    //           color: "taş",
    //           amount: "5000",
    //         },
    //         {
    //           id: 2,
    //           color: "mavi",
    //           amount: "4000",
    //         },
    //       ],
    //       transactionPointType: "İp Deposu",
    //       transactionPoint: "İp deposu",
    //     },
    //     {
    //       id: 3,
    //       operationType: "Teslim Al",
    //       subcontractorFollower: "Mehmet",
    //       operationNumber: "3",
    //       operationTime: "12.12.2023 16:30:45",
    //       workOrderCode: "1234-1",
    //       productAmount: [
    //         {
    //           id: 1,
    //           color: "eflatun",
    //           amount: "5000",
    //         },
    //         {
    //           id: 2,
    //           color: "mavi",
    //           amount: "4000",
    //         },
    //       ],
    //       transactionPointType: "İp Deposu",
    //       transactionPoint: "İp deposu",
    //     },
    //     {
    //       id: 4,
    //       operationType: "Teslim Al",
    //       subcontractorFollower: "Mehmet",
    //       operationNumber: "4",
    //       operationTime: "12.12.2023 16:30:45",
    //       workOrderCode: "1234-1",
    //       productAmount: [
    //         {
    //           id: 1,
    //           color: "kırmızı",
    //           amount: "5000",
    //         },
    //         {
    //           id: 2,
    //           color: "mavi",
    //           amount: "4000",
    //         },
    //       ],
    //       transactionPointType: "Yıkama",
    //       transactionPoint: "aydın temizlik",
    //     },
    //   ],
    // },
    // {
    //   id: 2,
    //   workOrderCode: "5468-1", //1
    //   productType: "ürün",
    //   image: "/57038640_92_B.avif", // 1
    //   startedAt: "11.12.2023", // new Date().toLocaleDateString("tr-TR")
    //   finishedAt: "",
    //   active: false,
    //   jobType: "normal", //1
    //   fiber: ["akrilik", "pamuk"],
    //   description: "açıklama",
    //   customer: "",
    //   grammage: "800",
    //   bedenBoy: "90",
    //   bedenEn: "23",
    //   kolBoyu: "23",
    //   kolPazu: "21",
    //   kolEni: "233",
    //   onYakaDusuklugu: "21",
    //   arkaYakaDusuklugu: "65",
    //   omuzDusuklugu: "25",
    //   ense: "23",
    //   bedenOnBandGenisligi: "53",
    //   bedenOnBandUzunlugu: "52",
    //   bedenLastikBoyu: "16",
    //   yakaYuksekligi: "41",
    //   yakaEni: "35",
    //   makinaNo: "231",
    //   targetAmount: [
    //     {
    //       id: 1,
    //       color: "taş",
    //       amount: 300,
    //     },
    //     {
    //       id: 2,
    //       color: "eflatun",
    //       amount: 1500,
    //     },
    //     {
    //       id: 3,
    //       color: "sarı",
    //       amount: 900,
    //     },
    //     {
    //       id: 4,
    //       color: "turuncu",
    //       amount: 1300,
    //     },
    //   ],
    //   stories: [
    //     {
    //       id: 1,
    //       operationType: "Teslim Al",
    //       subcontractorFollower: "veli",
    //       operationNumber: "1",
    //       operationTime: "12.12.2023 16:03:10",
    //       workOrderCode: "1234-1",
    //       fiberAmount: [
    //         {
    //           id: 1,
    //           code: "23424",
    //           amount: "300",
    //           unit: "kg",
    //         },
    //         {
    //           id: 2,
    //           code: "21564",
    //           amount: "20",
    //           unit: "kg",
    //         },
    //       ],
    //       transactionPointType: "Yıkama",
    //       transactionPoint: "eflatun temizlik",
    //     },
    //     {
    //       id: 2,
    //       operationType: "Teslim Et",
    //       subcontractorFollower: "ahmet",
    //       operationNumber: "2",
    //       operationTime: "12.12.2023 16:30:45",
    //       workOrderCode: "1234-1",
    //       productAmount: [
    //         {
    //           id: 1,
    //           color: "kırmızı",
    //           amount: "5000",
    //         },
    //         {
    //           id: 2,
    //           color: "mavi",
    //           amount: "4000",
    //         },
    //       ],
    //       transactionPointType: "İp Deposu",
    //       transactionPoint: "İp deposu",
    //     },
    //     {
    //       id: 3,
    //       operationType: "Teslim Al",
    //       subcontractorFollower: "Mehmet",
    //       operationNumber: "3",
    //       operationTime: "12.12.2023 16:30:45",
    //       workOrderCode: "1234-1",
    //       productAmount: [
    //         {
    //           id: 1,
    //           color: "kırmızı",
    //           amount: "5000",
    //         },
    //         {
    //           id: 2,
    //           color: "mavi",
    //           amount: "4000",
    //         },
    //       ],
    //       transactionPointType: "Aksesuar",
    //       transactionPoint: "aksesuarcı semih",
    //     },
    //     {
    //       id: 4,
    //       operationType: "Teslim Al",
    //       subcontractorFollower: "Mehmet",
    //       operationNumber: "4",
    //       operationTime: "12.12.2023 16:30:45",
    //       workOrderCode: "1234-1",
    //       productAmount: [
    //         {
    //           id: 1,
    //           color: "kırmızı",
    //           amount: "5000",
    //         },
    //         {
    //           id: 2,
    //           color: "mavi",
    //           amount: "4000",
    //         },
    //       ],
    //       transactionPointType: "Ütü",
    //       transactionPoint: "aydın ütü",
    //     },
    //   ],
    // },
    // {
    //   id: 3,
    //   workOrderCode: "5998-1",
    //   productType: "ip",
    //   customer: "",
    //   image: "/dogal-jut-cuval-ipi-hasir-ip-e19652.jpg",
    //   startedAt: "13.12.2023",
    //   finishedAt: "",
    //   active: true,
    //   jobType: "normal",
    //   targetAmount: [
    //     {
    //       id: 1,
    //       code: "23424",
    //       amount: "300",
    //       unit: "kg",
    //     },
    //   ],
    //   stories: [
    //     {
    //       id: 1,
    //       operationNumber: "1",
    //       operationType: "Teslim Et",
    //       operationTime: "13:11:2023 15:45:03",
    //       subcontractorFollower: "Mehmet",
    //       fiberAmount: [
    //         {
    //           id: 1,
    //           code: "23424",
    //           amount: "300",
    //           unit: "kg",
    //         },
    //       ],
    //       workOrderCode: "",
    //       transactionPointType: "İp Deposu",
    //       transactionPoint: "İp deposu",
    //     },
    //     {
    //       id: 2,
    //       operationNumber: "2",
    //       operationType: "Teslim Et",
    //       operationTime: "14.11.2023 17:45:50",
    //       subcontractorFollower: "Mehmet",
    //       fiberAmount: [
    //         {
    //           id: 1,
    //           code: "23424",
    //           amount: "300",
    //           unit: "kg",
    //         },
    //       ],
    //       workOrderCode: "",
    //       transactionPointType: "Müşteri",
    //       transactionPoint: "Kemal",
    //     },
    //   ],
    // },
    // {
    //   id: 4,
    //   workOrderCode: "9514-1",
    //   productType: "ip",
    //   customer: "Necati Uyumaz",
    //   image:
    //     "/kagit-ip-450-500gr-no1-seker-pembe-ihal-kagit-ip-ithal-12732-15-B.jpg",
    //   startedAt: "13.12.2023",
    //   finishedAt: "13.12.2023",
    //   active: false,
    //   jobType: "normal",
    //   targetAmount: [
    //     {
    //       id: 1,
    //       code: "23424",
    //       amount: "300",
    //       unit: "kg",
    //     },
    //   ],
    //   stories: [
    //     {
    //       id: 1,
    //       operationNumber: "1",
    //       operationType: "Teslim Et",
    //       operationTime: "13:11:2023 15:45:03",
    //       subcontractorFollower: "Mehmet",
    //       fiberAmount: [
    //         {
    //           id: 1,
    //           code: "23424",
    //           amount: "300",
    //           unit: "kg",
    //         },
    //       ],
    //       workOrderCode: "",
    //       transactionPointType: "İp Deposu",
    //       transactionPoint: "İp deposu",
    //     },
    //     {
    //       id: 2,
    //       operationNumber: "2",
    //       operationType: "Teslim Et",
    //       operationTime: "14.11.2023 17:45:50",
    //       subcontractorFollower: "Mehmet",
    //       fiberAmount: [
    //         {
    //           id: 1,
    //           code: "23424",
    //           amount: "300",
    //           unit: "kg",
    //         },
    //       ],
    //       workOrderCode: "",
    //       transactionPointType: "Müşteri",
    //       transactionPoint: "Necati Uyumaz",
    //     },
    //   ],
    // },
  ]);
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "LC Waikiki",
    },
    {
      id: 2,
      name: "Koton",
    },
    {
      id: 3,
      name: "Mavi",
    },
  ]);
  const [fiberTypes, setFiberTypes] = useState([
    {
      id: 1,
      name: "Pamuk",
    },
    {
      id: 2,
      name: "Akrilik",
    },
    {
      id: 3,
      name: "Tiftik",
    },
  ]);
  const [colors, setColors] = useState([]);
  const [fiberCodes, setFiberCodes] = useState([
    {
      id: 1,
      code: "23423",
    },
    {
      id: 2,
      code: "56445",
    },
    {
      id: 3,
      code: "576434",
    },
  ]);
  const [subcontractors, setSubcontractors] = useState([
    {
      id: 1,
      name: "ahmet",
      type: "Aksesuar",
    },
    {
      id: 2,
      name: "mehmet",
      type: "Ütü",
    },
    {
      id: 3,
      name: "veli",
      type: "Dokuma",
    },
    {
      id: 4,
      name: "can",
      type: "Konfeksiyon",
    },
    {
      id: 5,
      name: "tufan",
      type: "Yıkama",
    },
  ]);
  const [selectedWorkOrder, setSelectedWorkOrder] = useState(null);
  const [selectedTransactionPoint, setSelectedTransactionPoint] =
    useState("İp Deposu");
  const [globalLoading, setGlobalLoading] = useState(false);
  return (
    <WorkTrackingContext.Provider
      value={{
        workOrders,
        setWorkOrders,
        selectedWorkOrder,
        setSelectedWorkOrder,
        selectedTransactionPoint,
        setSelectedTransactionPoint,
        customers,
        setCustomers,
        fiberTypes,
        setFiberTypes,
        colors,
        setColors,
        fiberCodes,
        setFiberCodes,
        subcontractors,
        setSubcontractors,
        globalLoading,
        setGlobalLoading,
      }}
    >
      {children}
    </WorkTrackingContext.Provider>
  );
}

export const useWorkTrackingContext = () => {
  const context = useContext(WorkTrackingContext);
  if (!context) {
    throw new Error(
      "useWorkTrackingContext must be used within a WorkTrackingContextProvider"
    );
  }
  return context;
};
