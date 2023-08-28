const packageJson = require("../../package.json");

module.exports = {
  title: "LukemGraphy",
  url: "https://lukemgraphy.eu",
  startYear: 2017,
  generator: {
    name: "Eleventy",
    version: packageJson.dependencies["@11ty/eleventy"].replace("^", ""),
  },
  api: {
    url: "https://api.lukemgraphy.eu",
    foldersEndpoint: "/folders.json",
    galleriesEndpoint: "/galleries.json",
    localCacheDuration: "7d",
    downloadInterval: 0,
  },
  imageAssetPath: "/images",
};
