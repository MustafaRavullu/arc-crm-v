"use client";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "@/firebase.config";
import { toast } from "sonner";
import { HashLoader } from "react-spinners";

export default function FiberType() {
  const [formData, setFormData] = useState({
    id: uuidv4(),
    name: "",
    displayName: "",
  });
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const q = query(
      collection(db, "fiberTypes"),
      where(
        "name",
        "==",
        formData.name.replace(/\s/g, "").toLocaleLowerCase("tr")
      )
    );
    let isUserExist;
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      isUserExist = { ...doc.data(), id: doc.id };
    });
    if (isUserExist) {
      toast.error("Hata: Bu ip türü zaten var.", {
        position: "top-center",
      });
      setLoading(false);
      return;
    } else {
      try {
        await setDoc(doc(db, "fiberTypes", formData.id), {
          name: formData.name.replace(/\s/g, "").toLocaleLowerCase("tr"),
          displayName: formData.name,
        });
        toast.success("İp türü oluşturuldu.", {
          position: "top-center",
        });
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
      setLoading(false);
      setFormData({
        id: uuidv4(),
        name: "",
        displayName: "",
      });
    }
  };
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
            placeholder={"İplik türünü girin"}
            label={"İplik Türü"}
            formData={formData}
            setFormData={setFormData}
            name={"name"}
          />
        </fieldset>
        <button
          type="submit"
          disabled={formData.name === "" || loading}
          className="simple_button w-full flex justify-center disabled:opacity-50 md:w-fit"
        >
          {loading ? <HashLoader size={20} /> : "İplik Türü Oluştur"}
        </button>
      </div>
    </form>
  );
}

const Input = ({ label, type, placeholder, formData, setFormData, name }) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="font-semibold">{label}</div>
      <input
        type={type}
        placeholder={placeholder}
        value={formData[name]}
        onChange={(event) =>
          setFormData({ ...formData, [name]: event.target.value })
        }
        className="p-3 text-base bg-white dark:bg-arc_black border rounded-lg dark:border-white border-black outline-none"
      />
    </div>
  );
};
