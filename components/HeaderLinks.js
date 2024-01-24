"use client";
import { useWorkTrackingContext } from "@/contexts/workTrackingContext";
import Link from "next/link";

export default function HeaderLinks({ links }) {
  const { setActivePage } = useWorkTrackingContext();
  return (
    <nav className="flex gap-3">
      {links.map((item) => {
        if (item.label === "STOK TAKİP") {
          return (
            <Link
              onClick={() => setActivePage("ip")}
              key={item.id}
              href={item.href}
              className="font-semibold"
            >
              {item.label}
            </Link>
          );
        } else {
          return (
            <Link key={item.id} href={item.href} className="font-semibold">
              {item.label}
            </Link>
          );
        }
      })}
    </nav>
  );
}
