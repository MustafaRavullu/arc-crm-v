import React from "react";
import Dropdown from "./Dropdown";
import { Bars3BottomRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function HamburgerMenu({ links }) {
  return (
    <Dropdown buttonContent={<HamburgerMenuButton />} marginTop={"mt-8"}>
      <div className="p-3 flex flex-col gap-3">
        {links.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="whitespace-nowrap font-semibold"
          >
            {item.label}
          </Link>
        ))}
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
