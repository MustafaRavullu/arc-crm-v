import { useWorkTrackingContext } from "@/contexts/workTrackingContext";
import { ArrowLongRightIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/firebase.config";
import { toast } from "sonner";
import { HashLoader } from "react-spinners";

export default function StoryCard({
  operationNumber,
  operationType,
  operationTime,
  subcontractorFollower,
  productAmount,
  fiberAmount,
  transactionPoint,
  id,
}) {
  const refetchSelectedWorkOrder = async (code) => {
    const q = query(
      collection(db, "workOrders"),
      where(
        "workOrderCode",
        "==",
        code.replace(/\s/g, "").toLocaleLowerCase("tr")
      )
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setSelectedWorkOrder({ ...doc.data(), id: doc.id });
    });
  };
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const { selectedWorkOrder, setSelectedWorkOrder } = useWorkTrackingContext();
  const handleDelete = async (storyId) => {
    setLoading(true);
    const newStories = selectedWorkOrder.stories.filter(
      (item) => item.id !== storyId
    );
    const docRef = doc(db, "workOrders", selectedWorkOrder.id);
    const selectedStory = selectedWorkOrder.stories.find(
      (item) => item.id === storyId
    );
    try {
      if (
        selectedStory.operationType === "Teslim Al" &&
        selectedStory.transactionPoint === "İp Deposu"
      ) {
        const querySnapshot = await getDocs(collection(db, "fiberCodes"));
        const fiberCodeDocs = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          fiberCodeDocs.push({ ...doc.data(), id: doc.id });
        });
        // console.log(fiberCodeDocs[0].arr);

        selectedStory.fiberAmount.forEach((alinan) => {
          fiberCodeDocs[0].arr.forEach((stokItem) => {
            if (stokItem.code === alinan.code) {
              if (alinan.unit === "Kg") {
                stokItem.amount += Number(alinan.amount);
              } else {
                stokItem.amount += Number(alinan.amount) * 1000;
              }
            }
          });
        });
        const fiberDocRef = doc(db, "fiberCodes", "1");
        await updateDoc(fiberDocRef, {
          arr: fiberCodeDocs[0].arr,
        });
      }
      await updateDoc(docRef, {
        stories: newStories,
      });
      refetchSelectedWorkOrder(selectedWorkOrder.workOrderCode);
      setShow(false);
      setLoading(false);
      toast.success(`${transactionPoint} ile ilgili kayıt başarıyla silindi!`, {
        position: "top-center",
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
      setShow(false);
      toast.error(
        "Bir şeyler yanlış gitti! Lütfen geliştirici ile iletişime geçin",
        { position: "top-center" }
      );
    }
  };
  return (
    <>
      {show && (
        <>
          <div className="fixed flex rounded-lg flex-col gap-3 z-[101] w-[90%] md:w-[300px] p-3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border border-black dark:bg-arc_black dark:border-white">
            <div className="font-semibold">
              {transactionPoint} ile alakalı kaydı silmek üzeresiniz. Devam
              etmek istediğinizen emin misiniz?
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                disabled={loading}
                className="border border-black dark:border-white py-3 px-6 font-bold rounded-lg"
                onClick={() => setShow(false)}
              >
                Vazgeç
              </button>
              <button
                type="button"
                disabled={loading}
                className="bg-red-500 py-3 px-6 font-bold text-white rounded-lg"
                onClick={() => handleDelete(id)}
              >
                {loading ? <HashLoader size={20} /> : "Sil"}
              </button>
            </div>
          </div>
          <div className="fixed inset-0 bg-black/50 z-[100]"></div>
        </>
      )}
      <div className="p-3 border border-black dark:border-white rounded-lg flex flex-col gap-2">
        <div className="flex justify-between">
          <div className="font-bold">{operationNumber}</div>
          <div className="flex gap-1 items-center">
            <div className="font-bold">{operationTime}</div>
            {selectedWorkOrder.active && (
              <button type="button" title="Sil" onClick={() => setShow(true)}>
                <TrashIcon className="w-5 text-red-500" />
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex gap-1">
            <div>Fason Takipçisi</div>
            <div>
              <ArrowLongRightIcon className="w-5" />
            </div>
            <div>{subcontractorFollower}</div>
          </div>
          <div className="flex gap-1">
            <div>İşlem Noktası</div>
            <div>
              <ArrowLongRightIcon className="w-5" />
            </div>
            <div>{transactionPoint}</div>
          </div>
          <div className="flex gap-1">
            <div>
              {operationType.toLocaleLowerCase("tr") === "teslim al"
                ? "Teslim Alınan"
                : "Teslim Edilen"}
            </div>
            <div>
              <ArrowLongRightIcon className="w-5" />
            </div>
            <div>
              {fiberAmount
                ? fiberAmount
                    ?.map((item) => `${item.amount} ${item.unit} ${item.code}`)
                    .join(", ")
                : productAmount
                    ?.map((item) => `${item.amount} adet ${item.color}`)
                    .join(", ")}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
