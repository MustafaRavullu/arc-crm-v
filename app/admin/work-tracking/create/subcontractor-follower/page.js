"use client";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { useWorkTrackingContext } from "@/contexts/workTrackingContext";
import useWhenClickedOutside from "@/hooks/useWhenClickedOutside";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function SubcontractorFollower() {
  const [formData, setFormData] = useState({
    id: uuidv4(),
    email: "",
    password: "",
    role: "worker",
  });
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const { subcontractors } = useWorkTrackingContext();
  return (
    <form
      onSubmit={handleSubmit}
      className=" relative shadow-md  h-[calc(100vh-15rem)] bg-white dark:bg-arc_black"
    >
      <div className="absolute inset-0 p-6 flex flex-col gap-2">
        <fieldset className="border h-fit md:w-fit border-black dark:border-white p-2 w-full     rounded-lg">
          <legend className="font-bold">Adım 1(Zorunlu)</legend>
          <Input
            type={"text"}
            placeholder={"E-posta girin"}
            label={"E-posta"}
            formData={formData}
            setFormData={setFormData}
            name={"email"}
          />
        </fieldset>
        <fieldset className="border h-fit md:w-fit border-black dark:border-white p-2 w-full     rounded-lg">
          <legend className="font-bold">Adım 2(Zorunlu)</legend>
          <Input
            type={"text"}
            placeholder={"Parola girin"}
            label={"Parola"}
            formData={formData}
            setFormData={setFormData}
            name={"password"}
          />
        </fieldset>
        <button type="submit" className="simple_button w-full md:w-fit">
          Fason Takipçisi Oluştur
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
