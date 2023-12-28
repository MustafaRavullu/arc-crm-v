"use client";

import React, { useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore";
import { db, storage } from "@/firebase.config";
import { toast } from "sonner";
import { HashLoader } from "react-spinners";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function Test() {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    // setLoading(true);
    const querySnapshot = await getDocs(collection(db, "test"));
    let x = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      x.push({ ...doc.data(), id: doc.id });
    });
    // console.log(x[x.length - 1]);
    console.log(x);
    let isDuplicate = x.some((item) =>
      item.arr.some((innerItem) => innerItem.code === value)
    );
    console.log(isDuplicate);

    if (isDuplicate) {
      toast.error("Bu kod zaten kullanımda");
      setLoading(false);
      return;
    } else {
      if (x[x.length - 1].arr.length < 3) {
        const docRef = doc(db, "test", `${x.length}`);
        try {
          await setDoc(
            docRef,
            {
              arr: [
                ...x[x.length - 1].arr,
                { code: value, type: "ürün", active: true, jobType: "normal" },
              ],
            },
            { merge: true }
          );
        } catch (error) {
          console.log(error);
        }
        toast.success("işlem başarılı");
        setLoading(false);
      } else {
        const docRef = doc(db, "test", `${x.length + 1}`);
        try {
          await setDoc(
            docRef,
            {
              arr: [
                { code: value, type: "ürün", active: true, jobType: "normal" },
              ],
            },
            { merge: true }
          );
        } catch (error) {
          console.log(error);
        }
        toast.success("işlem başarılı");
        setLoading(false);
      }
    }
  };
  const handleDelete = async () => {
    setLoading(true);
    const querySnapshot = await getDocs(collection(db, "test"));
    let x = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      x.push({ ...doc.data(), id: doc.id });
    });
    const searchedDoc = x.find((item) =>
      item.arr.find((item) => item.code === value)
    );
    const updatedArr = searchedDoc.arr.filter((item) => item.code !== value);
    const docRef = doc(db, "test", searchedDoc.id);
    try {
      await setDoc(docRef, {
        arr: updatedArr,
      });
    } catch (error) {
      console.log(error);
    }
    toast.success("işlem başarılı");
    setLoading(false);
  };
  const handleUpdate = async () => {
    // setLoading(true);
    const querySnapshot = await getDocs(collection(db, "test"));
    let x = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      x.push({ ...doc.data(), id: doc.id });
    });
    const searchedDoc = x.find((item) =>
      item.arr.find((item) => item.code === value)
    );
    const updatedArr = searchedDoc.arr.map((item) => {
      if (item.code === value) {
        return { ...item, active: false };
      } else {
        return item;
      }
    });
    const docRef = doc(db, "test", searchedDoc.id);
    try {
      await setDoc(docRef, {
        arr: updatedArr,
      });
    } catch (error) {
      console.log(error);
    }
    toast.success("işlem başarılı");
    setLoading(false);
  };
  return (
    <div className="flex flex-col gap-3">
      <input
        type="text"
        placeholder="info"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        className="w-fit bg-transparent border rounded-lg p-3"
      />
      <button
        type="button"
        disabled={loading || value === ""}
        onClick={handleSubmit}
        className="simple_button disabled:opacity-50"
      >
        {loading ? "..." : "Submit"}
      </button>
      <button
        type="button"
        disabled={loading || value === ""}
        onClick={handleDelete}
        className="simple_button disabled:opacity-50"
      >
        {loading ? "..." : "Delete"}
      </button>
      <button
        type="button"
        disabled={loading || value === ""}
        onClick={handleUpdate}
        className="simple_button disabled:opacity-50"
      >
        {loading ? "..." : "Update"}
      </button>
    </div>
  );
}
