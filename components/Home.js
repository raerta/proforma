import Image from "next/image";
import React, { useEffect, useState } from "react";
import UrunData from "../public/urunler.json";
import ProformaCreate from "./ProformaCreate";

const Home = () => {
  const today = new Date();
  const day =
    today.getUTCDate() < 10 ? `0${today.getUTCDate()}` : today.getUTCDate();
  const month =
    today.getUTCMonth() < 10
      ? `0${today.getUTCMonth() + 1}`
      : today.getUTCMonth() + 1;
  const year = today.getUTCFullYear();

  const [proformIsVisible, setProformIsVisible] = useState(false);
  const [date, setDate] = useState(`${day}/${month}/${year}`);
  const [urunler, setUrunler] = useState("");
  const [qty, setQty] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [inputText, setInputText] = useState("");
  const [teslimDate, setTeslimDate] = useState("20-25 Gün");
  const [alici, setAlici] = useState({
    aliciAdi: "",
    aliciAdres: "",
    aliciBin: "",
    aliciPhone: "",
  });

  useEffect(() => {
    const filteredProductWithName = UrunData.filter((prod) =>
      prod.urunAdi.toLocaleLowerCase().includes(inputText.toLocaleLowerCase())
    );
    const filteredProductWithCode = UrunData.filter((prod) =>
      prod.urunKodu.toLocaleLowerCase().includes(inputText.toLocaleLowerCase())
    );

    const filteredProduct = filteredProductWithCode.concat(
      filteredProductWithName
    );
    setUrunler(inputText.length && [...new Set(filteredProduct)]);
  }, [inputText]);

  const addProduct = (urun) => {
    const newUrun = {
      urunAdi: urun.urunAdi,
      urunKodu: urun.urunKodu,
      urunFiyat: urun.urunFiyat,
      qty: qty,
    };
    const ifExist = selectedProducts.filter(
      (prod) => prod.urunAdi === newUrun.urunAdi
    );

    if (ifExist.length) {
      setInputText("");
      return alert("Bu Ürün Daha Önce Eklenmiş.");
    } else {
      setSelectedProducts((prev) => [...prev, newUrun]);
      setQty(1);
    }
    setInputText("");
  };

  const deleteProduct = (urun) => {
    const deletedProduct = selectedProducts.find(
      (prod) => prod.urunAdi === urun.urunAdi
    );
    const filteredProducts = selectedProducts.filter(
      (prods) => prods !== deletedProduct
    );
    setSelectedProducts(filteredProducts);
  };

  const handleFirmChange = (e) => {
    setAlici((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const data = {
    products: selectedProducts,
    firm: alici,
    created: date,
    teslimDate: teslimDate,
  };

  return (
    <div className="container m-auto pb-96">
      <div className="Header flex justify-end">
        <Image width={200} height={200} src={"/logo.png"} alt="SamerGlobal" />
      </div>
      <h1 className="border-b border-black mx-auto w-max text-4xl">
        PROFORMA - INVOICE
      </h1>
      <div className="flex mt-4">
        <div className="w-1/2 bg-[#d9d9d9] border border-black p-8">
          Satıcı Firma:
          <p className="mt-4">
            SAMER GROUP SU ARITMA SİSTEMLERİ INŞ. TURİZM OTOMOTIV ITHALAT
            IHRACAT TIC. LTD. ŞTL.
          </p>
          <p className="mt-4">
            ALTINKALE MAH. PALMIYE CAD. NO: 7 J/1 - DÖŞEMEALTI/ ANTALYA
          </p>
          <p className="mt-4">Phone: +90 532 285 63 00</p>
          <p className="mt-4">E-mail: info@samergrouptr.com</p>
        </div>
        <div className="w-1/2 bg-[#d9d9d9] border border-black p-8">
          <div className="flex gap-3 mt-4">
            <p className="w-20">Firma Adı:</p>
            <textarea
              className="p-2"
              placeholder="Firma adını giriniz."
              name="aliciAdi"
              onChange={handleFirmChange}
            />
          </div>
          <div className="flex items-center gap-3 mt-4">
            <p className="w-20">BIN:</p>
            <input
              className="px-3 py-1"
              placeholder="BIN Kodu giriniz."
              name="aliciBin"
              onChange={handleFirmChange}
            />
          </div>
          <div className="flex gap-3 mt-4">
            <p className="w-20">Address:</p>
            <textarea
              className="p-2"
              placeholder="Adres giriniz."
              name="aliciAdres"
              onChange={handleFirmChange}
            />
          </div>
          <div className="flex gap-3 mt-4">
            <p className="w-20">Phone:</p>
            <textarea
              className="p-2"
              placeholder="Telefon Numarası giriniz."
              name="aliciPhone"
              onChange={handleFirmChange}
            />
          </div>
        </div>
      </div>
      <div className="mt-4 relative">
        <div className="flex gap-3 items-center justify-center w-full bg-slate-200 py-4">
          <p className="text-3xl">Ürün Ara: </p>
          <input
            type="text"
            placeholder="ürün ismi ya da kodunu giriniz"
            className="px-3 py-2 placeholder-slate-800 bg-[#d9d9d9] w-1/2"
            onChange={(e) => setInputText(e.target.value)}
            value={inputText}
          />
        </div>
        {urunler.length > 0 && (
          <div className="relative bg-black/40 w-full min-h-screen">
            <div className="absolute top-0 w-full">
              {urunler.map((urun) => (
                <div className="flex" key={urun.urunKodu}>
                  <div className="w-[40%] bg-white border border-black py-2 px-3 flex items-center">
                    {urun.urunAdi}
                  </div>
                  <div className="border border-black w-[15%] bg-[#d9d9d9] p-2 text-center">
                    <input
                      type="number"
                      className="p-2 w-full"
                      placeholder="ürün adeti"
                      onChange={(e) => setQty(e.target.value)}
                      value={qty}
                    />
                  </div>
                  <div className="w-[18%] bg-white border border-black p-2 text-center flex justify-center items-center">
                    <p className="mr-2">{urun.urunFiyat}</p> USD
                  </div>
                  <div className="border border-black w-[22%] bg-[#d9d9d9] p-2 text-center flex justify-center items-center">
                    <p className="mr-2">{urun.urunFiyat * qty}</p>USD
                  </div>
                  <div className="border border-black w-[5%] bg-[#d9d9d9] p-2 text-center flex justify-center items-center">
                    <button
                      onClick={() => addProduct(urun)}
                      className=" bg-green-600 px-2 py-1 text-white font-semibold"
                    >
                      Ekle
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="flex mt-10">
        <div className="w-1/2 border border-t-2 border-black bg-[#d9e2f3]">
          <div className="p-2 flex items-center gap-3">
            İNVOİCE NUMARASI:
            <input
              className="px-3 py-1 ring ring-black outline-none"
              placeholder="invoice numarası giriniz."
            />
          </div>
        </div>
        <div className="w-1/2 border border-t-2 border-black bg-[#d9e2f3]">
          <div className="p-2 flex items-center gap-3">
            TARİH:
            <input
              className="px-3 py-1 ring ring-black outline-none"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="border border-black w-[40%] bg-[#d9d9d9] p-2 text-center">
          ÜRÜN CİNSİ
        </div>
        <div className="border border-black w-[15%] bg-[#d9d9d9] p-2 text-center">
          ADET
        </div>
        <div className="border border-black w-[18%] bg-[#d9d9d9] p-2 text-center">
          BİRİM(USD)
        </div>
        <div className="border border-black w-[27%] bg-[#d9d9d9] p-2 text-center">
          TOPLAM(USD)
        </div>
      </div>
      <div className="addedProducts">
        {selectedProducts.length > 0 &&
          selectedProducts.map((urun) => (
            <div className="flex" key={urun.urunKodu}>
              <div className="w-[40%] bg-white border border-black py-2 px-3 flex items-center">
                {urun.urunAdi}
              </div>
              <div className="border border-black w-[15%] bg-[#d9d9d9] p-2 text-center">
                <p>{urun.qty}</p>
              </div>
              <div className="w-[18%] bg-white border border-black p-2 text-center flex justify-center items-center">
                <p className="mr-2">{urun.urunFiyat}</p> USD
              </div>
              <div className="border border-black w-[22%] bg-[#d9d9d9] p-2 text-center flex justify-center items-center">
                <p className="mr-2">{urun.urunFiyat * urun.qty}</p>USD
              </div>
              <div className="border border-black w-[5%] bg-[#d9d9d9] p-2 text-center flex justify-center items-center">
                <button
                  onClick={() => deleteProduct(urun)}
                  className=" bg-red-600 px-2 py-1 text-white font-semibold"
                >
                  Sil
                </button>
              </div>
            </div>
          ))}
      </div>
      <div className="mt-20 flex justify-end">
        <div className="flex text-3xl font-bold">
          <p className="mr-1">Toplam:</p>

          {selectedProducts
            .reduce((a, c) => a + c.urunFiyat * c.qty, 0)
            .toFixed(2)}

          <p className="ml-1">USD</p>
        </div>
      </div>
      <div className="mt-10 flex justify-end items-center text-2xl ">
        <h2 className="mr-2">TESLİM DETAY:</h2>
        <input
          className="px-2 py-1 ring ring-indigo-600 outline-none"
          type="text"
          placeholder="Ne kadar sürede teslim edilir."
          onChange={(e) => setTeslimDate(e.target.value)}
          value={teslimDate}
        />
      </div>

      <ProformaCreate invoiceData={data} />
    </div>
  );
};

export default Home;
