const fs = require("fs");
const http = require("http");
const url = require("url");
const { replaceTemplate } = require("./modules/replaceTemplate");
const { default: slugify } = require("slugify");

//Blocking, sync way
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);

// const textOut = `This is what we know about acocado: ${textIn}, written in ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);

//Non-Blocking, async way
//Call-back hell
// fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
//   console.log(data);
//   fs.readFile(`./txt/${data}.txt`, "utf-8", (err, data) => {
//     console.log(data);
//     fs.readFile(`./txt/append.txt`, "utf-8", (err, data) => {
//       console.log(data);
//     });
//   });
// });
// console.log("reading file...");

const overviewTemplate = fs.readFileSync("./templates/overview.html", "utf-8");
const cardTemplate = fs.readFileSync("./templates/card.html", "utf-8");
const productTemplate = fs.readFileSync("./templates/product.html", "utf-8");
const data = fs.readFileSync("./dev-data/data.json", "utf-8");
const dataObj = JSON.parse(data);
//SERVER
const server = http.createServer((req, res) => {
  console.log(req.url);
  const myUrl = new URL(req.url, "http://localhost:3000");
  const productID = myUrl.searchParams.get("id");
  if (myUrl.pathname === "/overview" || myUrl.pathname === "/") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    const cardsHTML = dataObj.map((d) => replaceTemplate(cardTemplate, d));
    const template = overviewTemplate.replace("{%PRODUCTCARD%}", cardsHTML);
    res.end(template);
  } else if (myUrl.pathname === "/product" && productID) {
    res.writeHead(200, {
      "Content-type": "text/html",
    });

    const product = dataObj[productID];
    const output = replaceTemplate(productTemplate, product);
    res.end(output);
  } else if (myUrl.pathname === "/api") {
    res.end("This is the api");

    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end("Not Found");
  }
});
server.listen(3000, "127.0.0.1", (err) => {
  console.log("listening request on port 3000");
});
