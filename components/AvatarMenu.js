"use client";

import { UserCircleIcon, UserIcon } from "@heroicons/react/24/outline";
import { signOut, useSession } from "next-auth/react";

export default function AvatarMenu() {
  const { data: session } = useSession();
  return (
    <div className="flex flex-col border rounded-lg w-[250px] p-3 gap-5">
      <div className="flex items-center gap-3">
        <UserIcon className="w-6" />
        <div className="font-semibold">
          {`${session?.user?.username
            .charAt(0)
            .toLocaleUpperCase("tr")}${session?.user?.username.slice(1)}`}
        </div>
      </div>
      <button
        type="button"
        onClick={() => signOut()}
        className="simple_button w-full"
      >
        Çıkış Yap
      </button>
    </div>
  );
}
