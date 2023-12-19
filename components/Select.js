"use client";

import useWhenClickedOutside from "@/hooks/useWhenClickedOutside";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

function Select({
  items,
  property,
  formData,
  setFormData,
  title,
  searchActive,
  complex,
  complexProperty,
  complexIndex,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useWhenClickedOutside(() => setIsMenuOpen(false));
  const [query, setQuery] = useState("");
  const filteredItems = items.filter((item) =>
    item[property]
      .toLocaleLowerCase("tr")
      .includes(query.toLocaleLowerCase("tr"))
  );
  useEffect(() => {
    if (isMenuOpen === true) {
      setQuery("");
    }
  }, [isMenuOpen]);
  function handleOptionClick(event) {
    setIsMenuOpen(false);
    if (complex) {
      const onChangeComplexProperty = formData[complexProperty];
      onChangeComplexProperty[complexIndex][property] = event.target.value;
      setFormData({
        ...formData,
        [complexProperty]: onChangeComplexProperty,
      });
    } else {
      setFormData({
        ...formData,
        [property]: event.target.value,
      });
    }
  }
  function adjustTitle() {
    if (complex) {
      return formData[complexProperty][complexIndex][property]
        ? formData[complexProperty][complexIndex][property]
        : title;
    } else {
      formData[property] ? formData[property] : title;
    }
  }
  return (
    <div className="relative flex" ref={menuRef}>
      <button
        type="button"
        onClick={() => {
          setIsMenuOpen(!isMenuOpen);
        }}
        className="flex justify-between w-full border border-arc_black rounded-lg p-3 dark:border-white simple_button"
      >
        {adjustTitle()}
        <ChevronDownIcon className="w-5 aspect-square" />
      </button>
      <div
        className={`z-10 flex flex-col border border-gray-100 absolute rounded-lg transition-all duration-200 ease-in-out bg-white top-full right-0  left-0 dark:bg-black dark:border-gray-600 ${
          isMenuOpen
            ? "pointer-events-auto visible opacity-100 translate-y-0"
            : "pointer-events-none invisible opacity-0 translate-y-4"
        }`}
      >
        {searchActive && (
          <div className="flex border-b border-gray-100 dark:border-gray-600">
            <MagnifyingGlassIcon className="w-5 aspect-square ml-3" />
            <input
              type="text"
              placeholder="Ara"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="bg-transparent outline-none w-full rounded-lg p-3"
            />
          </div>
        )}
        <div className="flex flex-col gap-1 max-h-[100px] overflow-auto">
          {filteredItems.length ? (
            filteredItems.map((item) => (
              <input
                type="button"
                key={item.id}
                onClick={handleOptionClick}
                value={item[property]}
                className="text-left p-2 hover:bg-gray-100 dark:hover:bg-gray-600"
              />
            ))
          ) : (
            <p className="p-2">Eşleşen sonuç yok.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Select;
