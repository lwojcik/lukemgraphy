const path = require("path");
const siteConfig = require("../content/_data/siteConfig");
const EleventyFetch = require("@11ty/eleventy-fetch");

const {
  url: API_URL,
  foldersEndpoint: FOLDERS_ENDPOINT,
  galleriesEndpoint: GALLERIES_ENDPOINT,
  videosEndpoint: VIDEOS_ENDPOINT,
  defaultCacheDuration: DEFAULT_CACHE_DURATION,
  imageCacheDuration: IMAGE_CACHE_DURATION,
  endpointCacheDuration: ENDPOINT_CACHE_DURATION,
} = siteConfig.api;

const dataTypes = ["json", "text", "buffer"];

const fetchFromApi = async ({
  endpoint,
  type = "json",
  duration = DEFAULT_CACHE_DURATION,
}) => {
  if (!dataTypes.includes(type)) {
    throw new Error(
      `Invalid data type: ${type}, available types: ${dataTypes.map(
        (type) => type
      )}`
    );
  }

  const url = path.join(API_URL, endpoint);
  return EleventyFetch(url, {
    duration,
    type,
    verbose: process.env.ELEVENTY_ENV === "development",
  });
};

const fetchFolders = () =>
  fetchFromApi({
    endpoint: FOLDERS_ENDPOINT,
    duration: ENDPOINT_CACHE_DURATION,
  });

const fetchGalleries = () =>
  fetchFromApi({
    endpoint: GALLERIES_ENDPOINT,
    duration: ENDPOINT_CACHE_DURATION,
  });

const fetchVideos = () =>
  fetchFromApi({
    endpoint: VIDEOS_ENDPOINT,
    duration: ENDPOINT_CACHE_DURATION,
  });


const fetchImage = (path) =>
  fetchFromApi({
    endpoint: path,
    type: "buffer",
    duration: IMAGE_CACHE_DURATION,
  });

module.exports = {
  fetchFolders,
  fetchGalleries,
  fetchVideos,
  fetchImage,
};
