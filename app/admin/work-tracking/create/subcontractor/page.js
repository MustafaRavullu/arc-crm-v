"use client";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { useWorkTrackingContext } from "@/contexts/workTrackingContext";
import useWhenClickedOutside from "@/hooks/useWhenClickedOutside";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { HashLoader } from "react-spinners";
import { db } from "@/firebase.config";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore";
import { toast } from "sonner";

export default function Subcontractor() {
  const [formData, setFormData] = useState({
    id: uuidv4(),
    name: "",
    transactionPoint: "",
    type: "",
  });
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const subcontractorQuerySnapshot = await getDocs(
      collection(db, "subcontractors")
    );
    let subcontractorLists = [];
    subcontractorQuerySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      subcontractorLists.push({ ...doc.data(), id: doc.id });
    });
    const isDuplicate = subcontractorLists.some((item) =>
      item.arr.some(
        (innerItem) =>
          innerItem.name ===
          formData.name.replace(/\s/g, "").toLocaleLowerCase("tr")
      )
    );
    if (isDuplicate) {
      toast.error("Hata: Bu fason zaten var.", {
        position: "top-center",
      });
      setLoading(false);
      return;
    }
    if (subcontractorLists[subcontractorLists.length - 1].arr.length < 5000) {
      const docRef = doc(db, "subcontractors", `${subcontractorLists.length}`);
      try {
        await setDoc(
          docRef,
          {
            arr: [
              ...subcontractorLists[subcontractorLists.length - 1].arr,
              {
                name: formData.name.replace(/\s/g, "").toLocaleLowerCase("tr"),
                transactionPoint: formData.name.trim(),
                type: formData.type,
              },
            ],
          },
          { merge: true }
        );
      } catch (error) {
        console.log(error);
      }
      toast.success("Fason başarıyla oluşturuldu.", {
        position: "top-center",
      });
      setLoading(false);
    } else {
      const docRef = doc(
        db,
        "subcontractors",
        `${subcontractorLists.length + 1}`
      );
      try {
        await setDoc(
          docRef,
          {
            arr: [
              {
                name: formData.name.replace(/\s/g, "").toLocaleLowerCase("tr"),
                transactionPoint: formData.name.trim(),
                type: formData.type,
              },
            ],
          },
          { merge: true }
        );
      } catch (error) {
        console.log(error);
      }
      toast.success("Fason başarıyla oluşturuldu.", {
        position: "top-center",
      });
      setLoading(false);
    }
    // const q = query(
    //   collection(db, "subcontractors"),
    //   where(
    //     "name",
    //     "==",
    //     formData.name.replace(/\s/g, "").toLocaleLowerCase("tr")
    //   )
    // );
    // let isUserExist;
    // const querySnapshot = await getDocs(q);
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   isUserExist = { ...doc.data(), id: doc.id };
    // });
    // if (isUserExist) {
    //   toast.error(
    //     "Hata: Bu fason ismi zaten kullanımda. Lütfen farklı bir fason ismi kullanın.",
    //     {
    //       position: "top-center",
    //     }
    //   );
    //   setLoading(false);
    //   return;
    // } else {
    //   try {
    //     await setDoc(doc(db, "subcontractors", formData.id), {
    //       name: formData.name.replace(/\s/g, "").toLocaleLowerCase("tr"),
    //       displayName: formData.name,
    //       type: formData.type,
    //     });
    //     toast.success("Fason oluşturuldu.", {
    //       position: "top-center",
    //     });
    //   } catch (error) {
    //     console.log(error);
    //     setLoading(false);
    //   }
    //   setLoading(false);
    // }
    setFormData({
      id: uuidv4(),
      name: "",
      transactionPoint: "",
      type: "",
    });
  };
  const { subcontractors } = useWorkTrackingContext();
  const subcontractorTypes = [
    {
      id: 1,
      type: "Aksesuar",
    },
    {
      id: 2,
      type: "Yıkama",
    },
    {
      id: 3,
      type: "Ütü",
    },
    {
      id: 4,
      type: "Dokuma",
    },
    {
      id: 5,
      type: "Konfeksiyon",
    },
  ];
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
            placeholder={"Fason ismi girin"}
            label={"Fason İsmi"}
            formData={formData}
            setFormData={setFormData}
            name={"name"}
          />
        </fieldset>
        <fieldset className="border h-fit md:w-fit border-black dark:border-white p-2 w-full     rounded-lg">
          <legend className="font-bold">Adım 2(Zorunlu)</legend>
          <BasicSelect
            data={subcontractorTypes}
            setFormData={setFormData}
            formData={formData}
            property={"type"}
            label={"Fason Tipi"}
          />
        </fieldset>
        <button
          type="submit"
          disabled={formData.name === "" || formData.type === "" || loading}
          className="simple_button w-full flex justify-center md:w-fit disabled:opacity-50"
        >
          {loading ? <HashLoader size={20} /> : "Fason Oluştur"}
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

const BasicSelect = ({ data, setFormData, formData, property, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useWhenClickedOutside(() => setIsOpen(false));
  const handleClick = (name) => {
    setFormData({ ...formData, [property]: name });
    setIsOpen(false);
  };
  return (
    <div className="relative flex flex-col gap-1 w-full" ref={ref}>
      <label htmlFor="" className="font-semibold">
        {label}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="simple_button w-full flex justify-between gap-10"
      >
        {formData[property] ? formData[property] : "Lütfen seçin"}
        <ChevronDownIcon className="w-5" />
      </button>
      <div
        className={`z-10 absolute flex max-h-[150px] overflow-auto flex-col gap-2 top-full text-white dark:text-black right-0 left-0 rounded-lg bg-arc_black shadow-md dark:bg-white ${
          isOpen ? "block" : "hidden"
        }`}
      >
        {data.map((item, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleClick(item.type)}
            className="p-3 hover:bg-white rounded-lg hover:text-arc_black dark:hover:bg-arc_black dark:hover:text-white"
          >
            {item.type}
          </button>
        ))}
      </div>
    </div>
  );
};
