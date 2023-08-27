const path = require("path");
const api = require("../../_11ty/api");
const siteConfig = require("../_data/siteConfig");

const { imageAssetPath: IMAGE_ASSET_PATH } = siteConfig;

const fetchFoldersFromApi = async () => {
  try {
    const { folders } = await api.fetchFolders();
    return folders.map((folder) => ({
      ...folder,
      galleries: folder.galleries.map((gallery) => ({
        ...gallery,
        cover: path.join(IMAGE_ASSET_PATH, gallery.cover),
      })),
    }));
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = fetchFoldersFromApi;
