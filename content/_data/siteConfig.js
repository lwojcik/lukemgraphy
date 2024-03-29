const packageJson = require("../../package.json");

module.exports = {
  title: "LukemGraphy",
  subtitle: "by Łukasz Wójcik",
  description: "photography by Łukasz Wójcik",
  defaultMetaDescription:
    "Personal photography collection by Łukasz Wójcik. Cities, events, landscape, nature, people, travels, stories.",
  url: "https://lukemgraphy.eu",
  startYear: 2014,
  rssFeed: "/feed.xml",
  language: "en",
  author: {
    name: "Łukasz Wójcik",
    url: "https://lukaszwojcik.net/",
    contact: "https://lukaszwojcik.net/contact/",
    fediverse: { 
      mastodon: "https://hachyderm.io/@lukem",
      pixelfed: "https://pixelfed.social/lukemgraphy",
    },
  },
  social: {
    the500px: {
      url: "https://500px.com/p/lwojcik",
      name: "lwojcik @ 500px",
    },
    deviantArt: {
      url: "https://www.deviantart.com/lukemgraphy",
      name: "lukemgraphy @ DeviantArt",
    },
    flickr: {
      url: "https://www.flickr.com/photos/lukemgraphy/",
      name: "lukemgraphy @ Flickr",
    },
    instagram: {
      url: "https://www.instagram.com/lukemgraphy/",
      name: "lukemgraphy @ Instagram",
    },
    pixelfed: {
      url: "https://pixelfed.social/lukemgraphy",
      name: "lukemgraphy @ Pixelfed.social",
    },
    // threads: {
    //   url: "https://www.threads.net/@lukemgraphy",
    //   name: "lukemgraphy @ Threads",
    // },
    vimeo: {
      url: "https://vimeo.com/lukemgraphy",
      name: "lukemgraphy @ Vimeo",
    },
    youtube: {
      url: "https://www.youtube.com/@lukemgraphy",
      name: "lukemgraphy @ YouTube",
    },
  },
  generator: {
    name: "Eleventy",
    version: packageJson.dependencies["@11ty/eleventy"].replace("^", ""),
  },
  api: {
    url: "https://photos-api.lukaszwojcik.net/",
    imageFileExtension: "webp",
    foldersEndpoint: "/folders.json",
    galleriesEndpoint: "/galleries.json",
    defaultCacheDuration: "7d",
    imageCacheDuration: "365d",
    endpointCacheDuration: "2m",
    downloadIntervalMs: 0,
  },
  imageAssetPath: "/images",
};
