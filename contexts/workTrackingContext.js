"use client";

import { createContext, useContext, useState } from "react";

const WorkTrackingContext = createContext(null);

export default function WorkTrackingContextProvider({ children }) {
  // All work orders
  const [workOrders, setWorkOrders] = useState([
    {
      id: 1,
      workOrderCode: "1234-1", //1
      productType: "ürün",
      customer: "Yok",
      image: {}, // 1
      startedAt: "11.12.2023", // new Date().toLocaleDateString("tr-TR")
      finishedAt: "Devam ediyor",
      active: true,
      jobType: "normal", //1
      fiber: ["pamuk", "tiftik"],
      description: "ürünün makine numarası değişebilir",
      grammage: "300",
      bedenBoy: "45",
      bedenEn: "23",
      kolBoyu: "23",
      kolPazu: "21",
      kolEni: "233",
      onYakaDusuklugu: "21",
      arkaYakaDusuklugu: "65",
      omuzDusuklugu: "25",
      ense: "23",
      bedenOnBandGenisligi: "53",
      bedenOnBandUzunlugu: "52",
      bedenLastikBoyu: "16",
      yakaYuksekligi: "41",
      yakaEni: "35",
      makinaNo: "231",
      targetAmount: [
        {
          id: 1,
          color: "siyah",
          amount: 300,
        },
        {
          id: 2,
          color: "beyaz",
          amount: 1500,
        },
        {
          id: 3,
          color: "sarı",
          amount: 900,
        },
        {
          id: 4,
          color: "turuncu",
          amount: 1300,
        },
      ],
      stories: [
        {
          id: 1,
          operationType: "teslimEt",
          subcontractorFollower: "Mehmet",
          operationNumber: "1",
          operationTime: "12.12.2023 16:03:10",
          workOrderCode: "1234-1",
          fiberAmount: [
            {
              id: 1,
              code: "23424",
              amount: "300",
              unit: "kg",
            },
            {
              id: 2,
              code: "23423",
              amount: "11",
              unit: "kg",
            },
          ],
          transactionPointType: "ipdeposu",
          transactionPoint: "İp deposu",
        },
        {
          id: 2,
          operationType: "teslimAl",
          subcontractorFollower: "Mehmet",
          operationNumber: "2",
          operationTime: "12.12.2023 16:30:45",
          workOrderCode: "1234-1",
          productAmount: [
            {
              id: 1,
              color: "taş",
              amount: "5000",
            },
            {
              id: 2,
              color: "mavi",
              amount: "4000",
            },
          ],
          transactionPointType: "ipdeposu",
          transactionPoint: "İp deposu",
        },
        {
          id: 3,
          operationType: "teslimAl",
          subcontractorFollower: "Mehmet",
          operationNumber: "3",
          operationTime: "12.12.2023 16:30:45",
          workOrderCode: "1234-1",
          productAmount: [
            {
              id: 1,
              color: "eflatun",
              amount: "5000",
            },
            {
              id: 2,
              color: "mavi",
              amount: "4000",
            },
          ],
          transactionPointType: "ipdeposu",
          transactionPoint: "İp deposu",
        },
        {
          id: 4,
          operationType: "teslimAl",
          subcontractorFollower: "Mehmet",
          operationNumber: "4",
          operationTime: "12.12.2023 16:30:45",
          workOrderCode: "1234-1",
          productAmount: [
            {
              id: 1,
              color: "kırmızı",
              amount: "5000",
            },
            {
              id: 2,
              color: "mavi",
              amount: "4000",
            },
          ],
          transactionPointType: "yıkama",
          transactionPoint: "aydın temizlik",
        },
      ],
    },
    {
      id: 2,
      workOrderCode: "5468-1", //1
      productType: "ürün",
      image: {}, // 1
      startedAt: "11.12.2023", // new Date().toLocaleDateString("tr-TR")
      finishedAt: "Devam ediyor",
      active: false,
      jobType: "normal", //1
      fiber: ["akrilik", "pamuk"],
      description: "açıklama",
      customer: "Yok",
      grammage: "800",
      bedenBoy: "90",
      bedenEn: "23",
      kolBoyu: "23",
      kolPazu: "21",
      kolEni: "233",
      onYakaDusuklugu: "21",
      arkaYakaDusuklugu: "65",
      omuzDusuklugu: "25",
      ense: "23",
      bedenOnBandGenisligi: "53",
      bedenOnBandUzunlugu: "52",
      bedenLastikBoyu: "16",
      yakaYuksekligi: "41",
      yakaEni: "35",
      makinaNo: "231",
      targetAmount: [
        {
          id: 1,
          color: "taş",
          amount: 300,
        },
        {
          id: 2,
          color: "eflatun",
          amount: 1500,
        },
        {
          id: 3,
          color: "sarı",
          amount: 900,
        },
        {
          id: 4,
          color: "turuncu",
          amount: 1300,
        },
      ],
      stories: [
        {
          id: 1,
          operationType: "teslimAl",
          subcontractorFollower: "veli",
          operationNumber: "1",
          operationTime: "12.12.2023 16:03:10",
          workOrderCode: "1234-1",
          fiberAmount: [
            {
              id: 1,
              code: "23424",
              amount: "300",
              unit: "kg",
            },
            {
              id: 2,
              code: "21564",
              amount: "20",
              unit: "kg",
            },
          ],
          transactionPointType: "yıkama",
          transactionPoint: "eflatun temizlik",
        },
        {
          id: 2,
          operationType: "teslimEt",
          subcontractorFollower: "ahmet",
          operationNumber: "2",
          operationTime: "12.12.2023 16:30:45",
          workOrderCode: "1234-1",
          productAmount: [
            {
              id: 1,
              color: "kırmızı",
              amount: "5000",
            },
            {
              id: 2,
              color: "mavi",
              amount: "4000",
            },
          ],
          transactionPointType: "ipDeposu",
          transactionPoint: "İp deposu",
        },
        {
          id: 3,
          operationType: "teslimAl",
          subcontractorFollower: "Mehmet",
          operationNumber: "3",
          operationTime: "12.12.2023 16:30:45",
          workOrderCode: "1234-1",
          productAmount: [
            {
              id: 1,
              color: "kırmızı",
              amount: "5000",
            },
            {
              id: 2,
              color: "mavi",
              amount: "4000",
            },
          ],
          transactionPointType: "aksesuar",
          transactionPoint: "aksesuarcı semih",
        },
        {
          id: 4,
          operationType: "teslimAl",
          subcontractorFollower: "Mehmet",
          operationNumber: "4",
          operationTime: "12.12.2023 16:30:45",
          workOrderCode: "1234-1",
          productAmount: [
            {
              id: 1,
              color: "kırmızı",
              amount: "5000",
            },
            {
              id: 2,
              color: "mavi",
              amount: "4000",
            },
          ],
          transactionPointType: "ütü",
          transactionPoint: "aydın ütü",
        },
      ],
    },
    {
      id: 3,
      workOrderCode: "5998-1",
      productType: "ip",
      customer: "Yok",
      image: {},
      startedAt: "13.12.2023",
      finishedAt: "Devam ediyor",
      active: true,
      jobType: "normal",
      targetAmount: [
        {
          id: 1,
          code: "23424",
          amount: "300",
          unit: "kg",
        },
      ],
      stories: [
        {
          id: 1,
          operationNumber: "1",
          operationType: "Teslim Et",
          operationTime: "13:11:2023 15:45:03",
          subcontractorFollower: "Mehmet",
          fiberAmount: [
            {
              id: 1,
              code: "23424",
              amount: "300",
              unit: "kg",
            },
          ],
          workOrderCode: "",
          transactionPointType: "ipdeposu",
          transactionPoint: "İp deposu",
        },
        {
          id: 2,
          operationNumber: "2",
          operationType: "Teslim Et",
          operationTime: "14.11.2023 17:45:50",
          subcontractorFollower: "Mehmet",
          fiberAmount: [
            {
              id: 1,
              code: "23424",
              amount: "300",
              unit: "kg",
            },
          ],
          workOrderCode: "",
          transactionPointType: "müşteri",
          transactionPoint: "Kemal",
        },
      ],
    },
    {
      id: 4,
      workOrderCode: "9514-1",
      productType: "ip",
      customer: "Necati Uyumaz",
      image: {},
      startedAt: "13.12.2023",
      finishedAt: "13.12.2023",
      active: false,
      jobType: "normal",
      targetAmount: [
        {
          id: 1,
          code: "23424",
          amount: "300",
          unit: "kg",
        },
      ],
      stories: [
        {
          id: 1,
          operationNumber: "1",
          operationType: "Teslim Et",
          operationTime: "13:11:2023 15:45:03",
          subcontractorFollower: "Mehmet",
          fiberAmount: [
            {
              id: 1,
              code: "23424",
              amount: "300",
              unit: "kg",
            },
          ],
          workOrderCode: "",
          transactionPointType: "ipdeposu",
          transactionPoint: "İp deposu",
        },
        {
          id: 2,
          operationNumber: "2",
          operationType: "Teslim Et",
          operationTime: "14.11.2023 17:45:50",
          subcontractorFollower: "Mehmet",
          fiberAmount: [
            {
              id: 1,
              code: "23424",
              amount: "300",
              unit: "kg",
            },
          ],
          workOrderCode: "",
          transactionPointType: "müşteri",
          transactionPoint: "Necati Uyumaz",
        },
      ],
    },
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
  const [colors, setColors] = useState([
    {
      id: 1,
      color: "Siyah",
    },
    {
      id: 2,
      color: "Beyaz",
    },
    {
      id: 3,
      color: "Taş",
    },
    {
      id: 4,
      color: "Kırmızı",
    },
  ]);
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
      type: "aksesuar",
    },
    {
      id: 2,
      name: "mehmet",
      type: "ütü",
    },
    {
      id: 3,
      name: "veli",
      type: "dokuma",
    },
    {
      id: 4,
      name: "can",
      type: "konfeksiyon",
    },
    {
      id: 5,
      name: "tufan",
      type: "yıkama",
    },
  ]);
  const [selectedWorkOrder, setSelectedWorkOrder] = useState(workOrders[0]);
  const [selectedTransactionPoint, setSelectedTransactionPoint] =
    useState("ipdeposu");
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
