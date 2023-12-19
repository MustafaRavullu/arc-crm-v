"use client";

import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { HashLoader } from "react-spinners";
import { toast } from "sonner";
export default function LoginForm() {
  const { data: session } = useSession();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
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
    setError(false);
    setLoading(true);

    const res = await signIn("credentials", {
      ...credentials,
      redirect: false,
    });
    if (res.ok) {
      setLoading(false);
      setError(false);
    }
    if (!res.ok) {
      toast.error("E-posta ya da parolanız hatalı!", {
        position: "top-center",
      });
      setError(true);
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex justify-center items-center flex-col gap-5">
      <h1 className="text-2xl font-semibold">Hesabına Giriş Yap</h1>
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-3 w-[250px] md:w-[350px] items-end"
      >
        <input
          type="text"
          disabled={loading}
          value={credentials.email}
          onChange={(event) =>
            setCredentials({ ...credentials, email: event.target.value })
          }
          placeholder="E-posta"
          className={` w-full border border-arc_black rounded-md outline-none p-3  dark:border-white ${
            loading
              ? "bg-gray-200 dark:bg-gray-700"
              : "bg-white dark:bg-arc_black"
          }`}
        />
        <input
          type="password"
          placeholder="Parola"
          disabled={loading}
          value={credentials.password}
          onChange={(event) =>
            setCredentials({ ...credentials, password: event.target.value })
          }
          className={` w-full border border-arc_black rounded-md outline-none p-3  dark:border-white ${
            loading
              ? "bg-gray-200 dark:bg-gray-700"
              : "bg-white dark:bg-arc_black"
          }`}
        />
        <button
          type="submit"
          disabled={loading}
          onClick={handleLogin}
          className="simple_button"
        >
          {loading ? <HashLoader size={20} /> : "Giriş Yap"}
        </button>
      </form>
    </main>
  );
}
