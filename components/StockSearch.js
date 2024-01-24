"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function StockSearch({ query, setQuery }) {
  return (
    <div className="flex items-center w-full md:w-[200px] border-b border-arc_black dark:border-white">
      <div className="pl-3">
        <MagnifyingGlassIcon className="w-5" />
      </div>
      <input
        type="text"
        placeholder="Ara"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className="bg-white text-base outline-none p-3 w-full dark:bg-arc_black"
      />
    </div>
  );
}
