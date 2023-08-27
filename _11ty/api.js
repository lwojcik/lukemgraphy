const axios = require("axios");
const siteConfig = require("../content/_data/siteConfig");

const {
  url: API_URL,
  foldersEndpoint: FOLDERS_ENDPOINT,
  galleriesEndpoint: GALLERIES_ENDPOINT,
} = siteConfig.api;

const fetchFromApi = async (url) => {
  try {
    const { data } = await axios.get(`${API_URL}${url}`);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

const fetchFolders = () => fetchFromApi(FOLDERS_ENDPOINT);

const fetchGalleries = () => fetchFromApi(GALLERIES_ENDPOINT);

module.exports = {
  fetchFolders,
  fetchGalleries,
};
