import Header from "@/components/Header";

export default function WorkerLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header></Header>
      {children}
    </div>
  );
}
