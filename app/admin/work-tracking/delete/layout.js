import AsideBar from "@/components/AsideBar";
import {
  RocketLaunchIcon,
  PuzzlePieceIcon,
  SparklesIcon,
  PaintBrushIcon,
  BuildingStorefrontIcon,
  UserIcon,
  TruckIcon,
  SwatchIcon,
  ReceiptRefundIcon,
  ArrowTrendingDownIcon,
} from "@heroicons/react/24/outline";

export default function DeleteLayout({ children }) {
  const asideBarCreateLinks = [
    {
      id: 1,
      title: "Ürün İş Emri",
      href: "/admin/work-tracking/delete/work-order",
      icon: <RocketLaunchIcon className="w-5" />,
    },
    {
      id: 2,
      title: "İade Ürün İş Emri",
      href: "/admin/work-tracking/delete/return-work-order",
      icon: <ReceiptRefundIcon className="w-5" />,
    },
    {
      id: 3,
      title: "İplik İş Emri",
      href: "/admin/work-tracking/delete/fiber-order",
      icon: <PuzzlePieceIcon className="w-5" />,
    },
    {
      id: 4,
      title: "İade İplik İş Emri",
      href: "/admin/work-tracking/delete/return-fiber-order",
      icon: <ArrowTrendingDownIcon className="w-5" />,
    },
    {
      id: 5,
      title: "İplik Kodu",
      href: "/admin/work-tracking/delete/fiber-code",
      icon: <SparklesIcon className="w-5" />,
    },
    {
      id: 6,
      title: "İplik Türü",
      href: "/admin/work-tracking/delete/fiber-type",
      icon: <SwatchIcon className="w-5" />,
    },
    {
      id: 7,
      title: "Renk",
      href: "/admin/work-tracking/delete/color",
      icon: <PaintBrushIcon className="w-5" />,
    },
    {
      id: 8,
      title: "Fason",
      href: "/admin/work-tracking/delete/subcontractor",
      icon: <BuildingStorefrontIcon className="w-5" />,
    },
    {
      id: 9,
      title: "Müşteri",
      href: "/admin/work-tracking/delete/customer",
      icon: <UserIcon className="w-5" />,
    },
    {
      id: 10,
      title: "Fason Takipçisi",
      href: "/admin/work-tracking/delete/subcontractor-follower",
      icon: <TruckIcon className="w-5" />,
    },
  ];
  return (
    <div className="flex-1 flex  gap-6">
      <div className="flex-1">
        <AsideBar links={asideBarCreateLinks} />
      </div>
      <div className="flex-[5]">{children}</div>
    </div>
  );
}
