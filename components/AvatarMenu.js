"use client";

import { signOut, useSession } from "next-auth/react";

export default function AvatarMenu() {
  const { data: session } = useSession();
  return (
    <div className="flex flex-col p-3 gap-5">
      <div className="flex flex-col">
        <div className="font-bold">{session?.user?.email.split("@")[0]}</div>
        <div className="text-xs">{session?.user?.email}</div>
      </div>
      <button type="button" onClick={() => signOut()} className="simple_button">
        Çıkış Yap
      </button>
    </div>
  );
}
