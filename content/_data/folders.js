const path = require("path");
const api = require("../../_11ty/api");
const siteConfig = require("../_data/siteConfig");

const { imageAssetPath: IMAGE_ASSET_PATH } = siteConfig;

const fetchFoldersFromApi = async () => {
  try {
    const { folders } = await api.fetchFolders();
    return folders.map((folder) => ({
      ...folder,
      link: path.join("/", folder.slug, "/"),
      galleries: folder.galleries.map((gallery) => ({
        ...gallery,
        link: path.join("/", folder.slug, gallery.slug, "/"),
        cover: path.join(IMAGE_ASSET_PATH, gallery.cover),
      })),
    }));
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = fetchFoldersFromApi;
