import Image from "next/image";
import React, { useEffect, useState } from "react";
import UrunData from "../public/urunler.json";
import ProformaCreate from "./ProformaCreate";

const Home = () => {
  const today = new Date();
  const day =
    today.getUTCDate() <= 9 ? `0${today.getUTCDate()}` : today.getUTCDate();
  const month =
    today.getUTCMonth() <= 8
      ? `0${today.getUTCMonth() + 1}`
      : today.getUTCMonth() + 1;
  const year = today.getUTCFullYear();

  const [date, setDate] = useState(`${day}/${month}/${year}`);
  const [urunler, setUrunler] = useState("");
  const [qty, setQty] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [inputText, setInputText] = useState("");
  const [teslimDate, setTeslimDate] = useState("20-25 Gün");
  const [invoice, setInvoice] = useState("");
  const [kdv, setKdv] = useState("");
  const [iskonto, setIskonto] = useState("");
  const [alici, setAlici] = useState({
    aliciAdi: "",
    aliciAdres: "",
    aliciBin: "",
    aliciPhone: "",
  });
  const [conditions, setConditions] = useState([
    "1- Alıcı ve satıcı arasında yapılan iş bu belge aynı zamanda bir cari hesap sözleşmesi niteliğinde olup, karşılıklı alaşmazlık vukuunda TTK 87 vd. hükümleri uygulanır.",
    "2- Vadesinde ödenmeyen faturalar için her ay fatura bedelinin % 3 oranında vade farkı hesabı yapılır, ayrı bir fatura olarak alıcıya sunulur.",
    "3- Alıcı tarafından 1 (Bir) gün içinde yazılı olarak değişklik talebinde bulunulmadığı taktirde, iş bu sipariş formunda yazılı şartlar taraflar arasında satış sözleşmesinde aynen geçerli sayılır.",
    "4- Taraflar arasında çıkabilecek her türlü itilaf halinde ANTALYA Mahkemeleri ve İcra Daireleri yetkili kılınmıştır.",
    "5- Fatura tarihindeki kur esas alınacaktır.",
  ]);

  const [payment, setPayment] = useState("Sözleşmeye göre");
  const [iban, setIban] = useState("TR140004601401001000026344 AKBANK");
  const [swift, setSwift] = useState("AKBKTRIS");

  const [condIsEdit, setCondIsEdit] = useState("");
  const [inputCond, setInputCond] = useState("");
  const [height, setHeight] = useState(10000);

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
      urunFiyat: urun.urunFiyat.toFixed(2),
      qty: qty,
      urunTotal: (urun.urunFiyat * qty).toFixed(2),
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

  function percentage(partialValue, totalValue) {
    return (totalValue * partialValue) / 100;
  }
  function discount(partialValue, totalValue) {
    return (totalValue * partialValue) / 100;
  }

  const editCond = (cnd) => {
    setCondIsEdit(cnd);
  };

  const changeCond = (e, cnd) => {
    console.log("onchange");
    setInputCond(e.target.value);
  };

  function handleChangeCondition(index) {
    const conditionsdd = conditions.map((c, i) => {
      if (i === index) {
        // Increment the clicked counter
        return inputCond;
      } else {
        // The rest haven't changed
        return c;
      }
    });
    setConditions(conditionsdd);
  }

  useEffect(() => {
    var html = window.document.documentElement;
    var body = window.document.body;
    var height = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    setHeight(height);
  }, [selectedProducts, conditions]);

  const data = {
    products: selectedProducts,
    firm: alici,
    created: date,
    teslimDate: teslimDate,
    invoiceNo: invoice,
    conditions: conditions,
    swift: swift,
    iban: iban,
    payment: payment,
    height: height,
    swift: swift,
    iban: iban,
    total:
      selectedProducts.reduce((a, c) => a + c.urunFiyat * c.qty, 0) +
      percentage(
        kdv,
        selectedProducts.reduce((a, c) => a + c.urunFiyat * c.qty, 0)
      ) -
      discount(
        iskonto,
        selectedProducts.reduce((a, c) => a + c.urunFiyat * c.qty, 0)
      ).toFixed(2),
  };
  return (
    <div className="container m-auto pb-96">
      <div className="Header flex justify-end">
        <Image
          width={200}
          height={200}
          src={"/proforma/logo.png"}
          alt="SamerGlobal"
        />
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
                    <p className="mr-2">{urun.urunFiyat.toFixed(2)}</p> USD
                  </div>
                  <div className="border border-black w-[22%] bg-[#d9d9d9] p-2 text-center flex justify-center items-center">
                    <p className="mr-2">{(urun.urunFiyat * qty).toFixed(2)}</p>
                    USD
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
              value={invoice}
              onChange={(e) => setInvoice(e.target.value)}
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
                <p className="mr-2">{(urun.urunFiyat * urun.qty).toFixed(2)}</p>
                USD
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
      <div className="mt-20 flex flex-col items-end">
        <div className="mt-2 flex text-3xl font-bold justify-end">
          <p className="mr-1">KDV:</p>
          <input
            className="ring-indigo-600 ring outline-none w-48 h-8 placeholder:text-lg placeholder:font-medium font-medium p-2"
            type="number"
            placeholder="KDV Oranı %"
            value={kdv}
            onChange={(e) => setKdv(Number(e.target.value))}
          />
        </div>
        <div className="mt-4 flex text-3xl font-bold justify-end">
          <p className="mr-1">İskonto:</p>
          <input
            className="ring-indigo-600 ring outline-none w-48 h-8 placeholder:text-lg placeholder:font-medium font-medium p-2"
            type="number"
            placeholder="İskonto Oranı %"
            value={iskonto}
            onChange={(e) => setIskonto(Number(e.target.value))}
          />
        </div>
        <div className="border p-4 mt-8">
          <div className="flex text-3xl font-medium ">
            <p className="mr-1">KDV:</p>
            {percentage(
              kdv,
              selectedProducts.reduce((a, c) => a + c.urunFiyat * c.qty, 0)
            ).toFixed(2)}
            <p className="ml-1 w-28">USD</p>
          </div>
          <div className="flex text-3xl font-medium mt-8">
            <p className="mr-1">İskonto:</p>
            {discount(
              iskonto,
              selectedProducts.reduce((a, c) => a + c.urunFiyat * c.qty, 0)
            ).toFixed(2)}
            <p className="ml-1 w-28">USD</p>
          </div>
          <div className="flex text-3xl font-medium mt-8">
            <p className="mr-1">Toplam:</p>
            {data.total.toFixed(2)}
            <p className="ml-1 w-28">USD</p>
          </div>
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

      <div className="mt-10"></div>
      <div className="mt-10">
        <div className="p-2 flex items-center uppercase">
          <p className="border-b border border-black p-2">ÖZEL ŞARTLAR</p>
        </div>
        <ol className="flex flex-col gap-3">
          {conditions.map((cnd, index) => (
            <li key={cnd}>
              <div className="flex gap-4 w-full">
                <button
                  type="button"
                  className={`text-white p-2 rounded-md bg-yellow-600`}
                  onClick={() => editCond(cnd, index)}
                >
                  Düzenle
                </button>

                <button
                  type="button"
                  className={` text-white p-2 rounded-md ${
                    cnd === condIsEdit ? "bg-blue-600" : "hidden"
                  }`}
                  onClick={(e) => handleChangeCondition(index)}
                >
                  Kaydet
                </button>

                <textarea
                  className={`p-2 w-full border-2 placeholder-teal-800 ${
                    cnd === condIsEdit ? "border-blue-600" : "border-yellow-600"
                  }`}
                  placeholder={cnd}
                  onChange={(e) => changeCond(e, cnd)}
                  disabled={cnd !== condIsEdit}
                />
              </div>
            </li>
          ))}
        </ol>

        <div className="flex w-full items-center mt-10">
          <label>ÖDEME ŞEKLİ: </label>
          <input
            type={"text"}
            className="w-full p-4 border border-black"
            placeholder={"Sözleşmeye göre"}
            value={payment}
            onChange={(e) => setPayment(e.target.value)}
          />
        </div>
      </div>
      <div className="mt-10">
        <div className="mt-10">
          <div className="w-full flex flex-col justify-center text-center p-8 bg-secondary border border-black">
            <p>Samer Group Su Arıtma Sistemleri İnş. Ltd. Şti </p>
            <p>Altinkale man. Palmiye cad No 7/1 Dosemealti Antalya Turkey</p>
            <div className="flex gap-3">
              IBAN:
              <input
                type={"text"}
                value={iban}
                className="w-full"
                onChange={(e) => setIban(e.target.value)}
              ></input>
            </div>
            <div className="flex gap-3">
              SWIFT:
              <input
                type={"text"}
                value={swift}
                className="w-full"
                onChange={(e) => setSwift(e.target.value)}
              ></input>
            </div>
          </div>
          <div className="w-full flex items-center justify-around p-8 bg-secondary border border-black">
            <a href="tel:+902424432000">+90 242 443 20 00</a>
            <a href="mailto:info@samergrouptr.com">info@samergrouptr.com</a>
            <a href="https://samergrouptr.com">samergrouptr.com</a>
          </div>
        </div>
      </div>

      <ProformaCreate invoiceData={data} />
    </div>
  );
};

export default Home;
