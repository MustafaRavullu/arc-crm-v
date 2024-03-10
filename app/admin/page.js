"use client";

import BarGraph from "@/components/BarGraph";
import Card from "@/components/Card";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase.config";
import {
  RocketLaunchIcon,
  BoltIcon,
  PuzzlePieceIcon,
  SparklesIcon,
  CircleStackIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [allOrders, setAllOrders] = useState([]);
  useEffect(() => {
    const getWorkOrders = async () => {
      const querySnapshot = await getDocs(collection(db, "workOrders"));
      let orders = [];
      querySnapshot.forEach((doc) => {
        orders.push({ ...doc.data(), id: doc.id });
      });
      setAllOrders(orders);
    };
    getWorkOrders();
  }, []);
  const productStories = [];
  const fiberStories = [];
  allOrders.forEach((item) => {
    if (
      item.productType === "ürün" &&
      item.stories.length !== 0 &&
      item.stories.some(
        (inner) =>
          inner.transactionPointType === "Bitmiş Ürün Deposu" ||
          inner.transactionPointType === "Müşteri"
      )
    ) {
      productStories.push(item.stories);
    } else if (
      item.productType === "ip" &&
      item.stories.lengt !== 0 &&
      item.stories.some((inner) => inner.transactionPointType === "Müşteri")
    ) {
      fiberStories.push(item.stories);
    }
  });
  // PRODUCT SALES
  let monthlyProductSales = [
    { name: "Oca", value: 0 },
    { name: "Şub", value: 0 },
    { name: "Mar", value: 0 },
    { name: "Nis", value: 0 },
    { name: "May", value: 0 },
    { name: "Haz", value: 0 },
    { name: "Tem", value: 0 },
    { name: "Ağu", value: 0 },
    { name: "Eyl", value: 0 },
    { name: "Eki", value: 0 },
    { name: "Kas", value: 0 },
    { name: "Ara", value: 0 },
  ];
  let totalProductSales = 0;
  productStories.forEach((item) => {
    item.forEach((inner) => {
      if (
        inner.productType === "ürün" &&
        inner.transactionPointType === "Müşteri"
      ) {
        let operationMonth = inner.operationTime.split(" ")[0].split(".")[1];
        inner.productAmount.forEach((x) => {
          monthlyProductSales.forEach((item) => {
            switch (operationMonth) {
              case "01":
                if (item.name === "Oca") {
                  item.value += Number(x.amount);
                }
                break;
              case "02":
                if (item.name === "Şub") {
                  item.value += Number(x.amount);
                }
                break;
              case "03":
                if (item.name === "Mar") {
                  item.value += Number(x.amount);
                }
                break;
              case "04":
                if (item.name === "Nis") {
                  item.value += Number(x.amount);
                }
                break;
              case "05":
                if (item.name === "May") {
                  item.value += Number(x.amount);
                }
                break;
              case "06":
                if (item.name === "Haz") {
                  item.value += Number(x.amount);
                }
                break;
              case "07":
                if (item.name === "Tem") {
                  item.value += Number(x.amount);
                }
                break;
              case "08":
                if (item.name === "Ağu") {
                  item.value += Number(x.amount);
                }
                break;
              case "09":
                if (item.name === "Eyl") {
                  item.value += Number(x.amount);
                }
                break;
              case "10":
                if (item.name === "Eki") {
                  item.value += Number(x.amount);
                }
                break;
              case "11":
                if (item.name === "Kas") {
                  item.value += Number(x.amount);
                }
                break;
              case "12":
                if (item.name === "Ara") {
                  item.value += Number(x.amount);
                }
                break;
              default:
                break;
            }
          });
          totalProductSales += Number(x.amount);
        });
      }
    });
  });

  // PRODUCTION
  let monthlyProduction = [
    { name: "Oca", value: 0 },
    { name: "Şub", value: 0 },
    { name: "Mar", value: 0 },
    { name: "Nis", value: 0 },
    { name: "May", value: 0 },
    { name: "Haz", value: 0 },
    { name: "Tem", value: 0 },
    { name: "Ağu", value: 0 },
    { name: "Eyl", value: 0 },
    { name: "Eki", value: 0 },
    { name: "Kas", value: 0 },
    { name: "Ara", value: 0 },
  ];
  let totalProduction = 0;
  productStories.forEach((item) => {
    item.forEach((inner) => {
      if (
        inner.productType === "ürün" &&
        inner.transactionPointType === "Bitmiş Ürün Deposu" &&
        inner.operationType === "Teslim Et"
      ) {
        let operationMonth = inner.operationTime.split(" ")[0].split(".")[1];
        inner.productAmount.forEach((x) => {
          monthlyProduction.forEach((item) => {
            switch (operationMonth) {
              case "01":
                if (item.name === "Oca") {
                  item.value += Number(x.amount);
                }
                break;
              case "02":
                if (item.name === "Şub") {
                  item.value += Number(x.amount);
                }
                break;
              case "03":
                if (item.name === "Mar") {
                  item.value += Number(x.amount);
                }
                break;
              case "04":
                if (item.name === "Nis") {
                  item.value += Number(x.amount);
                }
                break;
              case "05":
                if (item.name === "May") {
                  item.value += Number(x.amount);
                }
                break;
              case "06":
                if (item.name === "Haz") {
                  item.value += Number(x.amount);
                }
                break;
              case "07":
                if (item.name === "Tem") {
                  item.value += Number(x.amount);
                }
                break;
              case "08":
                if (item.name === "Ağu") {
                  item.value += Number(x.amount);
                }
                break;
              case "09":
                if (item.name === "Eyl") {
                  item.value += Number(x.amount);
                }
                break;
              case "10":
                if (item.name === "Eki") {
                  item.value += Number(x.amount);
                }
                break;
              case "11":
                if (item.name === "Kas") {
                  item.value += Number(x.amount);
                }
                break;
              case "12":
                if (item.name === "Ara") {
                  item.value += Number(x.amount);
                }
                break;
              default:
                break;
            }
          });
          totalProduction += Number(x.amount);
        });
      }
    });
  });

  // FIBER SALES
  let monthlyFiberSales = [
    { name: "Oca", value: 0 },
    { name: "Şub", value: 0 },
    { name: "Mar", value: 0 },
    { name: "Nis", value: 0 },
    { name: "May", value: 0 },
    { name: "Haz", value: 0 },
    { name: "Tem", value: 0 },
    { name: "Ağu", value: 0 },
    { name: "Eyl", value: 0 },
    { name: "Eki", value: 0 },
    { name: "Kas", value: 0 },
    { name: "Ara", value: 0 },
  ];
  let totalFiberSales = 0;
  fiberStories.forEach((item) => {
    item.forEach((inner) => {
      if (
        inner.productType === "ip" &&
        inner.transactionPointType === "Müşteri"
      ) {
        let operationMonth = inner.operationTime.split(" ")[0].split(".")[1];
        inner.fiberAmount.forEach((x) => {
          monthlyFiberSales.forEach((item) => {
            switch (operationMonth) {
              case "01":
                if (item.name === "Oca") {
                  item.value +=
                    x.unit === "Ton"
                      ? Number(x.amount) * 1000
                      : Number(x.amount);
                }
                break;
              case "02":
                if (item.name === "Şub") {
                  item.value +=
                    x.unit === "Ton"
                      ? Number(x.amount) * 1000
                      : Number(x.amount);
                }
                break;
              case "03":
                if (item.name === "Mar") {
                  item.value +=
                    x.unit === "Ton"
                      ? Number(x.amount) * 1000
                      : Number(x.amount);
                }
                break;
              case "04":
                if (item.name === "Nis") {
                  item.value +=
                    x.unit === "Ton"
                      ? Number(x.amount) * 1000
                      : Number(x.amount);
                }
                break;
              case "05":
                if (item.name === "May") {
                  item.value +=
                    x.unit === "Ton"
                      ? Number(x.amount) * 1000
                      : Number(x.amount);
                }
                break;
              case "06":
                if (item.name === "Haz") {
                  item.value +=
                    x.unit === "Ton"
                      ? Number(x.amount) * 1000
                      : Number(x.amount);
                }
                break;
              case "07":
                if (item.name === "Tem") {
                  item.value +=
                    x.unit === "Ton"
                      ? Number(x.amount) * 1000
                      : Number(x.amount);
                }
                break;
              case "08":
                if (item.name === "Ağu") {
                  item.value +=
                    x.unit === "Ton"
                      ? Number(x.amount) * 1000
                      : Number(x.amount);
                }
                break;
              case "09":
                if (item.name === "Eyl") {
                  item.value +=
                    x.unit === "Ton"
                      ? Number(x.amount) * 1000
                      : Number(x.amount);
                }
                break;
              case "10":
                if (item.name === "Eki") {
                  item.value +=
                    x.unit === "Ton"
                      ? Number(x.amount) * 1000
                      : Number(x.amount);
                }
                break;
              case "11":
                if (item.name === "Kas") {
                  item.value +=
                    x.unit === "Ton"
                      ? Number(x.amount) * 1000
                      : Number(x.amount);
                }
                break;
              case "12":
                if (item.name === "Ara") {
                  item.value +=
                    x.unit === "Ton"
                      ? Number(x.amount) * 1000
                      : Number(x.amount);
                }
                break;
              default:
                break;
            }
          });
          totalFiberSales +=
            x.unit === "Ton" ? Number(x.amount) * 1000 : Number(x.amount);
        });
      }
    });
  });
  const cardInfos = [
    {
      id: 1,
      title: "Toplam Ürün Satışı",
      icon: <RocketLaunchIcon className="w-5" />,
      value: totalProductSales,
      unit: "Adet",
    },
    // {
    //   id: 2,
    //   title: "Haftalık Ürün Satışı",
    //   icon: <BoltIcon className="w-5" />,
    //   value: 1000,
    //   unit: "Adet",
    // },
    {
      id: 3,
      title: "Toplam İp Satışı",
      icon: <PuzzlePieceIcon className="w-5" />,
      value: totalFiberSales,
      unit: "Kg",
    },
    // {
    //   id: 4,
    //   title: "Haftalık İp Satışı",
    //   icon: <SparklesIcon className="w-5" />,
    //   value: 2,
    //   unit: "Ton",
    // },
    {
      id: 5,
      title: "Toplam Üretim",
      icon: <CircleStackIcon className="w-5" />,
      value: totalProduction,
      unit: "Adet",
    },
    // {
    //   id: 6,
    //   title: "Haftalık Üretim",
    //   icon: <Square3Stack3DIcon className="w-5" />,
    //   value: 300,
    //   unit: "Adet",
    // },
  ];
  const salesData = [
    {
      id: 1,
      type: "product",
      color: "#e6ff00",
      title: "Aylık Ürün Satışları",
      baseType: "monthlyProductSales",
      data: [
        {
          id: 1,
          year: 2024,
          data: monthlyProductSales,
        },
      ],
    },
    {
      id: 2,
      type: "fiber",
      color: "#66ff00",
      title: "Aylık İp Satışları",
      baseType: "monthlyFiberSales",
      data: [
        {
          id: 1,
          year: 2024,
          data: monthlyFiberSales,
        },
      ],
    },
    {
      id: 3,
      type: "product",
      color: "#ffcc00",
      title: "Aylık Üretim",
      baseType: "monthlyProductProduction",
      data: [
        {
          id: 1,
          year: 2024,
          data: monthlyProduction,
        },
      ],
    },
  ];
  return (
    <div className="flex-1 flex flex-col gap-6 p-6">
      <div className="grid md:grid-cols-3 gap-6">
        {cardInfos.map((item) => (
          <Card key={item.id} {...item} shadow={"shadow-md"} />
        ))}
      </div>
      <div className="md:flex-1 h-[1000px] md:h-auto grid md:grid-cols-3 gap-6">
        {salesData.map((item, index) => (
          <BarGraph
            key={index}
            data={item.data}
            nameKey={"name"}
            valueKey={"value"}
            color={item.color}
            title={item.title}
            isYearSelectOn={true}
            type={item.type}
          />
        ))}
      </div>
    </div>
  );
}
