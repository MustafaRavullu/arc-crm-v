"use client";

import BarGraph from "@/components/BarGraph";
import Card from "@/components/Card";
import TrackingPanel from "@/components/TrackingPanel";
import WorkOrderDetails from "@/components/WorkOrderDetails";
import WorkOrderList from "@/components/WorkOrderList";
import { useWorkTrackingContext } from "@/contexts/workTrackingContext";
import { TagIcon, SwatchIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { Battery0Icon } from "@heroicons/react/24/solid";
import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase.config";

export default function CompletedWorkOrders() {
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
  }, []);
  const { workOrders, setWorkOrders, selectedWorkOrder } =
    useWorkTrackingContext();
  return (
    <div className="flex-1 flex gap-6 md:flex-row flex-col">
      <div className="flex-1 bg-white shadow-md rounded-lg dark:bg-arc_black">
        <WorkOrderList
          data={workOrders.filter((item) => item.active === false)}
        />
      </div>
      {selectedWorkOrder ? (
        <>
          <div className="flex-[3] flex flex-col gap-6">
            <div className="flex-[2] flex flex-col md:flex-row gap-6">
              <div className="md:flex-1 h-[400px] md:h-auto relative bg-white shadow-md rounded-lg dark:bg-arc_black">
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
                  "-"
                )}
              </div>
              <div className="flex-[3] flex-col md:flex-row flex gap-6">
                <div className="flex-1 flex flex-col gap-6">
                  <Card
                    title={"İş Tipi"}
                    value={
                      selectedWorkOrder.jobType?.charAt(0).toUpperCase() +
                      selectedWorkOrder.jobType?.slice(1)
                    }
                    icon={<TagIcon className="w-5" />}
                    shadow={"shadow-md"}
                  />
                  <Card
                    title={"Ürün Tipi"}
                    value={
                      selectedWorkOrder.productType?.charAt(0).toUpperCase() +
                      selectedWorkOrder.productType?.slice(1)
                    }
                    icon={<SwatchIcon className="w-5" />}
                    shadow={"shadow-md"}
                  />
                </div>
                <div className="md:flex-[2] h-[300px] md:h-auto">
                  {selectedWorkOrder.targetAmount.length === 0 ? (
                    <div className="h-full w-full flex justify-center items-center font-semibold bg-white shadow-md dark:bg-arc_black rounded-lg">
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
        </>
      ) : (
        <div className="flex-[5] flex items-center rounded-lg justify-center font-semibold bg-white shadow-md dark:bg-arc_black">
          {" "}
          {workOrders.length === 0 ? (
            "Şu an hiç iş emriniz yok. Detayları görüntüleyebilmek için iş emri oluşturun."
          ) : workOrders.filter((item) => item.active === false).length ===
            0 ? (
            <div className="flex flex-col gap-1 items-center justify-center">
              <Battery0Icon className="w-10" />
              Tamamlanmış iş emriniz yok
            </div>
          ) : (
            "Detayları görebilmek için iş emri seçin"
          )}
        </div>
      )}
    </div>
  );
}
