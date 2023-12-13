import BarGraph from "@/components/BarGraph";
import Card from "@/components/Card";
import {
  RocketLaunchIcon,
  BoltIcon,
  PuzzlePieceIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

export default function AdminDashboard() {
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
            { name: "Ocak", value: 1250 },
            { name: "Şubat", value: 1100 },
            { name: "Mart", value: 1350 },
            { name: "Nisan", value: 1400 },
            { name: "Mayıs", value: 1150 },
            { name: "Haziran", value: 1300 },
            { name: "Temmuz", value: 1200 },
            { name: "Ağustos", value: 1275 },
            { name: "Eylül", value: 1325 },
            { name: "Ekim", value: 1225 },
            { name: "Kasım", value: 1280 },
            { name: "Aralık", value: 1185 },
          ],
        },
        {
          id: 2,
          year: 2024,
          data: [
            { name: "Ocak", value: 1280 },
            { name: "Şubat", value: 1255 },
            { name: "Mart", value: 1315 },
            { name: "Nisan", value: 1260 },
            { name: "Mayıs", value: 1320 },
            { name: "Haziran", value: 1275 },
            { name: "Temmuz", value: 1305 },
            { name: "Ağustos", value: 1235 },
            { name: "Eylül", value: 1290 },
            { name: "Ekim", value: 1245 },
            { name: "Kasım", value: 1335 },
            { name: "Aralık", value: 1210 },
          ],
        },
      ],
    },
    {
      id: 2,
      type: "fiber",
      color: "#ff00e6",
      title: "Aylık İp Satışları",
      data: [
        {
          id: 1,
          year: 2023,
          data: [
            { name: "Ocak", value: 1400 },
            { name: "Şubat", value: 1180 },
            { name: "Mart", value: 1275 },
            { name: "Nisan", value: 1320 },
            { name: "Mayıs", value: 1235 },
            { name: "Haziran", value: 1290 },
            { name: "Temmuz", value: 1355 },
            { name: "Ağustos", value: 1215 },
            { name: "Eylül", value: 1260 },
            { name: "Ekim", value: 1305 },
            { name: "Kasım", value: 1195 },
            { name: "Aralık", value: 1375 },
          ],
        },
        {
          id: 2,
          year: 2024,
          data: [
            { name: "Ocak", value: 1225 },
            { name: "Şubat", value: 1310 },
            { name: "Mart", value: 1265 },
            { name: "Nisan", value: 1335 },
            { name: "Mayıs", value: 1240 },
            { name: "Haziran", value: 1285 },
            { name: "Temmuz", value: 1370 },
            { name: "Ağustos", value: 1195 },
            { name: "Eylül", value: 1300 },
            { name: "Ekim", value: 1255 },
            { name: "Kasım", value: 1345 },
            { name: "Aralık", value: 1230 },
          ],
        },
      ],
    },
  ];
  return (
    <div className="flex-1 flex flex-col gap-6 p-6">
      <div className="grid md:grid-cols-4 gap-6">
        {cardInfos.map((item) => (
          <Card key={item.id} {...item} />
        ))}
      </div>
      <div className="flex-1 grid md:grid-cols-2 gap-6">
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
