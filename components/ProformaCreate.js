import React, { useState } from "react";

const ProformaCreate = ({ invoiceData }) => {
  const [loading, setLoading] = useState(false);
  const generateInvoice = (e) => {
    e.preventDefault();
    // send a post request with the name to our API endpoint
    const fetchData = async () => {
      setLoading(true);
      const data = await fetch(
        "https://samergrouptr.com/proforma/api/generate-invoice",
        {
          method: "POST",
          body: JSON.stringify({ invoiceData }),
        }
      );
      // convert the response into an array Buffer

      return data.arrayBuffer();
    };

    console.log(invoiceData)
    // convert the buffer into an object URL
    const saveAsPDF = async () => {
      const buffer = await fetchData();
      setLoading(false);
      const blob = new Blob([buffer]);
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = invoiceData.firm.aliciAdi.slice(0,5) + "-"+"invoice.pdf";
      link.click();
    };

    saveAsPDF();
  };

  return (
    <div className="mt-8 flex justify-center">
      <button
        onClick={generateInvoice}
        className="text-3xl font-bold py-2 px-4 bg-slate-900 text-white rounded hover:bg-green-600"
      >
        {loading
          ? "Proforma oluşturuluyor. Otomatik olarak indirilecek"
          : "Proforma Oluştur"}
      </button>
    </div>
  );
};

export default ProformaCreate;
