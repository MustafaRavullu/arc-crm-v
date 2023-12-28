import BarGraph from "@/components/BarGraph";
import Card from "@/components/Card";
import { db } from "@/firebase.config";
import {
  RocketLaunchIcon,
  BoltIcon,
  PuzzlePieceIcon,
  SparklesIcon,
  CircleStackIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/24/outline";

export default async function AdminDashboard() {
  const cardInfos = [
    {
      id: 1,
      title: "Toplam Ürün Satışı",
      icon: <RocketLaunchIcon className="w-5" />,
      value: 5000,
      unit: "Adet",
    },
    {
      id: 2,
      title: "Haftalık Ürün Satışı",
      icon: <BoltIcon className="w-5" />,
      value: 1000,
      unit: "Adet",
    },
    {
      id: 3,
      title: "Toplam İp Satışı",
      icon: <PuzzlePieceIcon className="w-5" />,
      value: 12,
      unit: "Ton",
    },
    {
      id: 4,
      title: "Haftalık İp Satışı",
      icon: <SparklesIcon className="w-5" />,
      value: 2,
      unit: "Ton",
    },
    {
      id: 5,
      title: "Toplam Üretim",
      icon: <CircleStackIcon className="w-5" />,
      value: 1234,
      unit: "Adet",
    },
    {
      id: 6,
      title: "Haftalık Üretim",
      icon: <Square3Stack3DIcon className="w-5" />,
      value: 300,
      unit: "Adet",
    },
  ];
  const salesData = [
    {
      id: 1,
      type: "product",
      color: "#e6ff00",
      title: "Aylık Ürün Satışları",
      data: [
        {
          id: 1,
          year: 2023,
          data: [
            { name: "Oca", value: 1250 },
            { name: "Şub", value: 1100 },
            { name: "Mar", value: 1350 },
            { name: "Nis", value: 1400 },
            { name: "May", value: 1150 },
            { name: "Haz", value: 1300 },
            { name: "Tem", value: 1200 },
            { name: "Ağu", value: 1275 },
            { name: "Eyl", value: 1325 },
            { name: "Eki", value: 1225 },
            { name: "Kas", value: 1280 },
            { name: "Ara", value: 1185 },
          ],
        },
        {
          id: 2,
          year: 2024,
          data: [
            { name: "Oca", value: 1250 },
            { name: "Şub", value: 1100 },
            { name: "Mar", value: 1350 },
            { name: "Nis", value: 1400 },
            { name: "May", value: 1150 },
            { name: "Haz", value: 1300 },
            { name: "Tem", value: 1200 },
            { name: "Ağu", value: 1275 },
            { name: "Eyl", value: 1325 },
            { name: "Eki", value: 1225 },
            { name: "Kas", value: 1280 },
            { name: "Ara", value: 1185 },
          ],
        },
      ],
    },
    {
      id: 2,
      type: "fiber",
      color: "#66ff00",
      title: "Aylık İp Satışları",
      data: [
        {
          id: 1,
          year: 2023,
          data: [
            { name: "Oca", value: 1250 },
            { name: "Şub", value: 1100 },
            { name: "Mar", value: 1350 },
            { name: "Nis", value: 1400 },
            { name: "May", value: 1150 },
            { name: "Haz", value: 1300 },
            { name: "Tem", value: 1200 },
            { name: "Ağu", value: 1275 },
            { name: "Eyl", value: 1325 },
            { name: "Eki", value: 1225 },
            { name: "Kas", value: 1280 },
            { name: "Ara", value: 1185 },
          ],
        },
        {
          id: 2,
          year: 2024,
          data: [
            { name: "Oca", value: 1250 },
            { name: "Şub", value: 1100 },
            { name: "Mar", value: 1350 },
            { name: "Nis", value: 1400 },
            { name: "May", value: 1150 },
            { name: "Haz", value: 1300 },
            { name: "Tem", value: 1200 },
            { name: "Ağu", value: 1275 },
            { name: "Eyl", value: 1325 },
            { name: "Eki", value: 1225 },
            { name: "Kas", value: 1280 },
            { name: "Ara", value: 1185 },
          ],
        },
      ],
    },
    {
      id: 3,
      type: "product",
      color: "#ffcc00",
      title: "Aylık Üretim",
      data: [
        {
          id: 1,
          year: 2023,
          data: [
            { name: "Oca", value: 1250 },
            { name: "Şub", value: 1100 },
            { name: "Mar", value: 1350 },
            { name: "Nis", value: 1400 },
            { name: "May", value: 1150 },
            { name: "Haz", value: 1300 },
            { name: "Tem", value: 1200 },
            { name: "Ağu", value: 1275 },
            { name: "Eyl", value: 1325 },
            { name: "Eki", value: 1225 },
            { name: "Kas", value: 1280 },
            { name: "Ara", value: 1185 },
          ],
        },
        {
          id: 2,
          year: 2024,
          data: [
            { name: "Oca", value: 1250 },
            { name: "Şub", value: 1100 },
            { name: "Mar", value: 1350 },
            { name: "Nis", value: 1400 },
            { name: "May", value: 1150 },
            { name: "Haz", value: 1300 },
            { name: "Tem", value: 1200 },
            { name: "Ağu", value: 1275 },
            { name: "Eyl", value: 1325 },
            { name: "Eki", value: 1225 },
            { name: "Kas", value: 1280 },
            { name: "Ara", value: 1185 },
          ],
        },
      ],
    },
  ];
  return (
    <div className="flex-1 flex flex-col gap-6 p-6">
      <div className="grid md:grid-cols-6 gap-6">
        {cardInfos.map((item) => (
          <Card key={item.id} {...item} shadow={"shadow-md"} />
        ))}
      </div>
      <div className="md:flex-1 h-[700px] md:h-auto grid md:grid-cols-3 gap-6">
        {salesData.map((item) => (
          <BarGraph
            key={item.id}
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
