export default function Card({
  title,
  icon,
  value,
  unit,
  valueSize,
  padding,
  margin,
  shadow,
}) {
  return (
    <div
      className={`bg-white grow rounded-lg  flex flex-col dark:bg-arc_black ${
        shadow ? shadow : "border border-black dark:border-white"
      } ${padding ? padding : "p-6"} ${margin && margin}`}
    >
      <div className="flex font-semibold justify-between mb-5">
        <div>{title}</div>
        <div>{icon}</div>
      </div>
      <div
        className={`font-bold break-words ${
          valueSize ? valueSize : "text-4xl"
        }`}
      >{`${value}`}</div>
      <div>{unit}</div>
    </div>
  );
}
