"use client";
import { v4 as uuidv4 } from "uuid";
import { useRef, useState } from "react";
import { useWorkTrackingContext } from "@/contexts/workTrackingContext";
import useWhenClickedOutside from "@/hooks/useWhenClickedOutside";
import { ChevronDownIcon, ClipboardIcon } from "@heroicons/react/24/outline";
import { HashLoader } from "react-spinners";
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

export default function SubcontractorFollower() {
  const [formData, setFormData] = useState({
    id: uuidv4(),
    username: "",
    displayName: "",
    password: "",
    role: "worker",
  });
  const ref = useRef(null);
  const [loading, setLoading] = useState(false);
  const handleUserCheck = async (event) => {
    event.preventDefault();
    setLoading(true);
    const q = query(
      collection(db, "users"),
      where(
        "username",
        "==",
        formData.username.replace(/\s/g, "").toLocaleLowerCase("tr")
      )
    );
    let isUserExist;
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      isUserExist = { ...doc.data(), id: doc.id };
    });
    if (isUserExist) {
      toast.error(
        "Hata: Bu kullanıcı zaten kullanımda. Lütfen farklı bir kullanıcı adı kullanın.",
        {
          position: "top-center",
        }
      );
      setLoading(false);
      return;
    } else {
      ref?.current?.showModal();
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    ref?.current?.close();

    // Add a new document in collection "cities"
    try {
      await setDoc(doc(db, "users", formData.id), {
        username: formData.username.replace(/\s/g, "").toLocaleLowerCase("tr"),
        displayName: formData.username.trim(),
        password: formData.password.trim(),
        role: formData.role,
        loggedIn: false,
      });
      toast.success("Fason takipçisi oluşturuldu.", {
        position: "top-center",
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setLoading(false);
    setFormData({
      id: uuidv4(),
      username: "",
      displayName: "",
      password: "",
      role: "worker",
    });
  };
  const copyInfosToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(
        `Kullanıcı Adı: ${formData.username}\nParola: ${formData.password}`
      );
      toast.success("Bilgiler kopyalandı. İşleme devam edebilirsiniz.", {
        position: "top-center",
      });
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };
  const { subcontractors } = useWorkTrackingContext();
  return (
    <>
      <form
        onSubmit={handleUserCheck}
        className=" relative shadow-md  h-[calc(100vh-15rem)] bg-white dark:bg-arc_black"
      >
        <div className="absolute inset-0 p-6 flex flex-col gap-2">
          <fieldset className="border h-fit md:w-fit border-black dark:border-white p-2 w-full     rounded-lg">
            <legend className="font-bold">Adım 1(Zorunlu)</legend>
            <Input
              type={"text"}
              placeholder={"Kullanıcı adı girin"}
              label={"Kullanıcı Adı"}
              formData={formData}
              setFormData={setFormData}
              name={"username"}
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
          <button
            type="submit"
            disabled={
              formData.email === "" || formData.password === "" || loading
            }
            className="simple_button flex justify-center items-center w-full md:w-fit disabled:opacity-50"
          >
            {loading ? <HashLoader size={20} /> : "Fason Takipçisi Oluştur"}
          </button>
        </div>
      </form>
      <dialog ref={ref} className="rounded-lg">
        <div className="p-6 flex flex-col gap-6 border-arc_black rounded-lg dark:border-white bg-white dark:bg-arc_black">
          <div>
            İşleme devam etmek istiyorsanız aşağıdaki bilgileri saklayın ve
            {" 'Oluştur'"} butonuna basın.
          </div>{" "}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center font-semibold">
              Fason Takipçisi Bilgileri
              <button
                type="button"
                onClick={copyInfosToClipboard}
                className="flex gap-1"
              >
                <ClipboardIcon className="w-5" />
                Kopyala
              </button>
            </div>
            <div className="flex flex-col">
              <div>Kullanıcı Adı: {formData.username}</div>
              <div>Parola: {formData.password}</div>
            </div>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => {
                ref?.current?.close();
                setLoading(false);
              }}
              className="border py-2.5 px-5 rounded-lg"
            >
              Vazgeç
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="simple_button"
            >
              Oluştur
            </button>
          </div>
        </div>
      </dialog>
    </>
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
