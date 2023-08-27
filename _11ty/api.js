const axios = require("axios");
const siteConfig = require("../content/_data/siteConfig");

const { url: API_URL, folderEndpoint: FOLDER_ENDPOINT } = siteConfig.api;

const fetchFromApi = async (url) => {
  try {
    const response = await axios.get(`${API_URL}${url}`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
const fetchFolderList = async () => {
  try {
    return await fetchFromApi(FOLDER_ENDPOINT);
  } catch (error) {
    throw new Error(error);
  }
};

const fetchFolderInfo = async (folderName) => {
  try {
    return await fetchFromApi(folderName);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  fetchFolderList,
  fetchFolderInfo,
};
