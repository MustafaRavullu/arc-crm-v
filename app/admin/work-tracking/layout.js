import Navbar from "@/components/Navbar";
export default function WorkTrackingLayout({ children }) {
  return (
    <div className="flex-1 flex flex-col p-6 gap-6">
      <Navbar />
      {children}
    </div>
  );
}
