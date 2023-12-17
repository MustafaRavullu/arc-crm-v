import HamburgerMenu from "@/components/HamburgerMenu";
import Header from "@/components/Header";
import HeaderLinks from "@/components/HeaderLinks";
import WorkTrackingContextProvider from "@/contexts/workTrackingContext";

export default async function AdminLayout({ children }) {
  const navLinks = [
    {
      id: 1,
      label: "GENEL BAKIŞ",
      href: "/admin",
    },
    {
      id: 2,
      label: "İŞ TAKİP",
      href: "/admin/work-tracking/active-work-orders",
    },
  ];
  return (
    <div className="min-h-screen flex flex-col">
      <Header>
        <div className="hidden md:block">
          <HeaderLinks links={navLinks} />
        </div>
        <div className="md:hidden">
          <HamburgerMenu links={navLinks} />
        </div>
      </Header>
      <WorkTrackingContextProvider>{children}</WorkTrackingContextProvider>
    </div>
  );
}
