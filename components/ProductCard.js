export default function ProductCard({ label, amount }) {
  return (
    <div className="flex flex-col justify-between h-[135px] border rounded-lg p-3">
      <div className="font-bold">{label}</div>
      <div className="flex justify-between items-end">
        <div className="font-bold text-4xl">{amount}</div>
        <div>Adet</div>
      </div>
    </div>
  );
}
