"use client";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

export default function FiberType() {
  const [formData, setFormData] = useState({
    id: uuidv4(),
    name: "",
  });
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className=" relative shadow-md h-full bg-white dark:bg-arc_black"
    >
      <div className="absolute inset-0 p-6 flex flex-wrap flex-col gap-2">
        <Input
          type={"text"}
          placeholder={"İplik türünü girin"}
          label={"İplik Türü"}
          formData={formData}
          setFormData={setFormData}
          name={"name"}
        />
        <button type="submit" className="simple_button">
          İplik Türü Oluştur
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
