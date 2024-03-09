"use client";
import { useState } from "react";

export default function ProductStockCard({ workOrder, stories }) {
  const isAvailableInStock = stories.some(
    (element) => element.transactionPointType === "Bitmiş Ürün Deposu"
  );
  if (!isAvailableInStock) return;
  const productStockStories = stories.filter(
    (item) => item.transactionPointType === "Bitmiş Ürün Deposu"
  );
  const totalColors = {};

  // Iterate through each object in the array
  productStockStories.forEach((obj) => {
    // Iterate through productAmount of each object
    obj.productAmount.forEach((item) => {
      // Calculate the amount based on the operationType
      const amount =
        obj.operationType === "Teslim Et"
          ? Number(item.amount)
          : -Number(item.amount);

      // Update the total amount for each color
      totalColors[item.color] = (totalColors[item.color] || 0) + amount;
    });
  });
  const totalColorsArray = [];

  // Iterate through each key-value pair in the totalColors object
  for (const color in totalColors) {
    if (totalColors.hasOwnProperty(color)) {
      // Push an object containing color and total amount into the totalColorsArray
      totalColorsArray.push({ color: color, totalAmount: totalColors[color] });
    }
  }

  return (
    <div className="border p-3 flex flex-col rounded-lg">
      <div className="font-bold text-4xl">{workOrder}</div>
      <div className="flex flex-col">
        {totalColorsArray.map((item, index) => (
          <div key={index} className="font-semibold text-lg">
            {item.color}: {item.totalAmount}{" "}
            <span className="font-normal text-sm">adet</span>
          </div>
        ))}
      </div>
    </div>
  );
}
