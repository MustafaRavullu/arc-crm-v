import Link from "next/link";

export default function WorkerDashboard() {
  return (
    <div className="flex-1 flex justify-center items-center flex-col gap-3">
      <Link href={"/worker/direct-fiber-sale"} className="simple_button">
        İp Satış Transferi
      </Link>
      <Link href={"/worker/product-operation"} className="simple_button">
        Ürün İşlemi
      </Link>
    </div>
  );
}
