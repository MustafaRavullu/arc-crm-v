import StockNav from "@/components/StockNav";

export default function StockTrackingLayout({ children }) {
  return (
    <main className="flex-1 flex flex-col p-6 gap-6">
      <StockNav />
      {children}
    </main>
  );
}
