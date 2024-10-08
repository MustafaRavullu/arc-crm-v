"use client";

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  TrashIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import useWhenClickedOutside from "@/hooks/useWhenClickedOutside";
import { useWorkTrackingContext } from "@/contexts/workTrackingContext";
import Select from "@/components/Select";
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

export default function FiberOrder() {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const createWorkOrder = async (url) => {
    try {
      await setDoc(doc(db, "workOrders", uuidv4()), {
        workOrderCode: formData.workOrderCode,
        productType: formData.productType,
        customer: formData.customer,
        image: url,
        startedAt: new Date().toLocaleDateString("tr-TR"),
        finishedAt: "",
        active: true,
        jobType: "normal",
        targetAmount: formData.targetAmount,
        stories: formData.stories,
      });
      // toast.success("İş emri başarıyla oluşturuldu.", {
      //   position: "top-center",
      // });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    // setLoading(false);
    setFormData({
      workOrderCode: "", //bitti
      productType: "ip", // otomtatik
      customer: "", // select bitti
      image: "", //bitti
      startedAt: "", // otomatik
      finishedAt: "", //otomatik
      active: true, //otomatik
      jobType: "normal", //otomatik
      targetAmount: [
        // select
        {
          id: uuidv4(),
          code: "",
          amount: "",
          unit: "",
        },
      ],
      stories: [],
    });
    setImage(null);
    toast.success("İş emri başarıyla oluşturuldu.", {
      position: "top-center",
    });
    setLoading(false);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const q = query(
      collection(db, "workOrders"),
      where(
        "workOrderCode",
        "==",
        formData.workOrderCode.replace(/\s/g, "").toLocaleLowerCase("tr")
      )
    );
    let isWorkOrderExists;
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      isWorkOrderExists = { ...doc.data(), id: doc.id };
    });
    if (isWorkOrderExists) {
      toast.error("Hata: Bu iş emri kodu zaten var", {
        position: "top-center",
      });
      setLoading(false);
      return;
    }
    const imageRef = ref(storage, `images/${uuidv4()}`);
    uploadBytes(imageRef, image)
      .then((snapshot) => {
        return getDownloadURL(snapshot.ref);
      })
      .then((url) => {
        return createWorkOrder(url);
      });
    const workOrderListQuerySnapshot = await getDocs(
      collection(db, "workOrderLists")
    );
    let workOrderLists = [];
    workOrderListQuerySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      workOrderLists.push({ ...doc.data(), id: doc.id });
    });
    if (workOrderLists[workOrderLists.length - 1].arr.length < 3000) {
      const docRef = doc(db, "workOrderLists", `${workOrderLists.length}`);
      try {
        await setDoc(
          docRef,
          {
            arr: [
              ...workOrderLists[workOrderLists.length - 1].arr,
              {
                workOrderCode: formData.workOrderCode,
                productType: formData.productType,
                active: formData.active,
                jobType: formData.jobType,
              },
            ],
          },
          { merge: true }
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      const docRef = doc(db, "workOrderLists", `${workOrderLists.length + 1}`);
      try {
        await setDoc(
          docRef,
          {
            arr: [
              {
                workOrderCode: formData.workOrderCode,
                productType: formData.productType,
                active: formData.active,
                jobType: formData.jobType,
              },
            ],
          },
          { merge: true }
        );
      } catch (error) {
        console.log(error);
      }
    }
  };
  const [formData, setFormData] = useState({
    workOrderCode: "", //bitti
    productType: "ip", // otomtatik
    customer: "", // select bitti
    image: "", //bitti
    startedAt: "", // otomatik
    finishedAt: "", //otomatik
    active: true, //otomatik
    jobType: "normal", //otomatik
    targetAmount: [
      // select
      {
        id: uuidv4(),
        code: "",
        amount: "",
        unit: "",
      },
    ],
    stories: [],
  });

  function handleFiberInputChange(event, index) {
    const onChangeArray = formData.targetAmount;
    onChangeArray[index].amount = event.target.value;
    setFormData({ ...formData, targetAmount: onChangeArray });
  }
  function handleFiberItemDelete(id) {
    const updatedFiberInfos = [...formData.targetAmount];
    updatedFiberInfos.splice(id, 1);
    setFormData({ ...formData, targetAmount: [...updatedFiberInfos] });
    toast.success("Alan silindi", { position: "top-center" });
  }
  function handleFiberItemAdd() {
    setFormData({
      ...formData,
      targetAmount: [
        ...formData.targetAmount,
        {
          id: uuidv4(),
          code: "",
          amount: "",
          unit: "",
        },
      ],
    });
    toast.success("Yeni alan eklendi", { position: "top-center" });
  }
  const {
    customers,
    fiberTypes,
    colors,
    fiberCodes,
    setCustomers,
    setFiberCodes,
  } = useWorkTrackingContext();
  const units = [
    {
      id: 1,
      unit: "Kg",
    },
    {
      id: 2,
      unit: "Ton",
    },
  ];
  useEffect(() => {
    const getListValues = async () => {
      const querySnapshot = await getDocs(collection(db, "customers"));
      const customerLists = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        customerLists.push({ ...doc.data(), id: doc.id });
      });
      const mergedArray = customerLists.flatMap((obj) => obj.arr);
      setCustomers(mergedArray);

      const querySnapshot2 = await getDocs(collection(db, "fiberCodes"));
      const fiberCodeLists = [];
      querySnapshot2.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        fiberCodeLists.push({ ...doc.data(), id: doc.id });
      });
      const mergedArray2 = fiberCodeLists.flatMap((obj) => obj.arr);
      setFiberCodes(mergedArray2);
    };
    getListValues();
  }, []);
  return (
    <form
      onSubmit={handleSubmit}
      className=" relative shadow-md  h-[calc(100vh-17rem)] bg-white dark:bg-arc_black"
    >
      <div className="absolute inset-0 p-6 flex overflow-auto flex-col gap-2">
        <div className="flex flex-col md:flex-row gap-3 md:w-[900px] ">
          <fieldset className="border border-black dark:border-white p-2 w-full md:flex-1    rounded-lg">
            <legend className="font-bold">Adım 1(Zorunlu)</legend>
            <Input
              type={"text"}
              placeholder={"İş emri kodu girin"}
              label={"İş Emri Kodu"}
              formData={formData}
              setFormData={setFormData}
              name={"workOrderCode"}
            />
          </fieldset>
          <fieldset className="border border-black dark:border-white p-2 w-full md:flex-1    rounded-lg">
            <legend className="font-bold">Adım 2(Zorunlu)</legend>
            <div className="flex flex-col gap-1">
              <div className="font-semibold">İş Emri Fotoğrafı</div>
              {image ? (
                <div className="flex gap-2">
                  {image.name}{" "}
                  <button type="button" onClick={() => setImage(null)}>
                    <TrashIcon className="w-5" />
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="image-input"
                  className="cursor-pointer simple_button w-full  text-center"
                >
                  Fotoğraf Seç
                  <input
                    type="file"
                    id="image-input"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) => setImage(event.target.files[0])}
                  />
                </label>
              )}
            </div>
          </fieldset>
          <fieldset className="border border-black dark:border-white p-2 w-full md:flex-1    rounded-lg">
            <legend className="font-bold">Adım 3(Zorunlu)</legend>
            <BasicSelect
              data={customers}
              setFormData={setFormData}
              formData={formData}
              property={"customer"}
              label={"Müşteri"}
            />
          </fieldset>
        </div>

        <fieldset className="md:flex md:flex-col md:w-fit md:gap-3 border border-black dark:border-white p-2 w-full  rounded-lg">
          <legend className="font-bold">Adım 4(Zorunlu)</legend>
          <div className=" relative md:w-[500px] h-[400px]">
            <div className="h-full flex flex-col gap-2">
              <div className="font-semibold">Miktar</div>
              <button
                type="button"
                onClick={handleFiberItemAdd}
                className="flex justify-center text-white dark:text-black p-3 bg-arc_black z-40 rounded-lg sticky -top-6  dark:bg-white "
              >
                <PlusIcon className="w-5 aspect-square" />
                Yeni Alan Ekle
              </button>
              <div className="flex-1 relative ">
                <div className=" absolute divide-y divide-arc_black dark:divide-white inset-0 overflow-auto">
                  {formData.targetAmount.map((item, index) => (
                    <div key={index} className="flex flex-col gap-2 py-5">
                      <Select
                        property="code"
                        items={fiberCodes}
                        formData={formData}
                        setFormData={setFormData}
                        title="İplik Kodu Seçin"
                        searchActive={true}
                        complex={true}
                        complexProperty="targetAmount"
                        complexIndex={index}
                      />
                      <input
                        type="number"
                        placeholder="Miktar girin"
                        value={item.amount}
                        onChange={(event) =>
                          handleFiberInputChange(event, index)
                        }
                        className="w-full text-base border bg-transparent border-gray-100 dark:border-gray-600 rounded-lg flex gap-1 focus-within:border-black dark:focus-within:border-white outline-none p-3"
                      />
                      <Select
                        property="unit"
                        items={units}
                        formData={formData}
                        setFormData={setFormData}
                        title="Birim seçin"
                        searchActive={false}
                        complex={true}
                        complexProperty="targetAmount"
                        complexIndex={index}
                      />
                      <button
                        type="button"
                        className="w-fit mx-auto"
                        onClick={() => handleFiberItemDelete(index)}
                      >
                        <TrashIcon className="w-8 aspect-square text-red-500" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </fieldset>
        <button
          type="submit"
          disabled={
            loading ||
            formData.workOrderCode === "" ||
            image === null ||
            formData.customer === "" ||
            formData.targetAmount.some((fiberInfo) =>
              Object.values(fiberInfo).some((value) => value === "")
            ) ||
            formData.targetAmount.length === 0
          }
          className="simple_button z-50 flex justify-center w-full md:w-fit disabled:opacity-50"
        >
          {loading ? (
            <HashLoader size={20} color="#008000" />
          ) : (
            "İş Emrini Oluştur"
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
        className="p-3 bg-white text-base dark:bg-arc_black border rounded-lg dark:border-white border-black outline-none"
      />
    </div>
  );
};

const BasicSelect = ({ data, setFormData, formData, property, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useWhenClickedOutside(() => setIsOpen(false));
  const [query, setQuery] = useState("");
  const filteredData = data.filter((item) =>
    item.name.toLocaleLowerCase("tr").includes(query.toLocaleLowerCase("tr"))
  );
  const handleClick = (name) => {
    setFormData({ ...formData, [property]: name });
    setIsOpen(false);
  };
  return (
    <div className="relative flex flex-col gap-1 w-full" ref={ref}>
      <label htmlFor="" className="font-semibold">
        {label}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="simple_button w-full flex justify-between gap-10"
      >
        {formData[property] ? formData[property] : "Lütfen seçin"}
        <ChevronDownIcon className="w-5" />
      </button>
      <div
        className={`z-50 absolute flex flex-col text-white dark:text-black top-full right-0 left-0 rounded-lg bg-arc_black shadow-md dark:bg-white ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex border-b items-center border-white dark:border-black">
          <div className="pl-2.5">
            <MagnifyingGlassIcon className="w-5 " />
          </div>
          <input
            type="text"
            placeholder="Ara"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="bg-arc_black text-base dark:bg-white p-2.5 outline-none w-[170px]"
          />
        </div>
        <div className="flex flex-col gap-2 h-[200px] overflow-auto">
          {filteredData.map((item, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleClick(item.transactionPoint)}
              className="p-3 hover:bg-white rounded-lg hover:text-black dark:hover:bg-arc_black dark:hover:text-white"
            >
              {item.transactionPoint}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const MultipleSelect = ({ setFormData, formData }) => {
  const { fiberTypes } = useWorkTrackingContext();
  const [query, setQuery] = useState("");
  const filteredData = fiberTypes.filter((item) =>
    item.name.toLocaleLowerCase("tr").includes(query.toLocaleLowerCase("tr"))
  );
  console.log(formData);
  return (
    <div className="flex flex-col gap-1 w-[210px]">
      <label htmlFor="" className="font-semibold">
        İplik Türü
      </label>
      <div className="h-[210px] rounded-lg bg-white shadow-md dark:bg-arc_black p-3 flex flex-col gap-2">
        <div className="flex border-b items-center border-black dark:border-white">
          <div className="pl-2.5">
            <MagnifyingGlassIcon className="w-5 " />
          </div>
          <input
            type="text"
            placeholder="Ara"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="bg-white dark:bg-arc_black p-2.5 outline-none w-[170px]"
          />
        </div>
        <div className="flex-1 relative">
          <div className="absolute overflow-auto inset-0 flex flex-col gap-2">
            {filteredData.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setFormData({
                    ...formData,
                    fiber: !formData.fiber.includes(item.name)
                      ? [...formData.fiber, item.name]
                      : [...formData.fiber],
                  });
                }}
                className={`flex justify-between font-semibold p-2 rounded-lg border border-arc_black dark:border-white ${
                  formData.fiber.includes(item.name) &&
                  "bg-black text-white dark:bg-white dark:text-black"
                }`}
              >
                {item.name}
                {formData.fiber.includes(item.name) && (
                  <XCircleIcon
                    className="w-5"
                    onClick={(event) => {
                      event.stopPropagation();
                      setFormData({
                        ...formData,
                        fiber: [
                          ...formData.fiber.filter((x) => x !== item.name),
                        ],
                      });
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
