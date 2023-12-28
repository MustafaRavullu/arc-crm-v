import { useState } from "react";
import StoryCard from "./StoryCard";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function TransactionPointStories({ data }) {
  const [query, setQuery] = useState("");
  const filteredData = data.filter((item) =>
    item.transactionPoint
      .toLocaleLowerCase("tr")
      .includes(query.toLocaleLowerCase("tr"))
  );
  return (
    <div className="h-full  flex flex-col gap-3">
      <div className="flex gap-3 items-center ">
        <div className="flex items-center w-full border-b border-arc_black dark:border-white">
          <div className="pl-2.5">
            <MagnifyingGlassIcon className="w-5" />
          </div>
          <input
            type="text"
            placeholder="İşlem noktasına göre filtrele"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="bg-white text-base outline-none p-2.5 w-full dark:bg-arc_black"
          />
        </div>
      </div>
      <div className="flex-1 relative">
        <div className="absolute inset-0 overflow-auto flex flex-col gap-3">
          {filteredData.map((item) => (
            <StoryCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}
