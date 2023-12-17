"use client";

import { useState } from "react";
import ProgressBar from "./ProgressBar";
import { v4 as uuidv4 } from "uuid";
import ButtonSelect from "./ButtonSelect";
import { toast } from "sonner";
import Select from "./Select";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

function WorkerForm() {
  function handleSubmit(event) {
    event.preventDefault();
    if (formData.transactionPoint !== "") {
      setFormData(initialFormValues);
      setActivePage(1);
      toast.success(
        "İşleminiz başarıyla gerçekleştirildi. Yeni işlem yapmak için hazırsınız.",
        { position: "top-right" }
      );
      // form gönderme işlemi
    } else {
      toast.error("Lütfen işlem noktası seçin!", { position: "top-right" });
    }
  }
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
    productAmounts: [
      {
        id: uuidv4(),
        color: "",
        amount: "",
      },
    ],
    transactionPointType: "",
    transactionPoint: "",
  };
  const [formData, setFormData] = useState(initialFormValues);
  const [activePage, setActivePage] = useState(1);
  const productCodes = [
    {
      id: 1,
      productCode: "1543-3-İade",
    },
    {
      id: 2,
      productCode: "5294-1",
    },
    {
      id: 3,
      productCode: "8462-2-Y.İşleme",
    },
    {
      id: 4,
      productCode: "4839-1",
    },
    {
      id: 5,
      productCode: "2831-2",
    },
    {
      id: 6,
      productCode: "6548-2",
    },
    {
      id: 7,
      productCode: "4698-7",
    },
    {
      id: 8,
      productCode: "3154-8",
    },
  ];
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
  const fiberCodes = [
    {
      id: 1,
      code: "54654",
    },
    {
      id: 2,
      code: "47651",
    },
    {
      id: 3,
      code: "12345",
    },
    {
      id: 4,
      code: "98745",
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
          {
            id: 3,
            transactionPointType: "Müşteri",
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
  function handlePageSkip(activePage) {
    switch (activePage) {
      case 1:
        if (formData.operationType !== "") {
          setActivePage((prev) => prev + 1);
        } else {
          toast.error("Lütfen işlem tipini seçin!", {
            position: "top-right",
          });
        }
        break;
      case 2:
        if (formData.productType !== "") {
          setActivePage((prev) => prev + 1);
        } else {
          toast.error("Lütfen ürün tipini seçin!", {
            position: "top-right",
          });
        }
        break;
      case 3:
        if (formData.productType.toLocaleLowerCase("tr") === "ip") {
          if (
            formData.fiberInfos.some((fiberInfo) =>
              Object.values(fiberInfo).some((value) => value === "")
            )
          ) {
            toast.error("Lütfen bütün alanları doldurduğunzdan emin olun!", {
              position: "top-right",
            });
          } else if (formData.fiberInfos.length === 0) {
            toast.error("En az bir alan olmalı. Lütfen alan ekleyin!", {
              position: "top-right",
            });
          } else {
            setActivePage((prev) => prev + 1);
          }
        } else {
          if (
            formData.productAmounts.some((productAmount) =>
              Object.values(productAmount).some((value) => value === "")
            )
          ) {
            toast.error("Lütfen bütün alanları doldurduğunzdan emin olun!", {
              position: "top-right",
            });
          } else if (formData.productAmounts.length === 0) {
            toast.error("En az bir alan olmalı. Lütfen alan ekleyin!", {
              position: "top-right",
            });
          } else {
            setActivePage((prev) => prev + 1);
          }
        }
        break;
      case 4:
        if (formData.productCode !== "") {
          setActivePage((prev) => prev + 1);
        } else {
          toast.error("Lütfen ürün kodunu seçin!", {
            position: "top-right",
          });
        }
        break;
      case 5:
        if (formData.transactionPointType !== "") {
          setActivePage((prev) => prev + 1);
        } else {
          toast.error("Lütfen işlem noktası tipi seçin!", {
            position: "top-right",
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
      fiberInfos: [
        ...formData.fiberInfos,
        {
          id: uuidv4(),
          code: "",
          amount: "",
          unit: "",
        },
      ],
    });
    toast.success("Yeni alan eklendi", { position: "top-right" });
  }
  function handleFiberItemDelete(id) {
    const updatedFiberInfos = [...formData.fiberInfos];
    updatedFiberInfos.splice(id, 1);
    setFormData({ ...formData, fiberInfos: [...updatedFiberInfos] });
    toast.success("Alan silindi", {
      position: "top-right",
    });
  }
  function handleFiberInputChange(event, index) {
    const onChangeArray = formData.fiberInfos;
    onChangeArray[index].amount = event.target.value;
    setFormData({ ...formData, fiberInfos: onChangeArray });
  }
  const productColors = [
    {
      id: 1,
      color: "mavi",
    },
    {
      id: 2,
      color: "kırmızı",
    },
    {
      id: 3,
      color: "siyah",
    },
    {
      id: 4,
      color: "beyaz",
    },
  ];
  function handleProductAmountInputChange(event, index) {
    const onChangeArray = formData.productAmounts;
    onChangeArray[index].amount = event.target.value;
    setFormData({ ...formData, productAmounts: onChangeArray });
  }
  function handleProductAmountItemAdd() {
    setFormData({
      ...formData,
      productAmounts: [
        ...formData.productAmounts,
        {
          id: uuidv4(),
          color: "",
          amount: "",
        },
      ],
    });
    toast.success("Yeni alan eklendi", { position: "top-right" });
  }
  function handleProductAmountItemDelete(index) {
    const updatedProductAmounts = [...formData.productAmounts];
    updatedProductAmounts.splice(index, 1);
    setFormData({ ...formData, productAmounts: [...updatedProductAmounts] });
    toast.success("Alan silindi", {
      position: "top-right",
    });
  }

  return (
    <div className="flex flex-col w-full min-h-[calc(100dvh-10rem)] md:min-h-[500px] gap-3 max-w-[calc(100vw-5rem)] md:max-w-[600px]">
      <ProgressBar width={activePage * 16.6666666667} />
      <form
        onSubmit={handleSubmit}
        className="w-full justify-between flex-1 flex flex-col "
      >
        {activePage === 1 && (
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
        {activePage === 2 && (
          <div className="flex flex-col gap-6">
            <p className="font-semibold text-lg">Ürün Tipini Seçin:</p>
            <div className="flex flex-col gap-5">
              <ButtonSelect
                items={productTypes}
                property="productType"
                searchActive={false}
                formData={formData}
                setFormData={setFormData}
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
                  {formData.fiberInfos.map((fiber, index) => (
                    <div key={index} className="flex flex-col gap-1 py-5">
                      <Select
                        property="code"
                        items={fiberCodes}
                        formData={formData}
                        setFormData={setFormData}
                        title="İplik kodunu seçin"
                        searchActive={true}
                        complex={true}
                        complexProperty="fiberInfos"
                        complexIndex={index}
                      />
                      <input
                        type="number"
                        placeholder="Miktar girin"
                        value={fiber.amount}
                        onChange={(event) =>
                          handleFiberInputChange(event, index)
                        }
                        className="w-full border bg-transparent border-gray-100 dark:border-gray-600 rounded-lg flex gap-1 focus-within:border-black dark:focus-within:border-white outline-none p-3"
                      />
                      <Select
                        property="unit"
                        items={fiberUnits}
                        formData={formData}
                        setFormData={setFormData}
                        title="Birim seçin"
                        searchActive={false}
                        complex={true}
                        complexProperty="fiberInfos"
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
                  property="productCode"
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
          formData.productType.toLocaleLowerCase("tr") === "ip" && (
            <div className="flex flex-col gap-6">
              <p className="font-semibold text-lg">İşlem Noktası Seçin:</p>
              <div className="flex flex-col gap-3">
                <ButtonSelect
                  items={transactionPoints}
                  property="transactionPoint"
                  searchActive={true}
                  formData={formData}
                  setFormData={setFormData}
                />
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
                  {formData.productAmounts.map((product, index) => (
                    <div key={index} className="flex flex-col gap-1 py-5">
                      <Select
                        property="color"
                        items={productColors}
                        formData={formData}
                        setFormData={setFormData}
                        title="Ürün rengini seçin"
                        searchActive={true}
                        complex={true}
                        complexProperty="productAmounts"
                        complexIndex={index}
                      />
                      <input
                        type="number"
                        placeholder="Miktar girin"
                        value={product.amount}
                        onChange={(event) =>
                          handleProductAmountInputChange(event, index)
                        }
                        className="w-full border bg-transparent border-gray-100 dark:border-gray-600 rounded-lg flex gap-1 focus-within:border-black dark:focus-within:border-white outline-none p-3"
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
                  property="productCode"
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
                <ButtonSelect
                  items={transactionPoints}
                  property="transactionPoint"
                  searchActive={true}
                  formData={formData}
                  setFormData={setFormData}
                />
              </div>
            </div>
          )}
        <div className="grid grid-cols-2 gap-5 font-semibold">
          {activePage !== 1 && (
            <button
              type="button"
              onClick={() => setActivePage((prev) => prev - 1)}
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
    </div>
  );
}

export default WorkerForm;
