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
    folderEndpoint: "/api.json",
    galleryEndpoint: "/index.json",
  },
};
