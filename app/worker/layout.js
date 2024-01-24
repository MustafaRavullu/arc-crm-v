import Header from "@/components/Header";
import HeaderLinks from "@/components/HeaderLinks";
import WorkTrackingContextProvider from "@/contexts/workTrackingContext";

export default function WorkerLayout({ children }) {
  const navLinks = [
    {
      id: 1,
      label: "MENÜ",
      href: "/worker",
    },
  ];
  return (
    <WorkTrackingContextProvider>
      <div className="min-h-screen flex flex-col">
        <Header>
          <HeaderLinks links={navLinks} />
        </Header>
        {children}
      </div>
    </WorkTrackingContextProvider>
  );
}
