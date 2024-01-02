"use client";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { useWorkTrackingContext } from "@/contexts/workTrackingContext";
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

export default function Subcontractor() {
  const [formData, setFormData] = useState({
    id: uuidv4(),
    name: "",
    transactionPoint: "",
  });
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const customerQuerySnapshot = await getDocs(collection(db, "customers"));
    let customerLists = [];
    customerQuerySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      customerLists.push({ ...doc.data(), id: doc.id });
    });
    const isDuplicate = customerLists.some((item) =>
      item.arr.some(
        (innerItem) =>
          innerItem.name ===
          formData.name.replace(/\s/g, "").toLocaleLowerCase("tr")
      )
    );
    if (isDuplicate) {
      toast.error("Hata: Bu müşteri zaten var.", {
        position: "top-center",
      });
      setLoading(false);
      return;
    }
    if (customerLists[customerLists.length - 1].arr.length < 8000) {
      const docRef = doc(db, "customers", `${customerLists.length}`);
      try {
        await setDoc(
          docRef,
          {
            arr: [
              ...customerLists[customerLists.length - 1].arr,
              {
                name: formData.name.replace(/\s/g, "").toLocaleLowerCase("tr"),
                transactionPoint: formData.name.trim(),
              },
            ],
          },
          { merge: true }
        );
      } catch (error) {
        console.log(error);
      }
      toast.success("Müşteri başarıyla oluşturuldu.", {
        position: "top-center",
      });
      setLoading(false);
    } else {
      const docRef = doc(db, "customers", `${customerLists.length + 1}`);
      try {
        await setDoc(
          docRef,
          {
            arr: [
              {
                name: formData.name.replace(/\s/g, "").toLocaleLowerCase("tr"),
                transactionPoint: formData.name.trim(),
              },
            ],
          },
          { merge: true }
        );
      } catch (error) {
        console.log(error);
      }
      toast.success("Müşteri başarıyla oluşturuldu.", {
        position: "top-center",
      });
      setLoading(false);
    }
    // const q = query(
    //   collection(db, "customers"),
    //   where(
    //     "name",
    //     "==",
    //     formData.name.replace(/\s/g, "").toLocaleLowerCase("tr")
    //   )
    // );
    // let isCustomerExist;
    // const querySnapshot = await getDocs(q);
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   isCustomerExist = { ...doc.data(), id: doc.id };
    // });
    // if (isCustomerExist) {
    //   toast.error(
    //     "Hata: Bu müşteri zaten var. Lütfen farklı bir müşteri adı kullanın.",
    //     {
    //       position: "top-center",
    //     }
    //   );
    //   setLoading(false);
    //   return;
    // } else {
    //   try {
    //     await setDoc(doc(db, "customers", formData.id), {
    //       name: formData.name.replace(/\s/g, "").toLocaleLowerCase("tr"),
    //       displayName: formData.name,
    //     });
    //     toast.success("Müşteri oluşturuldu.", {
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
            placeholder={"Müşteri ismi girin"}
            label={"Müşteri İsmi"}
            formData={formData}
            setFormData={setFormData}
            name={"name"}
          />
        </fieldset>

        <button
          type="submit"
          disabled={formData.name === "" || loading}
          className="simple_button justify-center flex w-full md:w-fit disabled:opacity-50"
        >
          {loading ? (
            <div>
              <HashLoader size={20} />
            </div>
          ) : (
            "Müşteri Oluştur"
          )}
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
