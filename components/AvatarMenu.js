"use client";

import { db } from "@/firebase.config";
import { UserCircleIcon, UserIcon } from "@heroicons/react/24/outline";
import { doc, updateDoc } from "firebase/firestore";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HashLoader } from "react-spinners";

export default function AvatarMenu() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const signOutUser = async () => {
    setLoading(true);
    // await updateDoc(doc(db, "users", session.user.id), { loggedIn: false });
    await signOut({ callbackUrl: "https://arc-crm-v.vercel.app/login" });
    setLoading(false);
  };
  return (
    <div className="z-[55] flex flex-col border rounded-lg w-[250px] p-3 gap-5">
      <div className="flex items-center gap-3">
        <UserIcon className="w-6" />
        <div className="font-semibold">{session?.user?.displayName}</div>
      </div>
      <button
        type="button"
        onClick={signOutUser}
        disabled={loading}
        className="simple_button w-full flex justify-center"
      >
        {loading ? <HashLoader size={20} color="#008000" /> : "Çıkış Yap"}
      </button>
    </div>
  );
}
