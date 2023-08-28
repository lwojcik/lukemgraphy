const path = require("path");
const api = require("../../_11ty/api");
const siteConfig = require("../_data/siteConfig");

const { imageAssetPath: IMAGE_ASSET_PATH } = siteConfig;

const fetchGalleriesFromApi = async () => {
  try {
    const { galleries } = await api.fetchGalleries();

    return galleries.map((gallery) => ({
      ...gallery,
      cover: path.join(IMAGE_ASSET_PATH, gallery.cover),
      images: gallery.images.map((image) =>
        Object.keys(image).reduce(
          (accumulator, imageVariant) => ({
            ...accumulator,
            [imageVariant]: path.join(IMAGE_ASSET_PATH, image[imageVariant]),
          }),
          {}
        )
      ),
    }));
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = fetchGalleriesFromApi;
