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
      link: `/${gallery.parent.folder.slug}/${gallery.slug}/`,
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
      ({
        name: parentGalleryName,
        slug: parentGallerySlug,
        parent: galleryParentFolder,
        images,
      }) =>
        images.map(({ name, variants }) => ({
          name,
          link: `/${galleryParentFolder.slug}/${parentGallerySlug}/${name}/`,
          variants,
          parent: {
            ...galleryParentFolder,
            gallery: {
              name: parentGalleryName,
              slug: parentGallerySlug,
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
