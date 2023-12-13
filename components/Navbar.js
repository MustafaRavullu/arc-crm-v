"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function Navbar() {
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
      href: "/admin/work-tracking",
      number: 1,
      label: "Aktif İş Emirleri",
    },
    {
      id: 2,
      href: "/admin/work-tracking/completed-work-orders",
      number: 2,
      label: "Tamamlanmış İş Emirleri",
    },
    {
      id: 3,
      href: "/admin/work-tracking/create",
      number: 3,
      label: "Oluştur",
    },
  ];
  const pathname = usePathname();
  const searchParams = useSearchParams();
  return (
    <nav className="flex justify-between">
      <div className="font-bold text-4xl">
        {titles.map((item) => pathname.includes(item.path) && item.label)}
      </div>
      <div className="flex">
        {navbarLinks.map((item) => (
          <Link
            key={item.id}
            href={`${item.href}?currentPage=${item.number}`}
            className={`flex justify-center items-center font-semibold py-2.5 px-5 rounded-lg ${
              searchParams.get("currentPage") === String(item.number) &&
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
