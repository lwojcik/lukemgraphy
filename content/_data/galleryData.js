const path = require("path");
const api = require("../../_11ty/api");
const siteConfig = require("./siteConfig");

const { imageAssetPath: IMAGE_ASSET_PATH } = siteConfig;

const fetchGalleryDataFromApi = async () => {
  try {
    const { galleries: galleriesFromApi } = await api.fetchGalleries();

    const galleries = galleriesFromApi.map((gallery) => ({
      ...gallery,
      cover: path.join(IMAGE_ASSET_PATH, gallery.cover),
      link: path.join("/", gallery.parent.folder.slug, gallery.slug, "/"),
      images: gallery.images.map(({ name, variants }) => ({
        name,
        variants: Object.keys(variants).reduce(
          (accumulator, imageVariant) => ({
            ...accumulator,
            [imageVariant]: path.join(IMAGE_ASSET_PATH, variants[imageVariant]),
          }),
          {}
        ),
      })),
    }));

    const images = galleries.flatMap(
      ({ name: galleryName, slug, parent: { folder }, images }) =>
        images.map(({ name, variants }) => ({
          name,
          link: `/${folder.slug}/${slug}/${name}/`,
          variants,
          parent: {
            folder,
            gallery: {
              name: galleryName,
              slug,
            },
          },
        }))
    );

    return {
      galleries,
      images,
    };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = fetchGalleryDataFromApi;
