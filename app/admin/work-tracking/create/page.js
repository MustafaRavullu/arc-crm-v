"use client";

import { redirect } from "next/navigation";
import { useLayoutEffect } from "react";

export default function Create() {
  useLayoutEffect(() => {
    redirect("/admin/work-tracking/create/work-order");
  }, []);
  return <div></div>;
}
