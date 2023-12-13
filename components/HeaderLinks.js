import Link from "next/link";

export default function HeaderLinks({ links }) {
  return (
    <nav className="flex gap-3">
      {links.map((item) => (
        <Link key={item.id} href={item.href} className="font-semibold">
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
