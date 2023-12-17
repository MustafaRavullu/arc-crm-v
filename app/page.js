import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (
    (session && session?.user?.role === "admin") ||
    session?.user?.role === "watcher"
  )
    redirect("/admin");
  if (session?.user?.role === "worker") redirect("/worker");
  return (
    <main className="min-h-screen flex justify-between items-center"></main>
  );
}
