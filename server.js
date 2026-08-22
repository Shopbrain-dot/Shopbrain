const express = require("express");
const cors = require("cors");
const cheerio = require("cheerio");

const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));


/*
========================================
HEALTH CHECK
========================================
*/

app.get("/", (req, res) => {
  res.json({
    status: "online",
    service: "ShopBrain Website Crawler"
  });
});


/*
========================================
CRAWL WEBSITE
========================================
*/

app.post("/crawl", async (req, res) => {

  try {

    let { url } = req.body;

    if (!url) {

      return res.status(400).json({
        error: "Website URL is required."
      });

    }


    /*
    Add HTTPS automatically
    */

    if (!/^https?:\/\//i.test(url)) {

      url = "https://" + url;

    }


    let websiteURL;

    try {

      websiteURL = new URL(url);

    } catch {

      return res.status(400).json({
        error: "Invalid website URL."
      });

    }


    /*
    Fetch website
    */

    const response = await fetch(
      websiteURL.href,
      {
        headers: {
          "User-Agent":
            "ShopBrainBot/1.0 (+customer-service-crawler)"
        },
        redirect: "follow"
      }
    );


    if (!response.ok) {

      return res.status(400).json({
        error:
          "ShopBrain could not access this website. HTTP status: " +
          response.status
      });

    }


    const html =
      await response.text();


    /*
    Parse HTML
    */

    const $ =
      cheerio.load(html);


    /*
    Remove unnecessary elements
    */

    $(
      "script, style, noscript, svg, iframe, nav, footer"
    ).remove();


    /*
    Extract page title
    */

    const title =
      $("title").first().text().trim();


    /*
    Extract meta description
    */

    const description =
      $('meta[name="description"]')
        .attr("content") ||
      "";


    /*
    Extract visible text
    */

    const text =
      $("body")
        .text()
        .replace(/\s+/g, " ")
        .trim();


    /*
    Extract headings
    */

    const headings = [];

    $("h1, h2, h3").each(
      (index, element) => {

        const heading =
          $(element)
            .text()
            .replace(/\s+/g, " ")
            .trim();

        if (heading) {

          headings.push(
            heading
          );

        }

      }
    );


    /*
    Extract links
    */

    const links = [];

    $("a[href]").each(
      (index, element) => {

        const href =
          $(element).attr("href");

        const linkText =
          $(element)
            .text()
            .replace(/\s+/g, " ")
            .trim();


        if (
          href &&
          linkText
        ) {

          try {

            const absoluteURL =
              new URL(
                href,
                websiteURL.href
              ).href;


            /*
            Only keep links belonging
            to the same website.
            */

            if (
              new URL(
                absoluteURL
              ).hostname ===
              websiteURL.hostname
            ) {

              links.push({
                text: linkText,
                url: absoluteURL
              });

            }

          } catch {

            // Ignore invalid links

          }

        }

      }
    );


    /*
    Limit text size.
    */

    const cleanText =
      text.substring(
        0,
        50000
      );


    /*
    Return extracted knowledge
    */

    res.json({

      success: true,

      website: websiteURL.href,

      title: title,

      description: description,

      headings: headings.slice(
        0,
        100
      ),

      links: links.slice(
        0,
        200
      ),

      content: cleanText

    });


  } catch (error) {

    console.error(
      "Crawler error:",
      error
    );


    res.status(500).json({

      error:
        "ShopBrain could not crawl this website."

    });

  }

});


/*
========================================
START SERVER
========================================
*/

const PORT =
  process.env.PORT || 3000;


app.listen(
  PORT,
  () => {

    console.log(
      `ShopBrain crawler running on port ${PORT}`
    );

  }
);