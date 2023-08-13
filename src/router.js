const router = require("express")();
const cheerio = require("cheerio");
const { AxiosService } = require("./helper/axios_service");
const { responseApi } = require("./helper/response_api");
const baseUrl = "https://komikcast.vip";

router.get("/", (req, res) => {
  return res.status(200).json({
    status: "success",
    message:
      "Welcome, see https://github.com/Al-Ghozy03/komikcast-api for documentation",
  });
});
router.get("/terbaru", async (req, res) => {
  const { page } = req.query;
  if (page === undefined) return responseApi(res, 500, "page is required");
  const response = await AxiosService(`${baseUrl}/project-list/page/${page}`);
  if (response.status === 200) {
    const komikList = [];
    const $ = cheerio.load(response.data);
    const element = $("#content  >.wrapper > .postbody > .bixbox");

    const current_page = element
      .find(".pagination > .page-numbers.current")
      .text()
      .trim();

    let length_page;
    if (
      element.find(".pagination > .page-numbers:nth-child(6)").attr("class") ===
      "next page-numbers"
    ) {
      length_page = element
        .find(".pagination > .page-numbers:nth-child(5)")
        .text()
        .trim();
    } else if (
      element.find(".pagination > .page-numbers:nth-child(8)").attr("class") ===
      "next page-numbers"
    ) {
      length_page = element
        .find(".pagination > .page-numbers:nth-child(7)")
        .text()
        .trim();
    } else if (
      element.find(".pagination > .page-numbers:nth-child(9)").attr("class") ===
      "next page-numbers"
    ) {
      length_page = element
        .find(".pagination > .page-numbers:nth-child(8)")
        .text()
        .trim();
    } else if (
      element
        .find(".pagination > .page-numbers:nth-child(10)")
        .attr("class") === "next page-numbers"
    ) {
      length_page = element
        .find(".pagination > .page-numbers:nth-child(9)")
        .text()
        .trim();
    } else if (
      element
        .find(".pagination > .page-numbers:nth-child(11)")
        .attr("class") === "next page-numbers"
    ) {
      length_page = element
        .find(".pagination > .page-numbers:nth-child(10)")
        .text()
        .trim();
    } else if (
      element.find(".pagination > .page-numbers:nth-child(6)").attr("class") ===
      "page-numbers current"
    ) {
      length_page = element
        .find(".pagination > .page-numbers:nth-child(6)")
        .text()
        .trim();
    }

    element
      .find(
        ".list-update_items > .list-update_items-wrapper > .list-update_item"
      )
      .each((i, data) => {
        const thumbnail = $(data)
          .find("a > .list-update_item-image > img")
          .attr("src");
        const href = $(data).find("a").attr("href");
        const type = $(data)
          .find("a > .list-update_item-image > .type")
          .text()
          .trim();
        const title = $(data)
          .find("a > .list-update_item-info > h3")
          .text()
          .trim();
        const chapter = $(data)
          .find("a > .list-update_item-info > .other > .chapter")
          .text()
          .trim();
        const rating = $(data)
          .find(
            "a > .list-update_item-info > .other > .rate > .rating  >.numscore"
          )
          .text()
          .trim();
        komikList.push({
          title,
          href: href?.replace(`${baseUrl}/komik`, "").trim(),
          thumbnail,
          type,
          chapter,
          rating,
        });
      });

    return res.status(200).json({
      status: "success",
      current_page: parseFloat(current_page),
      length_page: parseFloat(length_page),
      data: komikList,
    });
  }
  return responseApi(res, response.status, "failed");
});

router.get("/genre/:url", async (req, res) => {
  try {
    const { page } = req.query;
    if (page === undefined) return responseApi(res, 500, "page is required");
    const response = await AxiosService(
      `${baseUrl}/genres/${req.params.url}/page/${page}`
    );
    if (response.status === 200) {
      const $ = cheerio.load(response.data);
      const element = $("#content > .wrapper > .postbody > .bixbox");
      const komikList = [];

      const checkPagination = element
        .find(".listupd > .list-update_items > .pagination > .current")
        .text()
        .trim();

      let length_page;
      if (
        element
          .find(".pagination > .page-numbers:nth-child(6)")
          .attr("class") === "next page-numbers"
      ) {
        length_page = element
          .find(".pagination > .page-numbers:nth-child(5)")
          .text()
          .trim();
      } else if (
        element
          .find(".pagination > .page-numbers:nth-child(8)")
          .attr("class") === "next page-numbers"
      ) {
        length_page = element
          .find(".pagination > .page-numbers:nth-child(7)")
          .text()
          .trim();
      } else if (
        element
          .find(".pagination > .page-numbers:nth-child(9)")
          .attr("class") === "next page-numbers"
      ) {
        length_page = element
          .find(".pagination > .page-numbers:nth-child(8)")
          .text()
          .trim();
      } else if (
        element
          .find(".pagination > .page-numbers:nth-child(10)")
          .attr("class") === "next page-numbers"
      ) {
        length_page = element
          .find(".pagination > .page-numbers:nth-child(9)")
          .text()
          .trim();
      } else if (
        element
          .find(".pagination > .page-numbers:nth-child(11)")
          .attr("class") === "next page-numbers"
      ) {
        length_page = element
          .find(".pagination > .page-numbers:nth-child(10)")
          .text()
          .trim();
      } else if (
        element
          .find(".pagination > .page-numbers:nth-child(4)")
          .attr("class") === "next page-numbers"
      ) {
        length_page = element
          .find(".pagination > .page-numbers:nth-child(3)")
          .text()
          .trim();
      } else if (
        element
          .find(".pagination > .page-numbers:nth-child(3)")
          .attr("class") === "next page-numbers"
      ) {
        length_page = element
          .find(".pagination > .page-numbers:nth-child(2)")
          .text()
          .trim();
      } else if (
        element
          .find(".pagination > .page-numbers:nth-child(6)")
          .attr("class") === "page-numbers current"
      ) {
        length_page = element
          .find(".pagination > .page-numbers:nth-child(6)")
          .text()
          .trim();
      }

      element
        .find(
          ".listupd > .list-update_items > .list-update_items-wrapper > .list-update_item"
        )
        .each((i, data) => {
          const title = $(data)
            .find("a > .list-update_item-info > h3")
            .text()
            .trim();
          const chapter = $(data)
            .find("a > .list-update_item-info > .other > .chapter")
            .text()
            .trim();
          const type = $(data)
            .find("a > .list-update_item-image > .type")
            .text()
            .trim();
          const thumbnail = $(data)
            .find("a > .list-update_item-image > img")
            .attr("src");
          const rating = $(data)
            .find(
              "a > .list-update_item-info > .other > .rate > .rating > .numscore"
            )
            .text()
            .trim();
          const href = $(data).find("a").attr("href");

          komikList.push({
            title,
            chapter,
            type,
            href: href?.replace(`${baseUrl}/komik`, "").trim(),
            rating,
            thumbnail,
          });
        });
      return res.status(200).json({
        status: "success",
        current_page: checkPagination === "" ? 1 : parseInt(checkPagination),
        length_page: checkPagination === "" ? 1 : parseFloat(length_page),
        data: komikList,
      });
    }

    return responseApi(res, response.status, "failed");
  } catch (er) {
    console.log(er);
    return responseApi(res, 500, "failed");
  }
});

router.get("/genre", async (req, res) => {
  try {
    const response = await AxiosService(baseUrl);
    if (response.status === 200) {
      const $ = cheerio.load(response.data);
      const element = $("#content > .wrapper");
      const komikList = [];
      element.find("#sidebar > .section > ul.genre > li").each((i, data) => {
        const title = $(data).find("a").text().trim();
        const href = $(data).find("a").attr("href");
        komikList.push({
          title,
          href: href?.replace(`${baseUrl}/genres`, "").trim(),
        });
      });
      return responseApi(res, 200, "success", komikList);
    }
    return responseApi(res, response.status, "failed");
  } catch (er) {
    console.log(er);
    return responseApi(res, 500, "failed");
  }
});

router.get("/read/:url", async (req, res) => {
  try {
    const response = await AxiosService(`${baseUrl}/${req.params.url}`);
    const komikList = [];
    if (response.status === 200) {
      const $ = cheerio.load(response.data);
      const element = $("#content > .wrapper");
      let title;
      const panel = [];
      title = element.find(".chapter_headpost > h1").text().trim();
      element
        .find(".chapter_ > #chapter_body > .main-reading-area > img")
        .each((i, data) => {
          panel.push($(data).attr("src"));
        });

      komikList.push({ title, panel });

      return responseApi(res, 200, "success", komikList);
    }
    return responseApi(res, response.status, "failed");
  } catch (er) {
    console.log(er);
    if (er === "Request failed with status code 404")
      return responseApi(res, 404, "comic not found");
    return responseApi(res, 500, "failed");
  }
});

router.get("/search", async (req, res) => {
  try {
    const response = await AxiosService(`${baseUrl}/?s=${req.query.keyword}`);
    const komikList = [];
    if (response.status === 200) {
      const $ = cheerio.load(response.data);
      const element = $(
        "#content > .wrapper > .postbody > .dev > #main > .list-update"
      );
      let title, href, thumbnail, type, chapter, rating;

      element
        .find(
          ".list-update_items > .list-update_items-wrapper > .list-update_item"
        )
        .each((i, data) => {
          title = $(data).find("a > .list-update_item-info > h3").text().trim();
          href = $(data).find("a").attr("href");
          type = $(data)
            .find("a > .list-update_item-image > .type")
            .text()
            .trim();
          rating = $(data)
            .find(
              "a > .list-update_item-info > .other > .rate > .rating > .numscore"
            )
            .text()
            .trim();
          chapter = $(data)
            .find("a > .list-update_item-info > .other > .chapter")
            .text()
            .trim();
          thumbnail = $(data)
            .find("a > .list-update_item-image > img")
            .attr("src");
          komikList.push({
            title,
            type,
            chapter,
            rating,
            href: href?.replace(`${baseUrl}/komik`, "").trim(),
            thumbnail,
          });
        });

      return responseApi(res, response.status, "success", komikList);
    }
    return responseApi(res, response.status, "failed");
  } catch (er) {
    console.log("ini error", er);
    return responseApi(res, 500, "failed");
  }
});

router.get("/detail/:url", async (req, res) => {
  try {
    const response = await AxiosService(`${baseUrl}/manga/${req.params.url}`);
    const komikList = [];
    if (response.status === 200) {
      const $ = cheerio.load(response.data);
      const element = $("#content > .wrapper > .komik_info");
      let title, thumbnail, description, status, type, released, author, rating;
      const chapter = [];
      const genre = [];

      rating = element
        .find(
          ".komik_info-body > .komik_info-content > .komik_info-content-rating > .komik_info-content-rating-bungkus > .data-rating > strong"
        )
        .text()
        .trim();
      title = element
        .find(
          ".komik_info-body > .komik_info-content > .komik_info-content-body > h1"
        )
        .text()
        .trim();

      released = element
        .find(
          ".komik_info-body > .komik_info-content > .komik_info-content-body > .komik_info-content-meta > span:nth-child(1)"
        )
        .text()
        .trim();
      author = element
        .find(
          ".komik_info-body > .komik_info-content > .komik_info-content-body > .komik_info-content-meta > span:nth-child(2)"
        )
        .text()
        .trim();
      status = element
        .find(
          ".komik_info-body > .komik_info-content > .komik_info-content-body > .komik_info-content-meta > span:nth-child(3)"
        )
        .text()
        .trim();
      type = element
        .find(
          ".komik_info-body > .komik_info-content > .komik_info-content-body > .komik_info-content-meta > span:nth-child(4)"
        )
        .text()
        .trim();

      description = element
        .find(".komik_info-description-sinopsis > p")
        .text()
        .trim();
      thumbnail = element
        .find(".komik_info-cover-box > .komik_info-cover-image > img")
        .attr("src");

      element
        .find(".komik_info-body > .komik_info-chapters > ul > li")
        .each((i, data) => {
          const title = $(data).find("a").text().trim();
          const href = $(data).find("a").attr("href");
          const date = $(data).find(".chapter-link-time").text().trim();
          chapter.push({
            title: `Chapter ${title?.replace("Chapter","").trim()}`,
            href: href?.replace(`${baseUrl}/chapter`, ""),
            date,
          });
        });

      element
        .find(
          ".komik_info-body > .komik_info-content > .komik_info-content-body > .komik_info-content-genre > a"
        )
        .each((i, data) => {
          genre.push({
            title: $(data).text().trim(),
            href: $(data).attr("href")?.replace(`${baseUrl}/genres`, "").trim(),
          });
        });

      komikList.push({
        title,
        rating: rating.replace("Rating ", ""),
        status: status.replace("Status:", "").trim(),
        type: type?.replace("Type:", "").trim(),
        released: released?.replace("Released:", "").trim(),
        author: author?.replace("Author:", "").trim(),
        genre,
        description,
        thumbnail,
        chapter,
      });
      return responseApi(res, 200, "success", komikList[0]);
    }
    return responseApi(res, response.status, "failed");
  } catch (er) {
    console.log(er);
    if (er === "Request failed with status code 404")
      return responseApi(res, 404, "comic not found");
    return responseApi(res, 500, "failed");
  }
});

router.get("/popular", async (req, res) => {
  try {
    const response = await AxiosService(baseUrl);
    const komikList = [];
    if (response.status === 200) {
      const $ = cheerio.load(response.data);
      const element = $("#content > .wrapper > #sidebar");
      element
        .find(".section > .widget-post > .serieslist.pop > ul > li")
        .each((i, data) => {
          const title = $(data).find(".leftseries > h2 > a").text().trim();

          const year = $(data)
            .find(".leftseries > span:nth-child(3)")
            .text()
            .trim();

          const genre = $(data)
            .find(".leftseries > span:nth-child(2)")
            .text()
            .trim();
          const thumbnail = $(data).find(".imgseries > a > img").attr("src");
          const href = $(data).find(".imgseries > a").attr("href");
          komikList.push({
            title,
            href: href?.replace(`${baseUrl}/komik`, "").trim(),
            genre: genre.replace("Genres:", "").trim(),
            year,
            thumbnail,
          });
        });

      return responseApi(res, 200, "success", komikList);
    }
    return responseApi(res, response.status, "failed");
  } catch (er) {
    console.log(er);
    return responseApi(res, 500, "failed");
  }
});

router.get("/recommended", async (req, res) => {
  try {
    const response = await AxiosService(baseUrl);
    let komikList = [];
    if (response.status === 200) {
      const $ = cheerio.load(response.data);
      const element = $(
        "#content > .wrapper > .bixbox > .listupd > .swiper > .swiper-wrapper > .swiper-slide"
      );

      element.each((i, data) => {
        const title = $(data)
          .find("a > .splide__slide-info > .title")
          .text()
          .trim();
        const rating = $(data)
          .find(
            "a > .splide__slide-info > .other > .rate > .rating > .numscore"
          )
          .text()
          .trim();
        const chapter = $(data)
          .find("a > .splide__slide-info > .other > .chapter")
          .text()
          .trim();
        const type = $(data)
          .find("a > .splide__slide-image  > .type")
          .text()
          .trim();
        const href = $(data).find("a").attr("href");
        const thumbnail = $(data)
          .find("a > .splide__slide-image > img")
          .attr("src");
        komikList.push({
          title,
          href: href?.replace(`${baseUrl}/komik`, ""),
          rating,
          chapter,
          type,
          thumbnail,
        });
      });
      return responseApi(
        res,
        200,
        "success",
        komikList.filter((v) => v?.href !== undefined)
      );
    }
    return responseApi(res, response.status, "failed");
  } catch (er) {
    console.log(er);
    return responseApi(res, 500, "failed");
  }
});

router.all("*", (req, res) => responseApi(res, 404, "route not found"));

module.exports = { router };
