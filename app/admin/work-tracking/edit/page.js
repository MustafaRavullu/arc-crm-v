"use client";
import { redirect } from "next/navigation";
import { useLayoutEffect } from "react";

export default function Edit() {
  useLayoutEffect(() => {
    redirect("/admin/work-tracking/edit/work-order");
  }, []);
  return <div></div>;
}
