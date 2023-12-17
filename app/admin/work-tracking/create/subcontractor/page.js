"use client";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { useWorkTrackingContext } from "@/contexts/workTrackingContext";
import useWhenClickedOutside from "@/hooks/useWhenClickedOutside";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function Subcontractor() {
  const [formData, setFormData] = useState({
    id: uuidv4(),
    name: "",
    type: "",
  });
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const { subcontractors } = useWorkTrackingContext();
  return (
    <form
      onSubmit={handleSubmit}
      className=" relative shadow-md h-full bg-white dark:bg-arc_black"
    >
      <div className="absolute inset-0 p-6 flex flex-wrap flex-col gap-2">
        <Input
          type={"text"}
          placeholder={"Fason ismi girin"}
          label={"Fason İsmi"}
          formData={formData}
          setFormData={setFormData}
          name={"name"}
        />
        <BasicSelect
          data={subcontractors}
          setFormData={setFormData}
          formData={formData}
          property={"type"}
          label={"Fason Tipi"}
        />
        <button type="submit" className="simple_button">
          Fason Oluştur
        </button>
      </div>
    </form>
  );
}

const Input = ({ label, type, placeholder, formData, setFormData, name }) => {
  return (
    <div className="flex flex-col gap-1 w-fit">
      <div className="font-semibold">{label}</div>
      <input
        type={type}
        placeholder={placeholder}
        value={formData[name]}
        onChange={(event) =>
          setFormData({ ...formData, [name]: event.target.value })
        }
        className="p-3 bg-white dark:bg-arc_black border rounded-lg dark:border-white border-black outline-none"
      />
    </div>
  );
};

const BasicSelect = ({ data, setFormData, formData, property, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useWhenClickedOutside(() => setIsOpen(false));
  const handleClick = (name) => {
    setFormData({ ...formData, [property]: name });
    setIsOpen(false);
  };
  return (
    <div className="relative flex flex-col gap-1 w-fit" ref={ref}>
      <label htmlFor="" className="font-semibold">
        {label}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="simple_button w-[200px] flex justify-between gap-10"
      >
        {formData[property] ? formData[property] : "Lütfen seçin"}
        <ChevronDownIcon className="w-5" />
      </button>
      <div
        className={`z-10 absolute flex flex-col gap-2 top-full right-0 left-0 rounded-lg bg-white shadow-md dark:bg-arc_black ${
          isOpen ? "block" : "hidden"
        }`}
      >
        {data.map((item) => (
          <button
            key={item.id}
            onClick={() => handleClick(item.type)}
            className="p-3 hover:bg-black rounded-lg hover:text-white dark:hover:bg-white dark:hover:text-black"
          >
            {item.type}
          </button>
        ))}
      </div>
    </div>
  );
};
