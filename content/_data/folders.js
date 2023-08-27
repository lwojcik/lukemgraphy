const api = require("../../_11ty/api");

const fetchFoldersFromApi = async () => {
  try {
    const { folders } = await api.fetchFolderList();

    return await Promise.all(
      folders.map(async ({ name, slug, url }) => {
        const { galleries } = await api.fetchFolderInfo(url);

        return {
          name,
          slug,
          galleries,
        };
      })
    );
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = fetchFoldersFromApi;
