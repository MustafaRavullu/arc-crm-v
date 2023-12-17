"use client";

import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
export default function LoginForm() {
  const { data: session } = useSession();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    if (session?.user?.role === "admin" || session?.user?.role === "watcher") {
      redirect("/admin");
    }
    if (session?.user?.role === "worker") {
      redirect("/worker");
    }
  }, [session]);

  const handleLogin = async (event) => {
    event.preventDefault();

    const res = await signIn("credentials", {
      ...credentials,
      redirect: false,
    });
  };

  return (
    <main className="flex-1 flex justify-center items-center flex-col gap-5">
      <h1 className="text-2xl font-semibold">Hesabına Giriş Yap</h1>
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-3 w-[250px] md:w-[350px] items-end"
      >
        <input
          type="text"
          value={credentials.email}
          onChange={(event) =>
            setCredentials({ ...credentials, email: event.target.value })
          }
          placeholder="e-posta"
          className="bg-white w-full border border-gray-200 shadow rounded-md outline-none p-3 focus:ring-1 focus:ring-gray-300 dark:focus:ring-gray-600 dark:bg-arc_black dark:border-gray-700"
        />
        <input
          type="password"
          placeholder="parola"
          value={credentials.password}
          onChange={(event) =>
            setCredentials({ ...credentials, password: event.target.value })
          }
          className="bg-white w-full border border-gray-200 rounded-md outline-none p-3 shadow focus:ring-1 focus:ring-gray-300 dark:focus:ring-gray-600 dark:bg-arc_black dark:border-gray-700"
        />
        <button type="submit" onClick={handleLogin} className="simple_button">
          Giriş Yap
        </button>
      </form>
    </main>
  );
}
