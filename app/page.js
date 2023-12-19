import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (
    (session && session?.user?.role === "admin") ||
    session?.user?.role === "watcher"
  )
    redirect("/admin");
  if (session?.user?.role === "worker") redirect("/worker");
  return (
    <main className="min-h-screen flex-col gap-10 flex justify-center items-center">
      <h1 className="text-5xl">Hoş Geldiniz!</h1>
      <Link href={"/login"} className="simple_button">
        Giriş Yapın
      </Link>
    </main>
  );
}
