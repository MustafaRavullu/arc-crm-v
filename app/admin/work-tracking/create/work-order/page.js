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

export default function WorkOrder() {
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
        fiber: formData.fiber,
        description: formData.description, // bitti
        grammage: formData.grammage, // bitti
        bedenBoy: formData.bedenBoy, // bitti
        bedenEn: formData.bedenEn, // bitti
        kolBoyu: formData.kolBoyu, // bitti
        kolPazu: formData.kolPazu, // bitti
        kolEni: formData.kolEni, // bitti
        onYakaDusuklugu: formData.onYakaDusuklugu, // bitti
        arkaYakaDusuklugu: formData.arkaYakaDusuklugu, // bitti
        omuzDusuklugu: formData.omuzDusuklugu, // bitti
        ense: formData.ense, // bitti
        bedenOnBandGenisligi: formData.bedenOnBandGenisligi, // bitti
        bedenOnBandUzunlugu: formData.bedenOnBandUzunlugu, // bitti
        bedenLastikBoyu: formData.bedenLastikBoyu, // bitti
        yakaYuksekligi: formData.yakaYuksekligi, // bitti
        yakaEni: formData.yakaEni, // bitti
        makinaNo: formData.makinaNo, // bitti
        targetAmount: formData.targetAmount,
        stories: formData.stories,
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setFormData({
      id: uuidv4(),
      workOrderCode: "", //bitti
      productType: "ürün", // otomtatik
      customer: "", // select bitti
      image: "", //bitti
      startedAt: "", // otomatik
      finishedAt: "", //otomatik
      active: true, //otomatik
      jobType: "normal", //otomatik
      fiber: [], // select bitti
      description: "", // bitti
      grammage: "", // bitti
      bedenBoy: "", // bitti
      bedenEn: "", // bitti
      kolBoyu: "", // bitti
      kolPazu: "", // bitti
      kolEni: "", // bitti
      onYakaDusuklugu: "", // bitti
      arkaYakaDusuklugu: "", // bitti
      omuzDusuklugu: "", // bitti
      ense: "", // bitti
      bedenOnBandGenisligi: "", // bitti
      bedenOnBandUzunlugu: "", // bitti
      bedenLastikBoyu: "", // bitti
      yakaYuksekligi: "", // bitti
      yakaEni: "", // bitti
      makinaNo: "", // bitti
      targetAmount: [
        // select
        // {
        //   id: 1,
        //   color: "",
        //   amount: "",
        // },
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
    // iş emirlerinin filtre özelliklerini depoladığımız kısım
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
                amount: 0,
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
                amount: 0,
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
    id: uuidv4(),
    workOrderCode: "", //bitti
    productType: "ürün", // otomtatik
    customer: "", // select bitti
    image: "", //bitti
    startedAt: "", // otomatik
    finishedAt: "", //otomatik
    active: true, //otomatik
    jobType: "normal", //otomatik
    fiber: [], // select bitti
    description: "", // bitti
    grammage: "", // bitti
    bedenBoy: "", // bitti
    bedenEn: "", // bitti
    kolBoyu: "", // bitti
    kolPazu: "", // bitti
    kolEni: "", // bitti
    onYakaDusuklugu: "", // bitti
    arkaYakaDusuklugu: "", // bitti
    omuzDusuklugu: "", // bitti
    ense: "", // bitti
    bedenOnBandGenisligi: "", // bitti
    bedenOnBandUzunlugu: "", // bitti
    bedenLastikBoyu: "", // bitti
    yakaYuksekligi: "", // bitti
    yakaEni: "", // bitti
    makinaNo: "", // bitti
    targetAmount: [
      // select
      // {
      //   id: 1,
      //   color: "",
      //   amount: "",
      // },
    ],
    stories: [],
  });
  const inputInfos = [
    {
      id: 1,
      type: "number",
      placeholder: "Gramaj girin",
      label: "Gramaj",
      name: "grammage",
    },
    {
      id: 2,
      type: "number",
      placeholder: "Beden boyu girin",
      label: "Beden Boyu",
      name: "bedenBoy",
    },
    {
      id: 3,
      type: "number",
      placeholder: "Beden eni girin",
      label: "Beden Eni",
      name: "bedenEn",
    },
    {
      id: 4,
      type: "number",
      placeholder: "Kol boyu girin",
      label: "Kol Boyu",
      name: "kolBoyu",
    },
    {
      id: 5,
      type: "number",
      placeholder: "Kol pazu ölçüsü girin",
      label: "Kol Pazu Ölçüsü",
      name: "kolPazu",
    },
    {
      id: 6,
      type: "number",
      placeholder: "Kol enini girin",
      label: "Kol Eni",
      name: "kolEni",
    },
    {
      id: 7,
      type: "number",
      placeholder: "Ön yaka düşüklüğünü girin",
      label: "Ön Yaka Düşüklüğü",
      name: "onYakaDusuklugu",
    },
    {
      id: 8,
      type: "number",
      placeholder: "Arka yaka düşüklüğünü girin",
      label: "Arka Yaka Düşüklüğü",
      name: "arkaYakaDusuklugu",
    },
    {
      id: 9,
      type: "number",
      placeholder: "Omuz düşüklüğünü girin",
      label: "Omuz Düşüklüğü",
      name: "omuzDusuklugu",
    },
    {
      id: 10,
      type: "number",
      placeholder: "Ense ölçüsünü girin",
      label: "Ense Ölçüsü",
      name: "ense",
    },
    {
      id: 11,
      type: "number",
      placeholder: "Beden ön band genişliği girin",
      label: "Beden Ön Band Genişliği",
      name: "bedenOnBandGenisligi",
    },
    {
      id: 12,
      type: "number",
      placeholder: "Beden ön band uzunluğu girin",
      label: "Beden Ön Band Uzunluğu",
      name: "bedenOnBandUzunlugu",
    },
    {
      id: 13,
      type: "number",
      placeholder: "Beden lastik boyu girin",
      label: "Beden Lastik Boyu",
      name: "bedenLastikBoyu",
    },
    {
      id: 14,
      type: "number",
      placeholder: "Yaka yüksekliğini girin",
      label: "Yaka Yüksekliği",
      name: "yakaYuksekligi",
    },
    {
      id: 15,
      type: "number",
      placeholder: "Yaka enini girin",
      label: "Yaka Eni",
      name: "yakaEni",
    },
    {
      id: 16,
      type: "number",
      placeholder: "Makina no girin",
      label: "Makina No",
      name: "makinaNo",
    },
  ];
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
          color: "",
          amount: "",
        },
      ],
    });
    toast.success("Yeni alan eklendi", { position: "top-center" });
  }
  const {
    customers,
    fiberTypes,
    colors,
    setCustomers,
    setFiberTypes,
    setColors,
  } = useWorkTrackingContext();
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

      const querySnapshot2 = await getDocs(collection(db, "fiberTypes"));
      const fiberTypeLists = [];
      querySnapshot2.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        fiberTypeLists.push({ ...doc.data(), id: doc.id });
      });
      setFiberTypes(fiberTypeLists);

      const querySnapshot3 = await getDocs(collection(db, "colors"));
      const colorLists = [];
      querySnapshot3.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        colorLists.push({ ...doc.data(), id: doc.id });
      });
      const mergedArray3 = colorLists.flatMap((obj) => obj.arr);
      setColors(mergedArray3);
    };
    getListValues();
  }, []);
  return (
    <form
      onSubmit={handleSubmit}
      className=" relative shadow-md h-[calc(100vh-17rem)] md:mb-0  md:h-full bg-white dark:bg-arc_black"
    >
      <div className="absolute inset-0 overflow-auto p-6 flex  flex-col gap-2">
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
          <fieldset className="border border-black dark:border-white p-2 w-full md:flex-1  rounded-lg">
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
          <fieldset className="md:flex md:flex-col md:flex-1 md:gap-3 border border-black dark:border-white p-2 w-full  rounded-lg">
            <legend className="font-bold">Adım 3</legend>
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
          <legend className="font-bold">Adım 4</legend>
          <div className="md:grid md:grid-cols-7 md:gap-3 flex flex-col gap-2">
            {inputInfos.map((item) => (
              <Input
                key={item.id}
                {...item}
                formData={formData}
                setFormData={setFormData}
              />
            ))}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="font-semibold">
              Açıklama
            </label>
            <textarea
              value={formData.description}
              onChange={(event) =>
                setFormData({ ...formData, description: event.target.value })
              }
              placeholder="İş emri açıklaması girin"
              className="bg-white text-base outline-none dark:bg-arc_black p-3 border border-arc_black dark:border-white rounded-lg"
            ></textarea>
          </div>
        </fieldset>

        <div className="flex flex-col md:flex-row gap-3">
          <fieldset className="md:flex md:flex-col md:w-fit md:gap-3 border border-black dark:border-white p-2 w-full  rounded-lg">
            <legend className="font-bold">Adım 5</legend>
            <div className="w-full md:w-[300px] h-[300px] flex flex-col gap-2 ">
              <div className="font-semibold">Miktar</div>
              <button
                type="button"
                onClick={handleFiberItemAdd}
                className="flex justify-center text-white dark:text-black p-3 bg-arc_black z-40 rounded-lg sticky -top-6  dark:bg-white "
              >
                <PlusIcon className="w-5 aspect-square" />
                Yeni Alan Ekle
              </button>
              <div className="flex-1 flex relative">
                <div className="flex-1 absolute divide-y divide-arc_black dark:divide-white inset-0 overflow-auto">
                  {formData.targetAmount.map((item, index) => (
                    <div key={index} className="flex py-5 flex-col gap-2 ">
                      <Select
                        property="color"
                        items={colors}
                        formData={formData}
                        setFormData={setFormData}
                        title="Renk seçin"
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
                        className="w-full text-base border bg-transparent border-arc_black dark:border-white rounded-lg flex gap-1 focus-within:border-black dark:focus-within:border-white outline-none p-3"
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
          </fieldset>
          <fieldset className="md:flex md:flex-col md:w-fit md:gap-3 border border-black dark:border-white p-2 w-full  rounded-lg">
            <legend className="font-bold">Adım 6(Zorunlu)</legend>
            <MultipleSelect formData={formData} setFormData={setFormData} />
          </fieldset>
        </div>
        <button
          type="submit"
          disabled={
            formData.workOrderCode === "" ||
            image === null ||
            formData.fiber.length === 0 ||
            (formData.targetAmount.length !== 0 &&
              formData.targetAmount.some((productAmount) =>
                Object.values(productAmount).some((value) => value === "")
              )) ||
            loading
          }
          className="simple_button z-50 flex justify-center w-full md:w-fit"
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
    <div className="flex flex-col gap-1 w-full ">
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
    <div className="relative flex flex-col gap-1  w-full" ref={ref}>
      <label htmlFor="" className="font-semibold">
        {label}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="simple_button  w-full flex justify-between gap-10"
      >
        {formData[property] ? formData[property] : "Lütfen seçin"}
        <ChevronDownIcon className="w-5" />
      </button>
      <div
        className={`z-10 absolute flex  flex-col  top-full right-0 left-0 rounded-lg bg-arc_black shadow-md dark:bg-white text-white dark:text-black ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex border-b sticky top-0 items-center border-white dark:border-arc_black">
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
        <div className="h-[200px] overflow-auto flex flex-col gap-2">
          {filteredData.map((item, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleClick(item.transactionPoint)}
              className="p-3 hover:bg-white rounded-lg hover:text-black dark:hover:bg-black dark:hover:text-white"
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
  return (
    <div className="flex flex-col gap-1 w-full md:w-[300px]">
      <label htmlFor="" className="font-semibold">
        İplik Türü
      </label>
      <div className="h-[210px] rounded-lg bg-white dark:bg-arc_black p-3 flex flex-col gap-2">
        <div className="flex border-b items-center border-black dark:border-white">
          <div className="pl-2.5">
            <MagnifyingGlassIcon className="w-5 " />
          </div>
          <input
            type="text"
            placeholder="Ara"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="bg-white text-base dark:bg-arc_black p-2.5 outline-none w-[170px]"
          />
        </div>
        <div className="flex-1 relative">
          <div className="absolute overflow-auto h-[140px] md:h-[200px]  inset-0 flex flex-col gap-2">
            {filteredData.map((item) => (
              <button
                key={item.id}
                type="button"
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
                {item.displayName}
                {formData.fiber.includes(item.name) && (
                  <XCircleIcon
                    className="w-5"
                    type="button"
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
