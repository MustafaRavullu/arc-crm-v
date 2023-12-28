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

export default function FiberCode() {
  const [formData, setFormData] = useState({
    id: uuidv4(),
    code: "",
    displayName: "",
  });
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const fiberCodesQuerySnapshot = await getDocs(collection(db, "fiberCodes"));
    let fiberCodeLists = [];
    fiberCodesQuerySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      fiberCodeLists.push({ ...doc.data(), id: doc.id });
    });
    const isDuplicate = fiberCodeLists.some((item) =>
      item.arr.some(
        (innerItem) =>
          innerItem.code ===
          formData.code.replace(/\s/g, "").toLocaleLowerCase("tr")
      )
    );
    if (isDuplicate) {
      toast.error("Hata: Bu iplik kodu zaten var.", {
        position: "top-center",
      });
      setLoading(false);
      return;
    }
    if (fiberCodeLists[fiberCodeLists.length - 1].arr.length < 3) {
      const docRef = doc(db, "fiberCodes", `${fiberCodeLists.length}`);
      try {
        await setDoc(
          docRef,
          {
            arr: [
              ...fiberCodeLists[fiberCodeLists.length - 1].arr,
              {
                code: formData.code.replace(/\s/g, "").toLocaleLowerCase("tr"),
                displayName: formData.code.trim(),
              },
            ],
          },
          { merge: true }
        );
      } catch (error) {
        console.log(error);
      }
      toast.success("İplik kodu başarıyla oluşturuldu.", {
        position: "top-center",
      });
      setLoading(false);
    } else {
      const docRef = doc(db, "fiberCodes", `${fiberCodeLists.length + 1}`);
      try {
        await setDoc(
          docRef,
          {
            arr: [
              {
                code: formData.code.replace(/\s/g, "").toLocaleLowerCase("tr"),
                displayName: formData.code.trim(),
              },
            ],
          },
          { merge: true }
        );
      } catch (error) {
        console.log(error);
      }
      toast.success("İplik kodu başarıyla oluşturuldu.", {
        position: "top-center",
      });
      setLoading(false);
    }
    // const q = query(
    //   collection(db, "fiberCodes"),
    //   where(
    //     "code",
    //     "==",
    //     formData.code.replace(/\s/g, "").toLocaleLowerCase("tr")
    //   )
    // );
    // let isUserExist;
    // const querySnapshot = await getDocs(q);
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   isUserExist = { ...doc.data(), id: doc.id };
    // });
    // if (isUserExist) {
    //   toast.error("Hata: Bu ip kodu zaten var.", {
    //     position: "top-center",
    //   });
    //   setLoading(false);
    //   return;
    // } else {
    //   try {
    //     await setDoc(doc(db, "fiberCodes", formData.id), {
    //       code: formData.code.replace(/\s/g, "").toLocaleLowerCase("tr"),
    //       displayName: formData.code,
    //     });
    //     toast.success("İp kodu oluşturuldu.", {
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
      code: "",
      displayName: "",
    });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="relative shadow-md  h-[calc(100vh-15rem)] bg-white dark:bg-arc_black"
    >
      <div className="absolute inset-0 p-6 flex flex-col gap-2">
        <fieldset className="border h-fit md:w-fit border-black dark:border-white p-2 w-full     rounded-lg">
          <legend className="font-bold">Adım 1(Zorunlu)</legend>
          <Input
            type={"text"}
            placeholder={"İplik kodu girin"}
            label={"İplik Kodu"}
            formData={formData}
            setFormData={setFormData}
            name={"code"}
          />
        </fieldset>
        <button
          type="submit"
          disabled={formData.code === "" || loading}
          className="simple_button flex justify-center w-full md:w-fit disabled:opacity-50"
        >
          {loading ? <HashLoader size={20} /> : "İplik Kodunu Oluştur"}
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
