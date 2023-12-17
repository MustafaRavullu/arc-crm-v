"use client";

import BarGraph from "@/components/BarGraph";
import Card from "@/components/Card";
import TrackingPanel from "@/components/TrackingPanel";
import WorkOrderDetails from "@/components/WorkOrderDetails";
import WorkOrderList from "@/components/WorkOrderList";
import { useWorkTrackingContext } from "@/contexts/workTrackingContext";
import { TagIcon, SwatchIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";

export default function ActiveWorkOrders() {
  const { data: session } = useSession();
  const { workOrders, selectedWorkOrder } = useWorkTrackingContext();
  return (
    <div className="flex-1 flex gap-6">
      <div className="flex-1 bg-white shadow-md rounded-lg dark:bg-arc_black">
        <WorkOrderList
          data={workOrders.filter((item) => item.active === true)}
        />
      </div>
      <div className="flex-[3] flex flex-col gap-6">
        <div className="flex-[2] flex gap-6">
          <div className="flex-1 bg-white shadow-md rounded-lg dark:bg-arc_black">
            {/* fotoğraf */}
          </div>
          <div className="flex-[3] flex gap-6">
            <div className="flex-1 flex flex-col gap-6">
              {session?.user?.role === "admin" && (
                <button type="button" className="simple_button w-full">
                  İş Emrini Tamamla
                </button>
              )}
              <Card
                title={"İş Tipi"}
                value={
                  selectedWorkOrder.jobType?.charAt(0).toUpperCase() +
                  selectedWorkOrder.jobType?.slice(1)
                }
                icon={<TagIcon className="w-5" />}
                shadow={"shadow-md"}
                padding={session?.user?.role === "admin" ? "p-3" : "p-6"}
              />
              <Card
                title={"Ürün Tipi"}
                value={
                  selectedWorkOrder.productType?.charAt(0).toUpperCase() +
                  selectedWorkOrder.productType?.slice(1)
                }
                icon={<SwatchIcon className="w-5" />}
                shadow={"shadow-md"}
                padding={session?.user?.role === "admin" ? "p-3" : "p-6"}
              />
            </div>
            <div className="flex-[2]">
              <BarGraph
                data={selectedWorkOrder.targetAmount}
                nameKey={"color"}
                valueKey={"amount"}
                color={"#e6ff00"}
                title={"Hedef Miktar"}
                isYearSelectOn={false}
                type={"targetAmount"}
              />
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
  );
}
