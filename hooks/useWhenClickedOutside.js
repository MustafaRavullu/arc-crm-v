"use client";

import { useEffect, useRef } from "react";

export default function useWhenClickedOutside(callback) {
  const domRef = useRef(null);
  const handleClickOutside = (event) => {
    if (!domRef.current.contains(event.target)) {
      callback();
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);
  return domRef;
}
