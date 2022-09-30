"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/generate-invoice";
exports.ids = ["pages/api/generate-invoice"];
exports.modules = {

/***/ "handlebars":
/*!*****************************!*\
  !*** external "handlebars" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("handlebars");

/***/ }),

/***/ "puppeteer":
/*!****************************!*\
  !*** external "puppeteer" ***!
  \****************************/
/***/ ((module) => {

module.exports = import("puppeteer");;

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "(api)/./pages/api/generate-invoice.js":
/*!***************************************!*\
  !*** ./pages/api/generate-invoice.js ***!
  \***************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var puppeteer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! puppeteer */ \"puppeteer\");\n/* harmony import */ var handlebars__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! handlebars */ \"handlebars\");\n/* harmony import */ var handlebars__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(handlebars__WEBPACK_IMPORTED_MODULE_2__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([puppeteer__WEBPACK_IMPORTED_MODULE_1__]);\npuppeteer__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async (req, res)=>{\n    // extract the customer name from the req.body object\n    // and also set a default name with the logical operator\n    console.log(req.body);\n    const { invoiceData  } = JSON.parse(req.body);\n    const { products , firm , created , teslimDate , invoiceNo , total  } = invoiceData;\n    console.log(\"firm\", firm);\n    const customerName = firm.aliciAdi || \" \";\n    const customerAdress = firm.aliciAdres || \" \";\n    const customerBin = firm.aliciBin || \" \";\n    const customerPhone = firm.aliciPhone || \" \";\n    const totalPrice = total.toFixed(2);\n    try {\n        // read our invoice-template.html file using node fs module\n        const file = fs__WEBPACK_IMPORTED_MODULE_0___default().readFileSync(\"./invoice-template.html\", \"utf8\");\n        // compile the file with handlebars and inject the customerName variable\n        const template = handlebars__WEBPACK_IMPORTED_MODULE_2___default().compile(`${file}`);\n        const html = template({\n            customerName,\n            customerAdress,\n            customerBin,\n            customerPhone,\n            products,\n            created,\n            teslimDate,\n            invoiceNo,\n            totalPrice\n        });\n        // simulate a chrome browser with puppeteer and navigate to a new page\n        const browser = await puppeteer__WEBPACK_IMPORTED_MODULE_1__[\"default\"].launch({\n            headless: true,\n            args: [\n                \"--no-sandbox\"\n            ]\n        });\n        const page = await browser.newPage();\n        // set our compiled html template as the pages content\n        // then waitUntil the network is idle to make sure the content has been loaded\n        await page.setContent(html, {\n            waitUntil: \"networkidle0\"\n        });\n        // convert the page to pdf with the .pdf() method\n        const pdf = await page.pdf({\n            format: \"A4\",\n            printBackground: true,\n            displayHeaderFooter: true,\n            footerTemplate: `\n    <div style=\"color: darkslategrey; border-top: solid lightgray 1px; font-size: 10px; padding-top: 5px; text-align: center; width: 100%;\">\n    <span class=\"pageNumber\"></span>\n    </div>\n  `,\n            headerTemplate: `<div></div>`,\n            margin: {\n                bottom: 70,\n                left: 25,\n                right: 35,\n                top: 31\n            }\n        });\n        await browser.close();\n        // send the result to the client\n        res.statusCode = 200;\n        res.send(pdf);\n    } catch (err) {\n        console.log(err);\n        res.status(500).json({\n            message: err.message\n        });\n    }\n});\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvZ2VuZXJhdGUtaW52b2ljZS5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBb0I7QUFDYztBQUNBO0FBRWxDLGlFQUFlLE9BQU9HLEdBQUcsRUFBRUMsR0FBRyxHQUFLO0lBQ2pDLHFEQUFxRDtJQUNyRCx3REFBd0Q7SUFDeERDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDSCxHQUFHLENBQUNJLElBQUksQ0FBQyxDQUFDO0lBQ3RCLE1BQU0sRUFBRUMsV0FBVyxHQUFFLEdBQUdDLElBQUksQ0FBQ0MsS0FBSyxDQUFDUCxHQUFHLENBQUNJLElBQUksQ0FBQztJQUU1QyxNQUFNLEVBQUVJLFFBQVEsR0FBRUMsSUFBSSxHQUFFQyxPQUFPLEdBQUVDLFVBQVUsR0FBRUMsU0FBUyxHQUFFQyxLQUFLLEdBQUUsR0FBR1IsV0FBVztJQUU3RUgsT0FBTyxDQUFDQyxHQUFHLENBQUMsTUFBTSxFQUFFTSxJQUFJLENBQUMsQ0FBQztJQUMxQixNQUFNSyxZQUFZLEdBQUdMLElBQUksQ0FBQ00sUUFBUSxJQUFJLEdBQUc7SUFDekMsTUFBTUMsY0FBYyxHQUFHUCxJQUFJLENBQUNRLFVBQVUsSUFBSSxHQUFHO0lBQzdDLE1BQU1DLFdBQVcsR0FBR1QsSUFBSSxDQUFDVSxRQUFRLElBQUksR0FBRztJQUN4QyxNQUFNQyxhQUFhLEdBQUdYLElBQUksQ0FBQ1ksVUFBVSxJQUFJLEdBQUc7SUFDNUMsTUFBTUMsVUFBVSxHQUFHVCxLQUFLLENBQUNVLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFFbkMsSUFBSTtRQUNGLDJEQUEyRDtRQUMzRCxNQUFNQyxJQUFJLEdBQUczQixzREFBZSxDQUFDLHlCQUF5QixFQUFFLE1BQU0sQ0FBQztRQUUvRCx3RUFBd0U7UUFDeEUsTUFBTTZCLFFBQVEsR0FBRzNCLHlEQUFnQixDQUFDLENBQUMsRUFBRXlCLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDNUMsTUFBTUksSUFBSSxHQUFHRixRQUFRLENBQUM7WUFDcEJaLFlBQVk7WUFDWkUsY0FBYztZQUNkRSxXQUFXO1lBQ1hFLGFBQWE7WUFDYlosUUFBUTtZQUNSRSxPQUFPO1lBQ1BDLFVBQVU7WUFDVkMsU0FBUztZQUNUVSxVQUFVO1NBQ1gsQ0FBQztRQUdGLHNFQUFzRTtRQUN0RSxNQUFNTyxPQUFPLEdBQUcsTUFBTS9CLHdEQUFnQixDQUFDO1lBQ3JDaUMsUUFBUSxFQUFFLElBQUk7WUFDZEMsSUFBSSxFQUFFO2dCQUFDLGNBQWM7YUFBQztTQUN2QixDQUFDO1FBQ0YsTUFBTUMsSUFBSSxHQUFHLE1BQU1KLE9BQU8sQ0FBQ0ssT0FBTyxFQUFFO1FBRXBDLHNEQUFzRDtRQUN0RCw4RUFBOEU7UUFDOUUsTUFBTUQsSUFBSSxDQUFDRSxVQUFVLENBQUNQLElBQUksRUFBRTtZQUFFUSxTQUFTLEVBQUUsY0FBYztTQUFFLENBQUMsQ0FBQztRQUUzRCxpREFBaUQ7UUFDakQsTUFBTUMsR0FBRyxHQUFHLE1BQU1KLElBQUksQ0FBQ0ksR0FBRyxDQUFDO1lBQ3pCQyxNQUFNLEVBQUUsSUFBSTtZQUNaQyxlQUFlLEVBQUUsSUFBSTtZQUNyQkMsbUJBQW1CLEVBQUUsSUFBSTtZQUN6QkMsY0FBYyxFQUFFLENBQUM7Ozs7RUFJckIsQ0FBQztZQUNHQyxjQUFjLEVBQUUsQ0FBQyxXQUFXLENBQUM7WUFDN0JDLE1BQU0sRUFBRTtnQkFDTkMsTUFBTSxFQUFFLEVBQUU7Z0JBQ1ZDLElBQUksRUFBRSxFQUFFO2dCQUNSQyxLQUFLLEVBQUUsRUFBRTtnQkFDVEMsR0FBRyxFQUFFLEVBQUU7YUFDUjtTQUNGLENBQUM7UUFDRixNQUFNbEIsT0FBTyxDQUFDbUIsS0FBSyxFQUFFLENBQUM7UUFFdEIsZ0NBQWdDO1FBQ2hDL0MsR0FBRyxDQUFDZ0QsVUFBVSxHQUFHLEdBQUcsQ0FBQztRQUNyQmhELEdBQUcsQ0FBQ2lELElBQUksQ0FBQ2IsR0FBRyxDQUFDLENBQUM7SUFDaEIsRUFBRSxPQUFPYyxHQUFHLEVBQUU7UUFDWmpELE9BQU8sQ0FBQ0MsR0FBRyxDQUFDZ0QsR0FBRyxDQUFDLENBQUM7UUFDakJsRCxHQUFHLENBQUNtRCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztZQUFFQyxPQUFPLEVBQUVILEdBQUcsQ0FBQ0csT0FBTztTQUFFLENBQUMsQ0FBQztJQUNqRCxDQUFDO0FBQ0gsQ0FBQyxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHJvZm9ybWEvLi9wYWdlcy9hcGkvZ2VuZXJhdGUtaW52b2ljZS5qcz82MTNhIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmcyBmcm9tIFwiZnNcIjtcbmltcG9ydCBwdXBwZXRlZXIgZnJvbSBcInB1cHBldGVlclwiO1xuaW1wb3J0IGhhbmRsZXJzIGZyb20gXCJoYW5kbGViYXJzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChyZXEsIHJlcykgPT4ge1xuICAvLyBleHRyYWN0IHRoZSBjdXN0b21lciBuYW1lIGZyb20gdGhlIHJlcS5ib2R5IG9iamVjdFxuICAvLyBhbmQgYWxzbyBzZXQgYSBkZWZhdWx0IG5hbWUgd2l0aCB0aGUgbG9naWNhbCBvcGVyYXRvclxuICBjb25zb2xlLmxvZyhyZXEuYm9keSk7XG4gIGNvbnN0IHsgaW52b2ljZURhdGEgfSA9IEpTT04ucGFyc2UocmVxLmJvZHkpO1xuXG4gIGNvbnN0IHsgcHJvZHVjdHMsIGZpcm0sIGNyZWF0ZWQsIHRlc2xpbURhdGUsIGludm9pY2VObywgdG90YWwgfSA9IGludm9pY2VEYXRhO1xuXG4gIGNvbnNvbGUubG9nKFwiZmlybVwiLCBmaXJtKTtcbiAgY29uc3QgY3VzdG9tZXJOYW1lID0gZmlybS5hbGljaUFkaSB8fCBcIiBcIjtcbiAgY29uc3QgY3VzdG9tZXJBZHJlc3MgPSBmaXJtLmFsaWNpQWRyZXMgfHwgXCIgXCI7XG4gIGNvbnN0IGN1c3RvbWVyQmluID0gZmlybS5hbGljaUJpbiB8fCBcIiBcIjtcbiAgY29uc3QgY3VzdG9tZXJQaG9uZSA9IGZpcm0uYWxpY2lQaG9uZSB8fCBcIiBcIjtcbiAgY29uc3QgdG90YWxQcmljZSA9IHRvdGFsLnRvRml4ZWQoMilcblxuICB0cnkge1xuICAgIC8vIHJlYWQgb3VyIGludm9pY2UtdGVtcGxhdGUuaHRtbCBmaWxlIHVzaW5nIG5vZGUgZnMgbW9kdWxlXG4gICAgY29uc3QgZmlsZSA9IGZzLnJlYWRGaWxlU3luYyhcIi4vaW52b2ljZS10ZW1wbGF0ZS5odG1sXCIsIFwidXRmOFwiKTtcblxuICAgIC8vIGNvbXBpbGUgdGhlIGZpbGUgd2l0aCBoYW5kbGViYXJzIGFuZCBpbmplY3QgdGhlIGN1c3RvbWVyTmFtZSB2YXJpYWJsZVxuICAgIGNvbnN0IHRlbXBsYXRlID0gaGFuZGxlcnMuY29tcGlsZShgJHtmaWxlfWApO1xuICAgIGNvbnN0IGh0bWwgPSB0ZW1wbGF0ZSh7XG4gICAgICBjdXN0b21lck5hbWUsXG4gICAgICBjdXN0b21lckFkcmVzcyxcbiAgICAgIGN1c3RvbWVyQmluLFxuICAgICAgY3VzdG9tZXJQaG9uZSxcbiAgICAgIHByb2R1Y3RzLFxuICAgICAgY3JlYXRlZCxcbiAgICAgIHRlc2xpbURhdGUsXG4gICAgICBpbnZvaWNlTm8sXG4gICAgICB0b3RhbFByaWNlXG4gICAgfSk7XG5cblxuICAgIC8vIHNpbXVsYXRlIGEgY2hyb21lIGJyb3dzZXIgd2l0aCBwdXBwZXRlZXIgYW5kIG5hdmlnYXRlIHRvIGEgbmV3IHBhZ2VcbiAgICBjb25zdCBicm93c2VyID0gYXdhaXQgcHVwcGV0ZWVyLmxhdW5jaCh7XG4gICAgICBoZWFkbGVzczogdHJ1ZSxcbiAgICAgIGFyZ3M6IFtcIi0tbm8tc2FuZGJveFwiXSxcbiAgICB9KTtcbiAgICBjb25zdCBwYWdlID0gYXdhaXQgYnJvd3Nlci5uZXdQYWdlKCk7XG5cbiAgICAvLyBzZXQgb3VyIGNvbXBpbGVkIGh0bWwgdGVtcGxhdGUgYXMgdGhlIHBhZ2VzIGNvbnRlbnRcbiAgICAvLyB0aGVuIHdhaXRVbnRpbCB0aGUgbmV0d29yayBpcyBpZGxlIHRvIG1ha2Ugc3VyZSB0aGUgY29udGVudCBoYXMgYmVlbiBsb2FkZWRcbiAgICBhd2FpdCBwYWdlLnNldENvbnRlbnQoaHRtbCwgeyB3YWl0VW50aWw6IFwibmV0d29ya2lkbGUwXCIgfSk7XG5cbiAgICAvLyBjb252ZXJ0IHRoZSBwYWdlIHRvIHBkZiB3aXRoIHRoZSAucGRmKCkgbWV0aG9kXG4gICAgY29uc3QgcGRmID0gYXdhaXQgcGFnZS5wZGYoe1xuICAgICAgZm9ybWF0OiBcIkE0XCIsXG4gICAgICBwcmludEJhY2tncm91bmQ6IHRydWUsXG4gICAgICBkaXNwbGF5SGVhZGVyRm9vdGVyOiB0cnVlLFxuICAgICAgZm9vdGVyVGVtcGxhdGU6IGBcbiAgICA8ZGl2IHN0eWxlPVwiY29sb3I6IGRhcmtzbGF0ZWdyZXk7IGJvcmRlci10b3A6IHNvbGlkIGxpZ2h0Z3JheSAxcHg7IGZvbnQtc2l6ZTogMTBweDsgcGFkZGluZy10b3A6IDVweDsgdGV4dC1hbGlnbjogY2VudGVyOyB3aWR0aDogMTAwJTtcIj5cbiAgICA8c3BhbiBjbGFzcz1cInBhZ2VOdW1iZXJcIj48L3NwYW4+XG4gICAgPC9kaXY+XG4gIGAsXG4gICAgICBoZWFkZXJUZW1wbGF0ZTogYDxkaXY+PC9kaXY+YCxcbiAgICAgIG1hcmdpbjoge1xuICAgICAgICBib3R0b206IDcwLCAvLyBtaW5pbXVtIHJlcXVpcmVkIGZvciBmb290ZXIgbXNnIHRvIGRpc3BsYXlcbiAgICAgICAgbGVmdDogMjUsXG4gICAgICAgIHJpZ2h0OiAzNSxcbiAgICAgICAgdG9wOiAzMSxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgYXdhaXQgYnJvd3Nlci5jbG9zZSgpO1xuXG4gICAgLy8gc2VuZCB0aGUgcmVzdWx0IHRvIHRoZSBjbGllbnRcbiAgICByZXMuc3RhdHVzQ29kZSA9IDIwMDtcbiAgICByZXMuc2VuZChwZGYpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgbWVzc2FnZTogZXJyLm1lc3NhZ2UgfSk7XG4gIH1cbn07XG4iXSwibmFtZXMiOlsiZnMiLCJwdXBwZXRlZXIiLCJoYW5kbGVycyIsInJlcSIsInJlcyIsImNvbnNvbGUiLCJsb2ciLCJib2R5IiwiaW52b2ljZURhdGEiLCJKU09OIiwicGFyc2UiLCJwcm9kdWN0cyIsImZpcm0iLCJjcmVhdGVkIiwidGVzbGltRGF0ZSIsImludm9pY2VObyIsInRvdGFsIiwiY3VzdG9tZXJOYW1lIiwiYWxpY2lBZGkiLCJjdXN0b21lckFkcmVzcyIsImFsaWNpQWRyZXMiLCJjdXN0b21lckJpbiIsImFsaWNpQmluIiwiY3VzdG9tZXJQaG9uZSIsImFsaWNpUGhvbmUiLCJ0b3RhbFByaWNlIiwidG9GaXhlZCIsImZpbGUiLCJyZWFkRmlsZVN5bmMiLCJ0ZW1wbGF0ZSIsImNvbXBpbGUiLCJodG1sIiwiYnJvd3NlciIsImxhdW5jaCIsImhlYWRsZXNzIiwiYXJncyIsInBhZ2UiLCJuZXdQYWdlIiwic2V0Q29udGVudCIsIndhaXRVbnRpbCIsInBkZiIsImZvcm1hdCIsInByaW50QmFja2dyb3VuZCIsImRpc3BsYXlIZWFkZXJGb290ZXIiLCJmb290ZXJUZW1wbGF0ZSIsImhlYWRlclRlbXBsYXRlIiwibWFyZ2luIiwiYm90dG9tIiwibGVmdCIsInJpZ2h0IiwidG9wIiwiY2xvc2UiLCJzdGF0dXNDb2RlIiwic2VuZCIsImVyciIsInN0YXR1cyIsImpzb24iLCJtZXNzYWdlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./pages/api/generate-invoice.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/generate-invoice.js"));
module.exports = __webpack_exports__;

})();