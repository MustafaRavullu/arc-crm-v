"use client";

import { useSession } from "next-auth/react";

export default function Avatar() {
  const { data: session } = useSession();
  return (
    <span className="rounded-full flex justify-center items-center border border-zinc-200 w-10 h-10 font-bold bg dark:border-zinc-700">
      {session?.user?.email.split("@")[0].charAt(0).toLocaleUpperCase("tr")}
    </span>
  );
}
