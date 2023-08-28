const siteConfig = require("../_data/siteConfig");
const { fetchImage } = require("../../_11ty/api");
const fetchGalleriesFromApi = require("./galleries");
const { existsSync, mkdirSync, writeFileSync } = require("fs");
const path = require("path");

const { imageAssetPath: IMAGE_ASSET_PATH } = siteConfig;
const { url: IMAGE_API_URL, downloadIntervalMs: DOWNLOAD_INTERVAL_MS } =
  siteConfig.api;

const fetchImagesFromApi = async () => {
  try {
    const galleries = await fetchGalleriesFromApi();
    const galleryCovers = galleries.map(({ cover }) => cover);

    const images = galleries.flatMap(({ images }) =>
      images.flatMap((image) =>
        Object.keys(image).map((imageKey) => image[imageKey])
      )
    );

    const allImages = [...galleryCovers, ...images];

    for (let index = 0; index < allImages.length; index++) {
      const image = allImages[index];
      const sourceImage = image.replace(IMAGE_ASSET_PATH, "");

      const relativeImagePath = image.replace(IMAGE_API_URL, "");
      const imagePath = path.join(__dirname, "../../_site", relativeImagePath);

      try {
        const imageBuffer = await fetchImage(sourceImage);

        const imageDir = path.dirname(imagePath);
        if (!existsSync(imageDir)) {
          mkdirSync(imageDir, { recursive: true });
        }

        writeFileSync(imagePath, imageBuffer);

        if (DOWNLOAD_INTERVAL_MS > 0 && index < allImages.length - 1) {
          await new Promise((resolve) =>
            setTimeout(resolve, DOWNLOAD_INTERVAL_MS)
          );
        }
      } catch (error) {
        console.error(`Error saving image ${image}: ${error.message}`);
      }
    }

    return allImages;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = fetchImagesFromApi;
