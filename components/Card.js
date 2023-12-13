export default function Card({ title, icon, value, unit }) {
  return (
    <div className="bg-white p-6 grow rounded-lg shadow-md flex flex-col dark:bg-arc_black">
      <div className="flex justify-between mb-5">
        <div>{title}</div>
        <div>{icon}</div>
      </div>
      <div className="font-bold text-4xl">{value}</div>
      <div>{unit}</div>
    </div>
  );
}
