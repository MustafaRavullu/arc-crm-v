"use client";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
function ButtonSelect({
  items,
  searchActive,
  property,
  formData,
  setFormData,
}) {
  const [query, setQuery] = useState("");
  const filteredItems = items.filter((item) =>
    item[property]
      .toLocaleLowerCase("tr")
      .includes(query.toLocaleLowerCase("tr"))
  );
  function handleOptionClick(event) {
    setFormData({ ...formData, [property]: event.target.value });
  }
  return (
    <div className="flex flex-col gap-3 h-[calc(100vh-19rem)] overflow-auto">
      {searchActive && (
        <div className="flex border border-gray-100 bg-white dark:bg-black sticky top-0 dark:border-gray-600 rounded-lg">
          <div className="flex items-center">
            <MagnifyingGlassIcon className="w-5 aspect-square ml-3" />
          </div>
          <input
            type="text"
            placeholder="Ara"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="bg-transparent outline-none w-full rounded-lg p-3"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="flex items-center"
            >
              <XMarkIcon className="w-5 aspect-square mr-3" />
            </button>
          )}
        </div>
      )}
      <div className="flex flex-col gap-3">
        {filteredItems.length ? (
          filteredItems.map((item) => (
            <input
              type="button"
              key={item.id}
              onClick={handleOptionClick}
              value={item[property]}
              className={`w-full p-3 border  rounded-lg ${
                formData[property] === item[property]
                  ? "bg-green-500 border-green-500 text-white"
                  : "border-gray-100 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
              }`}
            />
          ))
        ) : (
          <p className="p-2">Eşleşen sonuç yok.</p>
        )}
      </div>
    </div>
  );
}

export default ButtonSelect;
