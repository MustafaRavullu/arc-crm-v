"use client";

import { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import { v4 as uuidv4 } from "uuid";
import ButtonSelect from "./ButtonSelect";
import { toast } from "sonner";
import Select from "./Select";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/firebase.config";
import { useRouter } from "next/navigation";
import { HashLoader } from "react-spinners";

// {
//   id: 1,
//   operationType: "teslimEt",
//   subcontractorFollower: "Mehmet",
//   operationNumber: "1",
//   operationTime: "12.12.2023 16:03:10",
//   workOrderCode: "1234-1",
//   fiberAmount: [
//     {
//       id: 1,
//       code: "23424",
//       amount: "300",
//       unit: "kg",
//     },
//     {
//       id: 2,
//       code: "23423",
//       amount: "11",
//       unit: "kg",
//     },
//   ],
//   transactionPointType: "ipdeposu",
//   transactionPoint: "İp deposu",
// },
// {
//   id: 2,
//   operationType: "teslimAl",
//   subcontractorFollower: "Mehmet",
//   operationNumber: "2",
//   operationTime: "12.12.2023 16:30:45",
//   workOrderCode: "1234-1",
//   productAmount: [
//     {
//       id: 1,
//       color: "taş",
//       amount: "5000",
//     },
//     {
//       id: 2,
//       color: "mavi",
//       amount: "4000",
//     },
//   ],
//   transactionPointType: "ipdeposu",
//   transactionPoint: "İp deposu",
// }

function WorkerForm() {
  const { data: session } = useSession();
  useEffect(() => {
    const getFiberAndWorkOrderCodesAndCustomers = async () => {
      const querySnapshot = await getDocs(collection(db, "fiberCodes"));
      const fiberCodeLists = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        fiberCodeLists.push({ ...doc.data(), id: doc.id });
      });
      const mergedArray = fiberCodeLists.flatMap((obj) => obj.arr);
      setFiberCodes(mergedArray);

      const querySnapshot2 = await getDocs(collection(db, "workOrderLists"));
      const workOrderCodeLists = [];
      querySnapshot2.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        workOrderCodeLists.push({ ...doc.data(), id: doc.id });
      });
      const mergedArray2 = workOrderCodeLists.flatMap((obj) => obj.arr);
      setProductCodes(
        mergedArray2.filter(
          (item) => item.productType === "ürün" && item.active === true
        )
      );

      const querySnapshot3 = await getDocs(collection(db, "customers"));
      const customerLists = [];
      querySnapshot3.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        customerLists.push({ ...doc.data(), id: doc.id });
      });
      const mergedArray3 = customerLists.flatMap((obj) => obj.arr);
      setCustomers(mergedArray3);

      const querySnapshot4 = await getDocs(collection(db, "colors"));
      const colorLists = [];
      querySnapshot4.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        colorLists.push({ ...doc.data(), id: doc.id });
      });
      const mergedArray4 = colorLists.flatMap((obj) => obj.arr);
      setColors(mergedArray4);

      const querySnapshot5 = await getDocs(collection(db, "subcontractors"));
      const subcontractorLists = [];
      querySnapshot5.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        subcontractorLists.push({ ...doc.data(), id: doc.id });
      });
      const mergedArray5 = subcontractorLists.flatMap((obj) => obj.arr);
      setSubcontractors(mergedArray5);
    };
    getFiberAndWorkOrderCodesAndCustomers();
  }, []);
  const router = useRouter();
  const [fiberCodes, setFiberCodes] = useState([]);
  const [productCodes, setProductCodes] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [colors, setColors] = useState([]);
  const [subcontractors, setSubcontractors] = useState([]);
  const [loading, setLoading] = useState(false);
  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    if (formData.transactionPoint !== "") {
      // setFormData({
      //   ...formData,
      //   subcontractorFollower:
      //     session?.user?.username
      //       .split("@")[0]
      //       .charAt(0)
      //       .toLocaleUpperCase("tr") +
      //     session?.user?.username.split("@")[0].slice(1),
      //   operationTime: new Date().toLocaleString("tr-TR"),
      // });
      const docRef = doc(db, "workOrders", storedWorkOrder.id);
      if (formData.productType === "ürün") {
        await updateDoc(docRef, {
          stories: arrayUnion({
            id: uuidv4(),
            operationType: formData.operationType,
            productType: "ürün",
            subcontractorFollower:
              session?.user?.username
                .split("@")[0]
                .charAt(0)
                .toLocaleUpperCase("tr") +
              session?.user?.username.split("@")[0].slice(1),
            operationNumber: formData.operationNumber,
            operationTime: new Date().toLocaleString("tr-TR"),
            workOrderCode: formData.workOrderCode,
            productAmount: formData.productAmount,
            transactionPointType: formData.transactionPointType,
            transactionPoint: formData.transactionPoint,
          }),
        });
      } else if (formData.productType === "ip") {
        const docRef = doc(db, "workOrders", storedWorkOrder.id);
        await updateDoc(docRef, {
          stories: arrayUnion({
            id: uuidv4(),
            operationType: formData.operationType,
            productType: "ip",
            subcontractorFollower:
              session?.user?.username
                .split("@")[0]
                .charAt(0)
                .toLocaleUpperCase("tr") +
              session?.user?.username.split("@")[0].slice(1),
            operationNumber: formData.operationNumber,
            operationTime: new Date().toLocaleString("tr-TR"),
            workOrderCode: formData.workOrderCode,
            fiberAmount: formData.fiberAmount,
            transactionPointType: formData.transactionPointType,
            transactionPoint: formData.transactionPoint,
          }),
        });
      }
      setProductTypeSelect({ productType: "" });
      toast.success(
        "İşleminiz başarıyla gerçekleştirildi. Yeni işlem yapmak için hazırsınız.",
        { position: "top-center" }
      );
      setLoading(false);
      // form gönderme işlemi
      router.push("/worker");
      setActivePage(1);
    } else {
      toast.error("Lütfen işlem noktası seçin!", { position: "top-center" });
      setLoading(false);
    }
  }
  const productTransferFormStruct = {
    id: uuidv4(),
    operationType: "",
    productType: "ürün",
    subcontractorFollower:
      session?.user?.username.split("@")[0].charAt(0).toLocaleUpperCase("tr") +
      session?.user?.username.split("@")[0].slice(1),
    operationNumber: "",
    operationTime: "",
    workOrderCode: "",
    productAmount: [
      {
        id: uuidv4(),
        color: "",
        amount: "",
      },
    ],
    transactionPointType: "",
    transactionPoint: "",
  };
  const fiberTransferFormStruct = {
    id: uuidv4(),
    operationType: "",
    subcontractorFollower: "",
    productType: "ip",
    operationNumber: "",
    operationTime: "",
    workOrderCode: "",
    fiberAmount: [
      {
        id: uuidv4(),
        code: "",
        amount: "",
        unit: "",
      },
    ],
    transactionPointType: "",
    transactionPoint: "",
  };

  const initialFormValues = {
    id: uuidv4(),
    createdAt: "",
    operationType: "",
    subcontractorFollower: "", // kullanıcının bilgilerinden çekeceksin
    productType: "",
    fiberInfos: [
      {
        id: uuidv4(),
        code: "",
        amount: "",
        unit: "",
      },
    ],
    productCode: "",
    productAmount: [
      {
        id: uuidv4(),
        color: "",
        amount: "",
      },
    ],
    transactionPointType: "",
    transactionPoint: "",
  };
  const [productTypeSelect, setProductTypeSelect] = useState({
    productType: "",
  });
  const [formData, setFormData] = useState(
    productTypeSelect.productType === "Ürün"
      ? productTransferFormStruct
      : fiberTransferFormStruct
  );
  useEffect(() => {
    setFormData(
      productTypeSelect.productType === "Ürün"
        ? productTransferFormStruct
        : fiberTransferFormStruct
    );
  }, [productTypeSelect]);
  const [activePage, setActivePage] = useState(1);
  // const productCodes = [
  //   {
  //     id: 1,
  //     workOrderCode: "1543-3-İade",
  //   },
  //   {
  //     id: 2,
  //     workOrderCode: "5294-1",
  //   },
  //   {
  //     id: 3,
  //     workOrderCode: "8462-2-Y.İşleme",
  //   },
  //   {
  //     id: 4,
  //     workOrderCode: "4839-1",
  //   },
  //   {
  //     id: 5,
  //     workOrderCode: "2831-2",
  //   },
  //   {
  //     id: 6,
  //     workOrderCode: "6548-2",
  //   },
  //   {
  //     id: 7,
  //     workOrderCode: "4698-7",
  //   },
  //   {
  //     id: 8,
  //     workOrderCode: "3154-8",
  //   },
  // ];
  const productTypes = [
    {
      id: 1,
      productType: "Ürün",
    },
    {
      id: 2,
      productType: "İp",
    },
  ];
  const transactionPoints = [
    {
      id: 1,
      transactionPoint: "Mehmet Konfeksiyon",
    },
    {
      id: 2,
      transactionPoint: "Ali Dokuma",
    },
    {
      id: 3,
      transactionPoint: "Veli Aksesuar",
    },
  ];
  // const fiberCodes = [
  //   {
  //     id: 1,
  //     code: "54654",
  //   },
  //   {
  //     id: 2,
  //     code: "47651",
  //   },
  //   {
  //     id: 3,
  //     code: "12345",
  //   },
  //   {
  //     id: 4,
  //     code: "98745",
  //   },
  // ];

  const transactionPointTypesForFiberToDeliver = [
    {
      id: 18392370,
      transactionPointType: "Dokuma",
    },
  ];
  const transactionPointTypesForFiberToReceive = [
    {
      id: 18392370,
      transactionPointType: "İp Deposu",
    },
  ];
  const transactionPointTypes =
    formData.productType.toLocaleLowerCase("tr") === "ip"
      ? [
          {
            id: 1,
            transactionPointType: "İp Deposu",
          },
          {
            id: 2,
            transactionPointType: "Dokuma",
          },
        ]
      : [
          {
            id: 1,
            transactionPointType: "Dokuma",
          },
          {
            id: 2,
            transactionPointType: "Yıkama",
          },
          {
            id: 3,
            transactionPointType: "Ütü",
          },
          {
            id: 4,
            transactionPointType: "Konfeksiyon",
          },
          {
            id: 5,
            transactionPointType: "Aksesuar",
          },
          {
            id: 6,
            transactionPointType: "Bitmiş Ürün Deposu",
          },
          {
            id: 7,
            transactionPointType: "Müşteri",
          },
        ];
  const operationTypes = [
    {
      id: 1,
      operationType: "Teslim Al",
    },
    {
      id: 2,
      operationType: "Teslim Et",
    },
  ];
  const [storedWorkOrder, setStoredWorkOrder] = useState(null);
  async function handlePageSkip(activePage) {
    switch (activePage) {
      case 2:
        if (formData.operationType !== "") {
          setActivePage((prev) => prev + 1);
        } else {
          toast.error("Lütfen işlem tipini seçin!", {
            position: "top-center",
          });
        }
        break;
      case 1:
        if (productTypeSelect.productType !== "") {
          setActivePage((prev) => prev + 1);
        } else {
          toast.error("Lütfen ürün tipini seçin!", {
            position: "top-center",
          });
        }
        break;
      case 3:
        if (formData.productType.toLocaleLowerCase("tr") === "ip") {
          if (
            formData.fiberAmount.some((fiberInfo) =>
              Object.values(fiberInfo).some((value) => value === "")
            )
          ) {
            toast.error("Lütfen bütün alanları doldurduğunzdan emin olun!", {
              position: "top-center",
            });
          } else if (formData.fiberAmount.length === 0) {
            toast.error("En az bir alan olmalı. Lütfen alan ekleyin!", {
              position: "top-center",
            });
          } else {
            setActivePage((prev) => prev + 1);
          }
        } else {
          if (
            formData.productAmount.some((productAmount) =>
              Object.values(productAmount).some((value) => value === "")
            )
          ) {
            toast.error("Lütfen bütün alanları doldurduğunzdan emin olun!", {
              position: "top-center",
            });
          } else if (formData.productAmount.length === 0) {
            toast.error("En az bir alan olmalı. Lütfen alan ekleyin!", {
              position: "top-center",
            });
          } else {
            setActivePage((prev) => prev + 1);
          }
        }
        break;
      case 4:
        if (formData.workOrderCode !== "") {
          setLoading(true);
          const q = query(
            collection(db, "workOrders"),
            where(
              "workOrderCode",
              "==",
              formData.workOrderCode.replace(/\s/g, "").toLocaleLowerCase("tr")
            )
          );
          const querySnapshot = await getDocs(q);
          let innerStored;
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            innerStored = { ...doc.data(), id: doc.id };
            setStoredWorkOrder({ ...doc.data(), id: doc.id });
          });
          if (innerStored.stories.length === 0) {
            setFormData({ ...formData, operationNumber: "1" });
          } else {
            setFormData({
              ...formData,
              operationNumber: `${innerStored.stories.length + 1}`,
            });
          }
          setLoading(false);
          setActivePage((prev) => prev + 1);
        } else {
          toast.error("Lütfen ürün kodunu seçin!", {
            position: "top-center",
          });
          setLoading(false);
        }
        break;
      case 5:
        if (formData.transactionPointType !== "") {
          setActivePage((prev) => prev + 1);
        } else {
          toast.error("Lütfen işlem noktası tipi seçin!", {
            position: "top-center",
          });
        }
        break;
      default:
        break;
    }
  }
  const fiberUnits = [
    { id: 1, unit: "Kg" },
    { id: 2, unit: "Ton" },
  ];

  function handleFiberItemAdd() {
    setFormData({
      ...formData,
      fiberAmount: [
        ...formData.fiberAmount,
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
  function handleFiberItemDelete(id) {
    const updatedFiberInfos = [...formData.fiberAmount];
    updatedFiberInfos.splice(id, 1);
    setFormData({ ...formData, fiberAmount: [...updatedFiberInfos] });
    toast.success("Alan silindi", {
      position: "top-center",
    });
  }
  function handleFiberInputChange(event, index) {
    const onChangeArray = formData.fiberAmount;
    onChangeArray[index].amount = event.target.value;
    setFormData({ ...formData, fiberAmount: onChangeArray });
  }
  // const productColors = [
  //   {
  //     id: 1,
  //     color: "mavi",
  //   },
  //   {
  //     id: 2,
  //     color: "kırmızı",
  //   },
  //   {
  //     id: 3,
  //     color: "siyah",
  //   },
  //   {
  //     id: 4,
  //     color: "beyaz",
  //   },
  // ];
  function handleProductAmountInputChange(event, index) {
    const onChangeArray = formData.productAmount;
    onChangeArray[index].amount = event.target.value;
    setFormData({ ...formData, productAmount: onChangeArray });
  }
  function handleProductAmountItemAdd() {
    setFormData({
      ...formData,
      productAmount: [
        ...formData.productAmount,
        {
          id: uuidv4(),
          color: "",
          amount: "",
        },
      ],
    });
    toast.success("Yeni alan eklendi", { position: "top-center" });
  }
  function handleProductAmountItemDelete(index) {
    const updatedProductAmounts = [...formData.productAmount];
    updatedProductAmounts.splice(index, 1);
    setFormData({ ...formData, productAmount: [...updatedProductAmounts] });
    toast.success("Alan silindi", {
      position: "top-center",
    });
  }
  const productStock = [
    {
      id: "1237092391747910",
      name: "bitmişüründeposu",
      transactionPoint: "Bitmiş Ürün Deposu",
      type: "Bitmiş Ürün Deposu",
    },
  ];
  const transactionPointToReceiveForFiber = [
    {
      id: 1,
      transactionPoint: "İp Deposu",
    },
  ];
  const handlePageBack = () => {
    if (activePage === 5) {
      setFormData({ ...formData, transactionPointType: "" });
    } else if (activePage === 6) {
      setFormData({ ...formData, transactionPoint: "" });
    }
    setActivePage((prev) => prev - 1);
  };
  return (
    <div className="flex flex-col w-full min-h-[calc(100dvh-10rem)] md:min-h-[500px] gap-3 max-w-[calc(100vw-5rem)] md:max-w-[600px]">
      <ProgressBar width={activePage * 16.6666666667} />
      <form
        onSubmit={handleSubmit}
        className="w-full justify-between flex-1 flex flex-col "
      >
        {activePage === 2 && (
          <div className="flex flex-col gap-6">
            <p className="font-semibold text-lg">İşlem Tipini Seçin:</p>
            <div className="flex flex-col gap-3">
              <ButtonSelect
                items={operationTypes}
                property="operationType"
                searchActive={false}
                formData={formData}
                setFormData={setFormData}
              />
            </div>
          </div>
        )}
        {activePage === 1 && (
          <div className="flex flex-col gap-6">
            <p className="font-semibold text-lg">Ürün Tipini Seçin:</p>
            <div className="flex flex-col gap-5">
              <ButtonSelect
                items={productTypes}
                property="productType"
                searchActive={false}
                formData={productTypeSelect}
                setFormData={setProductTypeSelect}
              />
            </div>
          </div>
        )}
        {activePage === 3 &&
          formData.productType.toLocaleLowerCase("tr") === "ip" && (
            <div className="flex flex-col gap-6">
              <p className="font-semibold text-lg">İplik Bilgilerini Girin:</p>
              <div className="flex flex-col gap-3 ">
                <button
                  type="button"
                  onClick={handleFiberItemAdd}
                  className="flex justify-center p-3 z-40 rounded-lg sticky top-0 bg-white dark:bg-black border border-gray-100 dark:border-gray-600"
                >
                  <PlusIcon className="w-5 aspect-square" />
                  Yeni Alan Ekle
                </button>
                <div className="flex flex-col   divide-y-2 divide-gray-100 dark:divide-gray-600 h-[calc(100vh-22rem)] overflow-auto">
                  {formData.fiberAmount.map((fiber, index) => (
                    <div key={index} className="flex flex-col gap-1 py-5">
                      <Select
                        property="code"
                        items={fiberCodes}
                        formData={formData}
                        setFormData={setFormData}
                        title="İplik kodunu seçin"
                        searchActive={true}
                        complex={true}
                        complexProperty="fiberAmount"
                        complexIndex={index}
                      />
                      <input
                        type="number"
                        placeholder="Miktar girin"
                        value={fiber.amount}
                        onChange={(event) =>
                          handleFiberInputChange(event, index)
                        }
                        className="w-full text-base border bg-transparent border-gray-100 dark:border-gray-600 rounded-lg flex gap-1 focus-within:border-black dark:focus-within:border-white outline-none p-3"
                      />
                      <Select
                        property="unit"
                        items={fiberUnits}
                        formData={formData}
                        setFormData={setFormData}
                        title="Birim seçin"
                        searchActive={false}
                        complex={true}
                        complexProperty="fiberAmount"
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
          )}
        {activePage === 4 &&
          formData.productType.toLocaleLowerCase("tr") === "ip" && (
            <div className="flex flex-col gap-6">
              <p className="font-semibold text-lg">Ürün Kodunu seçin:</p>
              <div className="flex flex-col gap-5">
                <ButtonSelect
                  items={productCodes}
                  property="workOrderCode"
                  searchActive={true}
                  formData={formData}
                  setFormData={setFormData}
                />
              </div>
            </div>
          )}
        {activePage === 5 &&
          formData.productType.toLocaleLowerCase("tr") === "ip" && (
            <div className="flex flex-col gap-6">
              <p className="font-semibold text-lg">İşlem Noktası Tipi Seçin:</p>
              <div className="flex flex-col gap-3">
                {formData.operationType === "Teslim Et" && (
                  <ButtonSelect
                    items={transactionPointTypesForFiberToDeliver}
                    property="transactionPointType"
                    searchActive={false}
                    formData={formData}
                    setFormData={setFormData}
                  />
                )}
                {formData.operationType === "Teslim Al" && (
                  <ButtonSelect
                    items={transactionPointTypesForFiberToReceive}
                    property="transactionPointType"
                    searchActive={false}
                    formData={formData}
                    setFormData={setFormData}
                  />
                )}
              </div>
            </div>
          )}
        {activePage === 6 &&
          formData.productType.toLocaleLowerCase("tr") === "ip" && (
            <div className="flex flex-col gap-6">
              <p className="font-semibold text-lg">İşlem Noktası Seçin:</p>
              <div className="flex flex-col gap-3">
                {formData.transactionPointType === "Dokuma" && (
                  <ButtonSelect
                    items={subcontractors.filter(
                      (item) => item.type === "Dokuma"
                    )}
                    property="transactionPoint"
                    searchActive={true}
                    formData={formData}
                    setFormData={setFormData}
                  />
                )}
                {formData.transactionPointType === "İp Deposu" && (
                  <ButtonSelect
                    items={transactionPointToReceiveForFiber}
                    property="transactionPoint"
                    searchActive={false}
                    formData={formData}
                    setFormData={setFormData}
                  />
                )}
              </div>
            </div>
          )}
        {/* Eğer ürün tipi ürün ise */}
        {activePage === 3 &&
          formData.productType.toLocaleLowerCase("tr") === "ürün" && (
            <div className="flex flex-col gap-6">
              <p className="font-semibold text-lg">Ürün Bilgilerini Girin:</p>
              <div className="flex flex-col gap-3 ">
                <button
                  type="button"
                  onClick={handleProductAmountItemAdd}
                  className="flex justify-center p-3 z-40 rounded-lg sticky top-0 bg-white dark:bg-black border border-gray-100 dark:border-gray-600"
                >
                  <PlusIcon className="w-5 aspect-square" />
                  Yeni Alan Ekle
                </button>
                <div className="flex flex-col   divide-y-2 divide-gray-100 dark:divide-gray-600 h-[calc(100vh-22rem)] overflow-auto">
                  {formData.productAmount.map((product, index) => (
                    <div key={index} className="flex flex-col gap-1 py-5">
                      <Select
                        property="color"
                        items={colors}
                        formData={formData}
                        setFormData={setFormData}
                        title="Ürün rengini seçin"
                        searchActive={true}
                        complex={true}
                        complexProperty="productAmount"
                        complexIndex={index}
                      />
                      <input
                        type="number"
                        placeholder="Miktar girin"
                        value={product.amount}
                        onChange={(event) =>
                          handleProductAmountInputChange(event, index)
                        }
                        className="w-full text-base border bg-transparent border-gray-100 dark:border-gray-600 rounded-lg flex gap-1 focus-within:border-black dark:focus-within:border-white outline-none p-3"
                      />
                      <button
                        type="button"
                        className="w-fit mx-auto"
                        onClick={() => handleProductAmountItemDelete(index)}
                      >
                        <TrashIcon className="w-8 aspect-square text-red-500" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        {activePage === 4 &&
          formData.productType.toLocaleLowerCase("tr") === "ürün" && (
            <div className="flex flex-col gap-6">
              <p className="font-semibold text-lg">Ürün Kodunu seçin:</p>
              <div className="flex flex-col gap-5">
                <ButtonSelect
                  items={productCodes}
                  property="workOrderCode"
                  searchActive={true}
                  formData={formData}
                  setFormData={setFormData}
                />
              </div>
            </div>
          )}

        {activePage === 5 &&
          formData.productType.toLocaleLowerCase("tr") === "ürün" && (
            <div className="flex flex-col gap-6">
              <p className="font-semibold text-lg">İşlem Noktası Tipi Seçin:</p>
              <div className="flex flex-col gap-3">
                <ButtonSelect
                  items={transactionPointTypes}
                  property="transactionPointType"
                  searchActive={false}
                  formData={formData}
                  setFormData={setFormData}
                />
              </div>
            </div>
          )}
        {activePage === 6 &&
          formData.productType.toLocaleLowerCase("tr") === "ürün" && (
            <div className="flex flex-col gap-6">
              <p className="font-semibold text-lg">İşlem Noktası Seçin:</p>
              <div className="flex flex-col gap-3">
                {formData.transactionPointType === "Müşteri" && (
                  <ButtonSelect
                    items={customers}
                    property="transactionPoint"
                    searchActive={true}
                    formData={formData}
                    setFormData={setFormData}
                  />
                )}
                {formData.transactionPointType === "Dokuma" && (
                  <ButtonSelect
                    items={subcontractors.filter(
                      (item) => item.type === "Dokuma"
                    )}
                    property="transactionPoint"
                    searchActive={true}
                    formData={formData}
                    setFormData={setFormData}
                  />
                )}
                {formData.transactionPointType === "Yıkama" && (
                  <ButtonSelect
                    items={subcontractors.filter(
                      (item) => item.type === "Yıkama"
                    )}
                    property="transactionPoint"
                    searchActive={true}
                    formData={formData}
                    setFormData={setFormData}
                  />
                )}
                {formData.transactionPointType === "Ütü" && (
                  <ButtonSelect
                    items={subcontractors.filter((item) => item.type === "Ütü")}
                    property="transactionPoint"
                    searchActive={true}
                    formData={formData}
                    setFormData={setFormData}
                  />
                )}
                {formData.transactionPointType === "Konfeksiyon" && (
                  <ButtonSelect
                    items={subcontractors.filter(
                      (item) => item.type === "Konfeksiyon"
                    )}
                    property="transactionPoint"
                    searchActive={true}
                    formData={formData}
                    setFormData={setFormData}
                  />
                )}
                {formData.transactionPointType === "Aksesuar" && (
                  <ButtonSelect
                    items={subcontractors.filter(
                      (item) => item.type === "Aksesuar"
                    )}
                    property="transactionPoint"
                    searchActive={true}
                    formData={formData}
                    setFormData={setFormData}
                  />
                )}
                {formData.transactionPointType === "Bitmiş Ürün Deposu" && (
                  <ButtonSelect
                    items={productStock}
                    property="transactionPoint"
                    searchActive={false}
                    formData={formData}
                    setFormData={setFormData}
                  />
                )}
              </div>
            </div>
          )}
        <div className="grid grid-cols-2 gap-5 font-semibold">
          {activePage !== 1 && (
            <button
              type="button"
              onClick={handlePageBack}
              className="p-3 border border-gray-100 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg"
            >
              Geri
            </button>
          )}
          {activePage !== 6 && (
            <button
              type="button"
              onClick={() => handlePageSkip(activePage)}
              className={` ${
                activePage !== 5 && "col-start-2"
              } p-3 bg-green-500 border border-green-500 hover:bg-green-600 hover:border-green-600 text-white rounded-lg`}
            >
              İleri
            </button>
          )}
          {activePage === 6 && (
            <button
              type="submit"
              className="p-3 bg-green-500 border border-green-500 hover:bg-green-600 hover:border-green-600  text-white rounded-lg col-start-2"
            >
              Tamamla
            </button>
          )}
        </div>
      </form>
      {loading && (
        <div className="z-50 fixed inset-0 bg-white/5 flex justify-center items-center pointer-events-none">
          <HashLoader size={60} color="#008000" />
        </div>
      )}
    </div>
  );
}

export default WorkerForm;
