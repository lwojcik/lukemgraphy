const faviconsPlugin = require("eleventy-plugin-gen-favicons");
const { DateTime } = require("luxon");
const addHash = require("./_11ty/helpers/addHash");
const minifyHTML = require("./_11ty/helpers/minifyHTML");
const minifyXML = require("./_11ty/helpers/minifyXML");
const minifyJSON = require("./_11ty/helpers/minifyJSON");
const siteConfig = require("./content/_data/siteConfig");

module.exports = function (eleventyConfig) {
  // --- Copy assets

  eleventyConfig.addPassthroughCopy({
    assets: ".",
    "assets/images": "images",
    "assets/js": "js",
  });

  // --- Layout aliases

  eleventyConfig.addLayoutAlias("base", "layouts/base.njk");
  eleventyConfig.addLayoutAlias("index", "layouts/index.njk");
  eleventyConfig.addLayoutAlias("page", "layouts/page.njk");

  // --- Filters

  eleventyConfig.addFilter("addHash", addHash);

  eleventyConfig.addFilter(
    "alwaysProductionUrl",
    (path) => new URL(path, siteConfig.url)
  );

  eleventyConfig.addFilter("limit", (array, limit) => array.slice(0, limit));

  // --- Plugins

  eleventyConfig.addPlugin(faviconsPlugin, {
    manifestData: {
      name: siteConfig.title,
      lang: siteConfig.language,
      short_name: siteConfig.title,
      description: siteConfig.description,
      start_url: "/",
      scope: "/",
      display: "standalone",
      theme_color: "#191818",
      background_color: "#191818",
      orientation: "any",
    },
  });

  // --- Transforms

  eleventyConfig.addTransform("minifyHTML", minifyHTML);
  eleventyConfig.addTransform("minifyXML", minifyXML);
  eleventyConfig.addTransform("minifyJSON", minifyJSON);

  // --- Shortcodes

  eleventyConfig.addShortcode("currentYear", () =>
    DateTime.local().toFormat("yyyy")
  );

  return {
    dir: {
      input: "content",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    passthroughFileCopy: true,
    templateFormats: ["md", "njk"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
