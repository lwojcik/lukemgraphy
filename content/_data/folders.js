const api = require("../../_11ty/api");

const fetchFoldersFromApi = async () => {
  try {
    const { folders } = await api.fetchFolders();
    return folders;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = fetchFoldersFromApi;
