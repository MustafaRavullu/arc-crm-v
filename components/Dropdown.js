"use client";

import useWhenClickedOutside from "@/hooks/useWhenClickedOutside";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dropdown({ children, buttonContent, marginTop }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);
  const ref = useWhenClickedOutside(() => setIsOpen(false));
  return (
    <div className="relative z-[52]" ref={ref}>
      <button type="button" onClick={() => setIsOpen((prev) => !prev)}>
        {buttonContent}
      </button>
      <div
        className={`absolute top-full right-0 ${
          marginTop ? marginTop : "mt-5"
        } rounded-lg bg-white shadow-md dark:bg-arc_black ${
          isOpen ? "block" : "hidden"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
