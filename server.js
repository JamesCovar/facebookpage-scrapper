var express = require("express");
var app = express();
const bodyParser = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

var scrape = require("./src/routes/scrape.route");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const options = {
  definition: {
    swagger: "2.0",
    info: {
      title: "Facebook Page Scraper API",
      version: "1.0.0",
      description: "This is a simple Facebook public page web scrapper",
      contact: {
        name: "Jaime Corona",
        email: "jcorona@grupocapem.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};
const specs = swaggerJsdoc(options);

//Routes
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/scrape/", scrape);

var server = app.listen(3001, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log(`This app is listening at http://%s:%s`, host, port);
});
