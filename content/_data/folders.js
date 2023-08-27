const api = require("../../_11ty/api");

const fetchFoldersFromApi = async () => {
  try {
    const { folders } = await api.fetchFolderList();

    const foldersWithGalleries = await Promise.all(
      folders.map(async (folder) => {
        console.log(folder.url);
        const { galleries } = await api.fetchFolderInfo(folder.url);

        return {
          name: folder.name,
          slug: folder.slug,
          galleries,
        };
      })
    );

    return foldersWithGalleries;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = fetchFoldersFromApi;
