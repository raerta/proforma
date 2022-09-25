import React from "react";

const ProformaCreate = ({ invoiceData }) => {
  const generateInvoice = (e) => {
    e.preventDefault();
    // send a post request with the name to our API endpoint
    const fetchData = async () => {
      const data = await fetch("http://localhost:3000/api/generate-invoice", {
        method: "POST",
        body: JSON.stringify({ invoiceData }),
      });
      // convert the response into an array Buffer
      return data.arrayBuffer();
    };

    // convert the buffer into an object URL
    const saveAsPDF = async () => {
      const buffer = await fetchData();
      const blob = new Blob([buffer]);
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "invoice.pdf";
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
        Proforma Oluştur
      </button>
    </div>
  );
};

export default ProformaCreate;
