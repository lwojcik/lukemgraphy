const path = require("path");
const fetchGalleriesFromApi = require("./galleries");
const siteConfig = require("../_data/siteConfig");

const fetchImagesFromApi = async () => {
  try {
    const galleries = await fetchGalleriesFromApi();

    const galleryCovers = galleries.map(({ cover }) => cover);

    const images = galleries.flatMap(({ images }) =>
      images.flatMap((image) =>
        Object.keys(image).flatMap((imageKey) => image[imageKey])
      )
    );

    return {
      ...galleryCovers,
      ...images,
    };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = fetchImagesFromApi;
