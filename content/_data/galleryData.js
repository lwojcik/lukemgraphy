const path = require("path");
const api = require("../../_11ty/api");
const siteConfig = require("./siteConfig");

const { imageAssetPath: IMAGE_ASSET_PATH } = siteConfig;

const fetchGalleryDataFromApi = async () => {
  try {
    const { galleries: galleriesFromApi } = await api.fetchGalleries();

    const galleriesWithImages = galleriesFromApi.map((gallery) => ({
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

    const galleries = galleriesWithImages.map((gallery, galleryIndex) => ({
      ...gallery,
      newerGallery:
        galleryIndex > 0
          ? {
              link: galleriesWithImages[galleryIndex - 1].link,
              name: galleriesWithImages[galleryIndex - 1].name,
            }
          : null,
      olderGallery:
        galleryIndex < galleriesWithImages.length - 1
          ? {
              link: galleriesWithImages[galleryIndex + 1].link,
              name: galleriesWithImages[galleryIndex + 1].name,
            }
          : null,
    }));

    const imageData = galleries.flatMap(
      ({ name: galleryName, slug: gallerySlug, parent: { folder }, images }) =>
        images.map(({ name, variants }) => ({
          name,
          link: `/${folder.slug}/${gallerySlug}/${name}/`,
          variants,
          parent: {
            folder,
            gallery: {
              name: galleryName,
              slug: gallerySlug,
            },
          },
        }))
    );

    const images = imageData.map((image, imageIndex) => ({
      ...image,
      nextImage:
        imageIndex < imageData.length - 1 && imageData[imageIndex + 1].name !== "000"
          ? {
              link: imageData[imageIndex + 1].link,
              name: imageData[imageIndex + 1].name,
            }
          : null,
      previousImage:
        imageIndex > 0 &&
        imageData[imageIndex].name !== "000"
          ? {
              link: imageData[imageIndex - 1].link,
              name: imageData[imageIndex - 1].name,
            }
          : null,
    }));

    return {
      galleries,
      images,
    };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = fetchGalleryDataFromApi;
