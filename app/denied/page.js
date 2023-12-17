import Link from "next/link";

export default function Denied() {
  return (
    <div className="min-h-screen justify-center items-center flex flex-col gap-3 uppercase">
      Bu sayfaya erişiminiz yoktur.
      <Link href={"/"} className="simple_button">
        Anladım
      </Link>
    </div>
  );
}
