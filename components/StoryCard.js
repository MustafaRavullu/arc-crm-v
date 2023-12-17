import { useWorkTrackingContext } from "@/contexts/workTrackingContext";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";

export default function StoryCard({
  operationNumber,
  operationType,
  operationTime,
  subcontractorFollower,
  productAmount,
  fiberAmount,
  transactionPoint,
}) {
  return (
    <div className="p-3 border border-black dark:border-white rounded-lg flex flex-col gap-2">
      <div className="flex justify-between">
        <div className="font-bold">{operationNumber}</div>
        <div className="font-bold">{operationTime}</div>
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
            {operationType.toLocaleLowerCase("tr") === "teslimal"
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
  );
}
