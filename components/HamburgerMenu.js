"use client";
import React from "react";
import Dropdown from "./Dropdown";
import {
  Bars3BottomRightIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useWorkTrackingContext } from "@/contexts/workTrackingContext";

export default function HamburgerMenu({ links }) {
  const { setActivePage } = useWorkTrackingContext();
  return (
    <Dropdown buttonContent={<HamburgerMenuButton />} marginTop={"mt-8"}>
      <div className="p-3 border rounded-lg flex flex-col gap-3 w-[200px]">
        {links.map((item) => {
          if (item.label === "STOK TAKİP") {
            return (
              <Link
                onClick={() => setActivePage("ip")}
                key={item.id}
                href={item.href}
                className="whitespace-nowrap font-semibold px-2.5 py-2 flex items-center gap-2"
              >
                {item.icon}
                {item.label}
              </Link>
            );
          } else {
            return (
              <Link
                key={item.id}
                href={item.href}
                className="whitespace-nowrap font-semibold px-2.5 py-2 flex items-center gap-2"
              >
                {item.icon}
                {item.label}
              </Link>
            );
          }
        })}
      </div>
    </Dropdown>
  );
}

function HamburgerMenuButton() {
  return (
    <span>
      <Bars3BottomRightIcon className="w-5" />
    </span>
  );
}
