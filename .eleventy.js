const faviconsPlugin = require("eleventy-plugin-gen-favicons");
// const pluginRss = require("@11ty/eleventy-plugin-rss");
// const cacheAvatar = require("./_11ty/helpers/cacheAvatar");
// const addHash = require("./_11ty/helpers/addHash");
// const getFulfilledValues = require("./_11ty/helpers/getFulfilledValues");
// const readableDate = require("./_11ty/helpers/readableDate");
// const addRef = require("./_11ty/helpers/addRef");
// const minifyHTML = require("./_11ty/helpers/minifyHTML");
const siteConfig = require("./content/_data/siteConfig");
// const minifyXML = require("./_11ty/helpers/minifyXML");
// const stripAndTruncateHTML = require("./_11ty/helpers/stripAndTruncateHTML");

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

  // eleventyConfig.addFilter("readableDate", readableDate);
  // eleventyConfig.addFilter("addRef", addRef);
  eleventyConfig.addFilter(
    "alwaysProductionUrl",
    (path) => new URL(path, siteConfig.url)
  );

  // --- Collections

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
  // eleventyConfig.addPlugin(pluginRss);

  // --- Transforms

  // eleventyConfig.addTransform("minifyHTML", minifyHTML);
  // eleventyConfig.addTransform("minifyXML", minifyXML);

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
