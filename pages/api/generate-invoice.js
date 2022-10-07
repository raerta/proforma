import fs from "fs";
import puppeteer from "puppeteer";
import handlers from "handlebars";

export default async (req, res) => {
  // extract the customer name from the req.body object
  // and also set a default name with the logical operator
  if (!req.body) {
    return res.status(500).json({ hata: "eksik ya da yanlış bilgi" });
  }
  const { invoiceData } = JSON.parse(req.body);

  const {
    products,
    firm,
    created,
    teslimDate,
    invoiceNo,
    total,
    conditions,
    height,
    payment,
    swift,
    iban
  } = invoiceData;

  const customerName = firm.aliciAdi || " ";
  const customerAdress = firm.aliciAdres || " ";
  const customerBin = firm.aliciBin || " ";
  const customerPhone = firm.aliciPhone || " ";
  const totalPrice = total.toFixed(2);

  try {
    // read our invoice-template.html file using node fs module
    const file = fs.readFileSync("./invoice-template.html", "utf8");

    // compile the file with handlebars and inject the customerName variable
    const template = handlers.compile(`${file}`);
    const html = template({
      customerName,
      customerAdress,
      customerBin,
      customerPhone,
      products,
      created,
      teslimDate,
      invoiceNo,
      totalPrice,
      conditions,
      payment,
      swift,
      iban
    });

    // simulate a chrome browser with puppeteer and navigate to a new page
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox"],
    });
    const page = await browser.newPage();

    // set our compiled html template as the pages content
    // then waitUntil the network is idle to make sure the content has been loaded
    await page.setContent(html, { waitUntil: "networkidle0" });

    // convert the page to pdf with the .pdf() method
    const pdf = await page.pdf({
      printBackground: true,
      displayHeaderFooter: true,

      height: height - 900 + "px",
      footerTemplate: `
    <div style="color: darkslategrey; border-top: solid lightgray 1px; font-size: 10px; padding-top: 5px; text-align: center; width: 100%;">
    <span class="pageNumber"></span>
    </div>
  `,
      headerTemplate: `<div></div>`,
      margin: {
        bottom: 70, // minimum required for footer msg to display
        left: 25,
        right: 35,
        top: 0,
      },
    });
    await browser.close();

    // send the result to the client
    res.statusCode = 200;
    res.send(pdf);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
