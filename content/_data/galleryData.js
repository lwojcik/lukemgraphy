const path = require("path");
const api = require("../../_11ty/api");
const siteConfig = require("./siteConfig");

const { imageAssetPath: IMAGE_ASSET_PATH } = siteConfig;

const fetchGalleriesFromApi = async () => {
  try {
    const { galleries } = await api.fetchGalleries();

    const galleriesWithImages = galleries.map((gallery) => ({
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

    const images = galleriesWithImages.flatMap((gallery) => {
      const imageData = gallery.images.map((image) => {
        console.log(name);
        return {
          image: {
            ...image,
            name,
          },
          parentGallerySlug: gallery.slug,
          parentFolderSlug: gallery.parentFolderSlug,
        };
      });

      console.log(imageData);

      return imageData;
    });

    return {
      galleries: galleriesWithImages,
      images,
    };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = fetchGalleriesFromApi;
