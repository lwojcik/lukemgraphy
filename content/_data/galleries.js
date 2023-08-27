const api = require("../../_11ty/api");

const fetchGalleriesFromApi = async () => {
  try {
    const { galleries } = await api.fetchGalleries();
    return galleries;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = fetchGalleriesFromApi;
