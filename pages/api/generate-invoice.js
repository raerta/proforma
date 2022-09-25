import fs from "fs";
import puppeteer from "puppeteer";
import handlers from "handlebars";

export default async (req, res) => {
  // extract the customer name from the req.body object
  // and also set a default name with the logical operator
  console.log(req.body);
  const { invoiceData } = JSON.parse(req.body);

  const { products, firm, created, teslimDate } = invoiceData;

  console.log("firm", firm);
  const customerName = firm.aliciAdi || "John Doe";
  const customerAdress = firm.aliciAdres || "John Doe";
  const customerBin = firm.aliciBin || "John Doe";
  const customerPhone = firm.aliciPhone || "John Doe";

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
      products
    });

    console.log("products",products)

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
    const pdf = await page.pdf({ format: "A4" });
    await browser.close();

    // send the result to the client
    res.statusCode = 200;
    res.send(pdf);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
