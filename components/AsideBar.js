"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AsideBar({ links }) {
  const pathname = usePathname();
  return (
    <div className="md:h-full">
      <div className="h-full hidden md:flex bg-white rounded-lg flex-col gap-2 shadow-md p-6 dark:bg-arc_black">
        {links.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={`font-bold text-base p-3 rounded-lg flex gap-2  ${
              pathname === item.href
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "hover:bg-arc_black hover:text-white dark:hover:bg-white dark:hover:text-arc_black"
            }`}
          >
            {item.icon}
            {item.title}
          </Link>
        ))}
      </div>
      <div className="flex md:hidden overflow-auto">
        {links.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={`font-bold whitespace-nowrap text-base p-3 rounded-lg flex gap-2  ${
              pathname === item.href
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "hover:bg-arc_black hover:text-white dark:hover:bg-white dark:hover:text-arc_black"
            }`}
          >
            {item.icon}
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
