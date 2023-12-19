import Header from "@/components/Header";
import HeaderLinks from "@/components/HeaderLinks";

export default function WorkerLayout({ children }) {
  const navLinks = [
    {
      id: 1,
      label: "MENÜ",
      href: "/worker",
    },
  ];
  return (
    <div className="min-h-screen flex flex-col">
      <Header>
        <HeaderLinks links={navLinks} />
      </Header>
      {children}
    </div>
  );
}
