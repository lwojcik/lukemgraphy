const packageJson = require("../../package.json");

module.exports = {
  title: "LukemGraphy",
  description: "photography by Łukasz Wójcik",
  defaultMetaDescription:
    "Personal photography collection by Łukasz Wójcik. Cities, events, landscape, nature, people, travels, stories.",
  url: "https://lukemgraphy.eu",
  startYear: 2014,
  language: "en",
  author: {
    name: "Łukasz Wójcik",
    url: "https://lukaszwojcik.net/",
    contact: "https://lukaszwojcik.net/contact/",
  },
  generator: {
    name: "Eleventy",
    version: packageJson.dependencies["@11ty/eleventy"].replace("^", ""),
  },
  api: {
    url: "https://api.lukemgraphy.eu",
    foldersEndpoint: "/folders.json",
    galleriesEndpoint: "/galleries.json",
    localCacheDuration: "7d",
    downloadIntervalMs: 0,
  },
  imageAssetPath: "/images",
};
