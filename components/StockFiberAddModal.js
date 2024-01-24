"use client";

import { useWorkTrackingContext } from "@/contexts/workTrackingContext";
import { db } from "@/firebase.config";
import { doc, updateDoc } from "firebase/firestore";
import { forwardRef, useState } from "react";
import { HashLoader } from "react-spinners";
import { toast } from "sonner";

const StockFiberAddModal = forwardRef(function StockFiberAddModal(
  { label, compare, data },
  ref
) {
  const { setRefetchFiberCodes } = useWorkTrackingContext();
  const [fiberAmount, setFiberAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const handleAdd = async () => {
    setLoading(true);
    const relatedDoc = data.find((item) =>
      item.arr.find((innerItem) => innerItem.code === compare)
    );
    const alteredArr = relatedDoc.arr.map((item) => {
      if (item.code === compare) {
        return { ...item, amount: Number(item.amount) + Number(fiberAmount) };
      } else {
        return item;
      }
    });
    try {
      const updateRef = doc(db, "fiberCodes", relatedDoc.id);
      await updateDoc(updateRef, {
        arr: alteredArr,
      });
      toast.success("İşlem başarıyla tamamlandı.", {
        position: "top-center",
      });
      setRefetchFiberCodes((prev) => prev + 1);
      ref?.current?.close();
    } catch (error) {
      console.log(error);
      toast.error("Bir şeyler ters gitti!", {
        position: "top-center",
      });
      ref?.current?.close();
    }
    setFiberAmount("");
    setLoading(false);
  };
  return (
    <dialog
      ref={ref}
      className="h-fit w-full md:w-[400px] rounded-lg border border-black dark:border-white"
    >
      <div className="flex h-full flex-col gap-3 p-3">
        <div className="font-bold text-xl text-center">
          Satın Alınan İpliği Depoya Ekleme
        </div>
        <div className="font-bold text-lg">{label}</div>

        <div className="flex flex-col gap-1">
          <label htmlFor="amount">Miktar</label>
          <div className="flex gap-3 w-full items-end">
            <input
              type="number"
              id="amount"
              min={0}
              value={fiberAmount}
              onChange={(event) => setFiberAmount(event.target.value)}
              placeholder="Miktar girin"
              className="bg-white dark:bg-arc_black border flex-1 border-black dark:border-white outline-none rounded-lg p-3 text-base"
            />
            <div className="font-bold text-xl">Kg</div>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="button"
            className="border border-black rounded-lg dark:border-white py-2.5 px-4"
            onClick={() => {
              ref?.current?.close();
              setFiberAmount("");
            }}
          >
            Vazgeç
          </button>
          <button
            className="simple_button flex justify-center"
            disabled={fiberAmount === "" || loading}
            onClick={handleAdd}
            type="button"
          >
            {loading ? <HashLoader size={20} color="#008000" /> : "Ekle"}
          </button>
        </div>
      </div>
    </dialog>
  );
});

export default StockFiberAddModal;
