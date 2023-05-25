const cheerio = require("cheerio");
const axios = require("axios");
const puppeteer = require("puppeteer");

const facebookPageAbout = async (pageUrl) => {
  try {
    const elements = await puppeterLaunch(
      pageUrl,
      "span.x193iq5w.xeuugli.x13faqbe.x1vvkbs"
    );
    console.log(elements);

    const datePattern =
      /^\d{1,2} de (enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre) de \d{4}$/;

    return {
      pageScraped: pageUrl,
      pageSectionScraped: "about_profile_transparency",
      fechaCreacion: elements.find((element) => {
        if (datePattern.test(element) === true) return element;
      }),
      anuncios: elements.find((element) => element.includes("anuncios")),
    };
  } catch (error) {
    console.log(error);
  }
};

const facebookPageContact = async (pageUrl) => {
  const elements = await puppeterLaunch(
    pageUrl,
    "span.x193iq5w.xeuugli.x13faqbe.x1vvkbs.x1xmvt09"
  );
  const phonePattern = /^\d{3} \d{3} \d{4}$/;
  return {
    pageScraped: pageUrl,
    pageSectionScraped: "about_contact_and_basic_info",
    direccion: elements.find((element) => element.includes("Mexico")),
    telefono: elements.find((element) => {
      if (phonePattern.test(element) === true) return element;
    }),
    correo: elements.find((element) => element.includes("@")),
    paginaWeb: elements.find(
      (element) => element.includes("https") || element.includes("http")
    ),
    calificaciones: elements.find((element) =>
      element.includes("Calificación")
    ),
  };
};

const puppeterLaunch = async (pageUrl, htmlElement) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(pageUrl);
  const htmlElements = await page.$$(htmlElement);
  console.log(pageUrl);
  const elements = [];
  for (let i = 0; i < htmlElements.length; i++) {
    const elementHandle = htmlElements[i];
    const textContent = await (
      await elementHandle.getProperty("textContent")
    ).jsonValue();
    elements.push(textContent);
  }

  browser.close();
  return elements;
};

module.exports = { facebookPageAbout, facebookPageContact };
