"use client";

import { useWorkTrackingContext } from "@/contexts/workTrackingContext";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

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
    },
    {
      id: 2,
      href: "/admin/work-tracking/completed-work-orders",
      label: "Tamamlanmış İş Emirleri",
      role: ["admin", "watcher"],
    },
    {
      id: 3,
      href: "/admin/work-tracking/create",
      label: "Oluştur",
      role: ["admin"],
    },
    {
      id: 4,
      href: "/admin/work-tracking/edit",
      label: "Düzenle",
      role: ["admin"],
    },
    {
      id: 5,
      href: "/admin/work-tracking/delete",
      label: "Sil",
      role: ["admin"],
    },
  ];
  const filteredNavbarLinks = navbarLinks.filter((item) =>
    item.role.includes(session?.user?.role)
  );
  const pathname = usePathname();
  const { setSelectedWorkOrder, workOrders, selectedWorkOrder } =
    useWorkTrackingContext();
  useEffect(() => {
    if (pathname === "/admin/work-tracking/active-work-orders") {
      setSelectedWorkOrder(
        workOrders.filter((item) => item.active === true)[0]
      );
    } else if (pathname === "/admin/work-tracking/completed-work-orders") {
      setSelectedWorkOrder(
        workOrders.filter((item) => item.active === false)[0]
      );
    }
  }, [pathname]);
  return (
    <nav className="flex justify-between">
      <div className="font-bold text-4xl">
        {titles.map((item) => pathname.includes(item.path) && item.label)}
      </div>
      <div className="flex">
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
    </nav>
  );
}
