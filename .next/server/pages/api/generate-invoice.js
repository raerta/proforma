"use strict";
(() => {
var exports = {};
exports.id = 149;
exports.ids = [149];
exports.modules = {

/***/ 97:
/***/ ((module) => {

module.exports = require("handlebars");

/***/ }),

/***/ 462:
/***/ ((module) => {

module.exports = import("puppeteer");;

/***/ }),

/***/ 147:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 136:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(147);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var puppeteer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(462);
/* harmony import */ var handlebars__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(97);
/* harmony import */ var handlebars__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(handlebars__WEBPACK_IMPORTED_MODULE_2__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([puppeteer__WEBPACK_IMPORTED_MODULE_1__]);
puppeteer__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async (req, res)=>{
    // extract the customer name from the req.body object
    // and also set a default name with the logical operator
    if (!req.body) {
        return res.status(500).json({
            hata: "eksik ya da yanlış bilgi"
        });
    }
    const { invoiceData  } = JSON.parse(req.body);
    const { products , firm , created , teslimDate , invoiceNo , total , conditions , height , payment , swift , iban  } = invoiceData;
    const customerName = firm.aliciAdi || " ";
    const customerAdress = firm.aliciAdres || " ";
    const customerBin = firm.aliciBin || " ";
    const customerPhone = firm.aliciPhone || " ";
    const totalPrice = total.toFixed(2);
    try {
        // read our invoice-template.html file using node fs module
        const file = fs__WEBPACK_IMPORTED_MODULE_0___default().readFileSync("./invoice-template.html", "utf8");
        // compile the file with handlebars and inject the customerName variable
        const template = handlebars__WEBPACK_IMPORTED_MODULE_2___default().compile(`${file}`);
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
        const browser = await puppeteer__WEBPACK_IMPORTED_MODULE_1__["default"].launch({
            headless: true,
            args: [
                "--no-sandbox"
            ]
        });
        const page = await browser.newPage();
        // set our compiled html template as the pages content
        // then waitUntil the network is idle to make sure the content has been loaded
        await page.setContent(html, {
            waitUntil: "networkidle0"
        });
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
                bottom: 70,
                left: 25,
                right: 35,
                top: 0
            }
        });
        await browser.close();
        // send the result to the client
        res.statusCode = 200;
        res.send(pdf);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        });
    }
});

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(136));
module.exports = __webpack_exports__;

})();