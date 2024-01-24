import HamburgerMenu from "@/components/HamburgerMenu";
import Header from "@/components/Header";
import HeaderLinks from "@/components/HeaderLinks";
import WorkTrackingContextProvider from "@/contexts/workTrackingContext";
import {
  BuildingOfficeIcon,
  ChartBarIcon,
  CircleStackIcon,
  CubeIcon,
} from "@heroicons/react/24/outline";

export default function AdminLayout({ children }) {
  const navLinks = [
    {
      id: 1,
      label: "GENEL BAKIŞ",
      href: "/admin",
      icon: <ChartBarIcon className="w-5" />,
    },
    {
      id: 2,
      label: "İŞ TAKİP",
      href: "/admin/work-tracking/active-work-orders",
      icon: <CubeIcon className="w-5" />,
    },
    {
      id: 3,
      label: "STOK TAKİP",
      href: "/admin/stock-tracking/fiber",
      icon: <CircleStackIcon className="w-5" />,
    },
  ];
  return (
    <WorkTrackingContextProvider>
      <div className="min-h-screen flex flex-col">
        <Header>
          <div className="hidden md:block">
            <HeaderLinks links={navLinks} />
          </div>
          <div className="md:hidden">
            <HamburgerMenu links={navLinks} />
          </div>
        </Header>
        {children}
      </div>
    </WorkTrackingContextProvider>
  );
}
