"use client";
import { redirect } from "next/navigation";
import { useLayoutEffect } from "react";

export default function Delete() {
  useLayoutEffect(() => {
    redirect("/admin/work-tracking/delete/work-order");
  }, []);
  return <div></div>;
}
