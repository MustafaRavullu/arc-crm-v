"use client";

import BarGraph from "@/components/BarGraph";
import Card from "@/components/Card";
import TrackingPanel from "@/components/TrackingPanel";
import WorkOrderDetails from "@/components/WorkOrderDetails";
import WorkOrderList from "@/components/WorkOrderList";
import { useWorkTrackingContext } from "@/contexts/workTrackingContext";
import { TagIcon, SwatchIcon, Battery0Icon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  getDocs,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase.config";
import { HashLoader } from "react-spinners";
import { toast } from "sonner";

export default function ActiveWorkOrders() {
  const { data: session } = useSession();
  const { workOrders, selectedWorkOrder, setWorkOrders, setSelectedWorkOrder } =
    useWorkTrackingContext();
  const [refetch, setRefetch] = useState(1);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getActiveWorkOrders = async () => {
      const querySnapshot = await getDocs(collection(db, "workOrderLists"));
      const workOrderLists = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        workOrderLists.push({ ...doc.data(), id: doc.id });
      });
      const mergedArray = workOrderLists.flatMap((obj) => obj.arr);
      setWorkOrders(mergedArray);
    };
    getActiveWorkOrders();

    // const q = query(collection(db, "workOrders"), where("active", "==", true));
    // const unsubscribe = onSnapshot(q, (querySnapshot) => {
    //   const activeWorkOrders = [];
    //   querySnapshot.forEach((doc) => {
    //     activeWorkOrders.push({ ...doc.data(), id: doc.id });
    //   });
    //   setWorkOrders(activeWorkOrders);
    // });
    // return () => {
    //   unsubscribe();
    // };
  }, [refetch]);
  const completeWorkOrderModalRef = useRef(null);
  const { globalLoading } = useWorkTrackingContext();
  const completeTheWorkOrder = async () => {
    setLoading(true);
    const querySnapshot = await getDocs(collection(db, "workOrderLists"));
    const workOrderLists = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      workOrderLists.push({ ...doc.data(), id: doc.id });
    });
    const relatedDoc = workOrderLists.find((item) =>
      item.arr.some(
        (item) => item.workOrderCode === selectedWorkOrder.workOrderCode
      )
    );
    const alteredRelatedArr = relatedDoc.arr.map((item) => {
      if (item.workOrderCode === selectedWorkOrder.workOrderCode) {
        return { ...item, active: false };
      } else {
        return item;
      }
    });
    await setDoc(doc(db, "workOrderLists", relatedDoc.id), {
      arr: alteredRelatedArr,
    });
    await updateDoc(doc(db, "workOrders", selectedWorkOrder.id), {
      active: false,
      finishedAt: new Date().toLocaleDateString("tr-TR"),
    });
    setSelectedWorkOrder(null);
    setRefetch((prev) => prev + 1);
    toast.success(
      "İş emri tamamlandı. Tamamlanan iş emrini 'Tamamlanmış İş Emirleri'nde görebilirsiniz",
      { position: "top-center" }
    );
    completeWorkOrderModalRef?.current?.close();
    setLoading(false);
  };
  return (
    <>
      <div className="flex-1 flex flex-col md:flex-row gap-6">
        <div className="flex-1 bg-white shadow-md rounded-lg dark:bg-arc_black">
          <WorkOrderList
            data={workOrders.filter((item) => item.active === true)}
          />
        </div>
        {selectedWorkOrder ? (
          <div className="flex-[4] flex flex-col md:flex-row gap-6 relative">
            {globalLoading && (
              <div className="absolute inset-0 backdrop-blur-sm bg-white/5 z-40 flex justify-center items-center">
                <div className="z-50">
                  <HashLoader size={60} color="#008000" />
                </div>
              </div>
            )}
            <div className="flex-[3] flex flex-col gap-6 ">
              <div className="flex-[2] flex flex-col md:flex-row gap-6">
                <div className="md:flex-1 h-[400px] md:h-auto w-full relative bg-white shadow-md rounded-lg dark:bg-arc_black">
                  {selectedWorkOrder?.image ? (
                    <Image
                      src={selectedWorkOrder.image}
                      alt={selectedWorkOrder.workOrderCode}
                      fill={true}
                      priority
                      sizes="(min-width: 780px) calc(17.93vw - 21px), calc(100vw - 47px)"
                      className="rounded-lg"
                    />
                  ) : (
                    <div className="h-full  w-full px-10 text-center flex justify-center items-center">
                      Fotoğrafı görüntülemek için iş emri seçin
                    </div>
                  )}
                </div>
                <div className="flex-[3] flex-col md:flex-row flex gap-6">
                  <div className="flex-1 flex flex-col gap-6">
                    {session?.user?.role === "admin" && (
                      <button
                        type="button"
                        onClick={() => {
                          if (selectedWorkOrder.customer === "") {
                            toast.error(
                              "Bu iş emrinin belirlenmiş bir müşterisi yokken 'Tamamlama' işlemini yapamazsınız. Eğer iş emrinin müşterisi varsa lütfen iş emrini düzenledikten sonra tekrar deneyin.",
                              {
                                position: "top-center",
                              }
                            );
                            return;
                          }
                          completeWorkOrderModalRef?.current?.showModal();
                        }}
                        className="simple_button w-full"
                      >
                        İş Emrini Tamamla
                      </button>
                    )}
                    <Card
                      title={"İş Tipi"}
                      value={
                        selectedWorkOrder &&
                        selectedWorkOrder.jobType
                          ?.charAt(0)
                          .toLocaleUpperCase("tr") +
                          selectedWorkOrder.jobType?.slice(1)
                      }
                      icon={<TagIcon className="w-5" />}
                      shadow={"shadow-md"}
                      padding={session?.user?.role === "admin" ? "p-3" : "p-6"}
                    />
                    <Card
                      title={"Ürün Tipi"}
                      value={
                        selectedWorkOrder &&
                        selectedWorkOrder.productType
                          ?.charAt(0)
                          .toLocaleUpperCase("tr") +
                          selectedWorkOrder.productType?.slice(1)
                      }
                      icon={<SwatchIcon className="w-5" />}
                      shadow={"shadow-md"}
                      padding={session?.user?.role === "admin" ? "p-3" : "p-6"}
                    />
                  </div>
                  <div className="md:flex-[2] h-[300px] md:h-auto">
                    {selectedWorkOrder.targetAmount.length === 0 ? (
                      <div className="h-full w-full flex text-center justify-center items-center font-semibold bg-white shadow-md dark:bg-arc_black rounded-lg">
                        Bu iş emri için herhangi bir hedef miktar belirlenmedi
                      </div>
                    ) : (
                      <BarGraph
                        data={selectedWorkOrder.targetAmount}
                        nameKey={
                          selectedWorkOrder.productType === "ip"
                            ? "code"
                            : "color"
                        }
                        valueKey={"amount"}
                        color={"#e6ff00"}
                        title={"Hedef Miktar"}
                        isYearSelectOn={false}
                        type={"targetAmount"}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="flex-[3] bg-white shadow-md rounded-lg dark:bg-arc_black">
                <TrackingPanel />
              </div>
            </div>
            <div className="flex-1 bg-white shadow-md rounded-lg dark:bg-arc_black">
              <WorkOrderDetails productType={selectedWorkOrder.productType} />
            </div>
          </div>
        ) : (
          <div className="flex-[5] flex items-center rounded-lg justify-center font-semibold bg-white shadow-md dark:bg-arc_black">
            {" "}
            {workOrders.length === 0 ? (
              <div className="flex-1 text-center">
                Şu an hiç iş emriniz yok. Detayları görüntüleyebilmek için iş
                emri oluşturun.
              </div>
            ) : workOrders.filter((item) => item.active === true).length ===
              0 ? (
              <div className="flex flex-col gap-1 items-center justify-center">
                <Battery0Icon className="w-10" />
                Aktif iş emriniz yok
              </div>
            ) : (
              "Detayları görebilmek için iş emri seçin"
            )}
          </div>
        )}
      </div>
      <dialog ref={completeWorkOrderModalRef} className="rounded-lg">
        <div className="p-6 flex flex-col gap-6 border-arc_black rounded-lg dark:border-white bg-white dark:bg-arc_black">
          <div>İş emrini tamamlamak istediğinizden emin misiniz?</div>{" "}
          <div className="flex justify-between">
            <button
              type="button"
              disabled={loading}
              onClick={() => completeWorkOrderModalRef?.current?.close()}
              className="border py-2.5 px-5 rounded-lg"
            >
              Vazgeç
            </button>
            <button
              type="button"
              onClick={completeTheWorkOrder}
              disabled={loading}
              className="simple_button"
            >
              {loading ? <HashLoader size={20} color="#008000" /> : "Tamamla"}
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
