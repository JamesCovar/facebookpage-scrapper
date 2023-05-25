const express = require("express");
const {
  facebookPageController,
} = require("../controllers/facebook-page/facebook-page.controller");
const scrape = express.Router();

/**
 * @swagger
 * /scrape/facebook-page:
 *    post:
 *      summary: Scrape a Facebook page
 *      description: Retrieve data from a Facebook page based on its name and section.
 *      parameters:
 *        - in: body
 *          name: payload
 *          schema:
 *            type: object
 *            properties:
 *              pageSection:
 *                type: string
 *                enum: [about, contact, reviews]
 *                example: about
 *              pageName:
 *                type: string
 *                example: AcerosAlcalde
 *      responses:
 *        '200':
 *          description: OK
 *        '400':
 *          description: Bad request
 */
scrape.post("/facebook-page", facebookPageController);

module.exports = scrape;
