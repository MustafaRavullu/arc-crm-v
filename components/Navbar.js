"use client";

import { useWorkTrackingContext } from "@/contexts/workTrackingContext";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Dropdown from "./Dropdown";
import {
  BoltIcon,
  CheckBadgeIcon,
  EllipsisHorizontalIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

export default function Navbar() {
  const { data: session } = useSession();
  const titles = [
    {
      id: 1,
      path: "work-tracking",
      label: "İŞ TAKİP",
    },
  ];
  const navbarLinks = [
    {
      id: 1,
      href: "/admin/work-tracking/active-work-orders",
      label: "Aktif İş Emirleri",
      role: ["admin", "watcher"],
      icon: <BoltIcon className="w-5" />,
    },
    {
      id: 2,
      href: "/admin/work-tracking/completed-work-orders",
      label: "Tamamlanmış İş Emirleri",
      role: ["admin", "watcher"],
      icon: <CheckBadgeIcon className="w-5" />,
    },
    {
      id: 3,
      href: "/admin/work-tracking/create",
      label: "Oluştur",
      role: ["admin"],
      icon: <PlusCircleIcon className="w-5" />,
    },
    {
      id: 4,
      href: "/admin/work-tracking/edit",
      label: "Düzenle",
      role: ["admin"],
      icon: <PencilSquareIcon className="w-5" />,
    },
    {
      id: 5,
      href: "/admin/work-tracking/delete",
      label: "Sil",
      role: ["admin"],
      icon: <TrashIcon className="w-5" />,
    },
  ];
  const filteredNavbarLinks = navbarLinks.filter((item) =>
    item.role.includes(session?.user?.role)
  );
  const pathname = usePathname();
  const { setSelectedWorkOrder, workOrders, selectedWorkOrder } =
    useWorkTrackingContext();
  useEffect(() => {
    setSelectedWorkOrder(null);
  }, [pathname]);
  return (
    <nav className="flex justify-between">
      <div className="font-bold text-4xl">
        {titles.map((item) => pathname.includes(item.path) && item.label)}
      </div>
      <div className=" hidden md:flex">
        {filteredNavbarLinks.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={`flex justify-center items-center font-semibold py-2.5 px-5 rounded-lg ${
              pathname.includes(item.href) &&
              "bg-arc_black text-white dark:bg-white dark:text-black"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
      <div className="flex md:hidden">
        <Dropdown buttonContent={<EllipsisHorizontalIcon className="w-7" />}>
          <div className="h-full border rounded-lg w-full p-3">
            {filteredNavbarLinks.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`flex items-center gap-2 text-left whitespace-nowrap  font-semibold py-2.5 px-5 rounded-lg ${
                  pathname.includes(item.href) &&
                  "bg-arc_black text-white dark:bg-white dark:text-black"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>
        </Dropdown>
      </div>
    </nav>
  );
}
