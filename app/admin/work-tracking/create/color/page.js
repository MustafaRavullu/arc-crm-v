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

export default function Color() {
  const [formData, setFormData] = useState({
    id: uuidv4(),
    compare: "",
    color: "",
  });
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const colorQuerySnapshot = await getDocs(collection(db, "colors"));
    let colorLists = [];
    colorQuerySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      colorLists.push({ ...doc.data(), id: doc.id });
    });
    const isDuplicate = colorLists.some((item) =>
      item.arr.some(
        (innerItem) =>
          innerItem.compare ===
          formData.color.replace(/\s/g, "").toLocaleLowerCase("tr")
      )
    );
    if (isDuplicate) {
      toast.error("Hata: Bu renk zaten var.", {
        position: "top-center",
      });
      setLoading(false);
      return;
    }
    if (colorLists[colorLists.length - 1].arr.length < 8000) {
      const docRef = doc(db, "colors", `${colorLists.length}`);
      try {
        await setDoc(
          docRef,
          {
            arr: [
              ...colorLists[colorLists.length - 1].arr,
              {
                compare: formData.color
                  .replace(/\s/g, "")
                  .toLocaleLowerCase("tr"),
                color: formData.color.trim(),
              },
            ],
          },
          { merge: true }
        );
      } catch (error) {
        console.log(error);
      }
      toast.success("Renk başarıyla oluşturuldu.", {
        position: "top-center",
      });
      setLoading(false);
    } else {
      const docRef = doc(db, "colors", `${colorLists.length + 1}`);
      try {
        await setDoc(
          docRef,
          {
            arr: [
              {
                compare: formData.color
                  .replace(/\s/g, "")
                  .toLocaleLowerCase("tr"),
                color: formData.color.trim(),
              },
            ],
          },
          { merge: true }
        );
      } catch (error) {
        console.log(error);
      }
      toast.success("Renk başarıyla oluşturuldu.", {
        position: "top-center",
      });
      setLoading(false);
    }
    // const q = query(
    //   collection(db, "colors"),
    //   where(
    //     "color",
    //     "==",
    //     formData.color.replace(/\s/g, "").toLocaleLowerCase("tr")
    //   )
    // );
    // let isUserExist;
    // const querySnapshot = await getDocs(q);
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   isUserExist = { ...doc.data(), id: doc.id };
    // });
    // if (isUserExist) {
    //   toast.error("Hata: Bu renk zaten var.", {
    //     position: "top-center",
    //   });
    //   setLoading(false);
    //   return;
    // } else {
    //   try {
    //     await setDoc(doc(db, "colors", formData.id), {
    //       color: formData.color.replace(/\s/g, "").toLocaleLowerCase("tr"),
    //       displayName: formData.color,
    //     });
    //     toast.success("Renk oluşturuldu.", {
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
      compare: "",
      color: "",
    });
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
            placeholder={"Renk girin"}
            label={"Renk"}
            formData={formData}
            setFormData={setFormData}
            name={"color"}
          />
        </fieldset>
        <button
          type="submit"
          disabled={formData.color === "" || loading}
          className="simple_button w-full flex justify-center md:w-fit disabled:opacity-50"
        >
          {loading ? <HashLoader size={20} /> : "Rengi Oluştur"}
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
