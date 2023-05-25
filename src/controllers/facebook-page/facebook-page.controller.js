const {
  facebookPageAbout,
  facebookPageContact,
} = require("./facebook-page.service");
const { getFacebookPageRoutes } = require("../../lib/getFacebookPageRoutes");

const facebookPageController = async (req, res) => {
  const { pageSection, pageName } = req.body;
  let response = {};

  if (!pageSection)
    return res.status(400).send({
      message: "pageSection is required",
      data: ["contact, about, reviews"],
    });
  if (!pageName)
    return res.status(400).send({ message: "pageName is required" });

  const pageUrl = await getFacebookPageRoutes(pageName, pageSection);

  if (pageSection === "about") response = await facebookPageAbout(pageUrl);
  if (pageSection === "contact") response = await facebookPageContact(pageUrl);
  res.send(response);
};

module.exports = { facebookPageController };
