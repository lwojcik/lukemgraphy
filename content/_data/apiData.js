const path = require("path");
const api = require("../../_11ty/api");
const siteConfig = require("./siteConfig");

const { imageAssetPath: IMAGE_ASSET_PATH } = siteConfig;

const fetchFoldersFromApi = async () => {
  try {
    const { folders } = await api.fetchFolders();
    return folders.map((folder) => ({
      ...folder,
      link: path.join("/", folder.slug, "/"),
      galleries: folder.galleries
        .map((gallery) => ({
          ...gallery,
          link: path.join("/", folder.slug, gallery.slug, "/"),
          cover: path.join(IMAGE_ASSET_PATH, gallery.cover),
        })),
    }));
  } catch (error) {
    throw new Error(error);
  }
};

const fetchGalleryDataFromApi = async () => {
  try {
    const { galleries: galleriesFromApi } = await api.fetchGalleries();

    const galleriesWithImages = galleriesFromApi.map((gallery) => ({
      ...gallery,
      cover: path.join(IMAGE_ASSET_PATH, gallery.cover),
      link: path.join("/", gallery.parent.folder.slug, gallery.slug, "/"),
      parent: {
        folder: {
          ...gallery.parent.folder,
          link: `/${gallery.parent.folder.slug}/`,
        },
      },
      images: gallery.images.map(({ name, variants }) => ({
        name,
        link: path.join(
          "/",
          gallery.parent.folder.slug,
          gallery.slug,
          name,
          "/"
        ),
        variants: Object.keys(variants).reduce(
          (accumulator, imageVariant) => ({
            ...accumulator,
            [imageVariant]: path.join(IMAGE_ASSET_PATH, variants[imageVariant]),
          }),
          {}
        ),
      })),
    }));

    const publicGalleriesWithImages = galleriesWithImages.filter(gallery => !gallery.hidden);

    const hiddenGalleriesWithImages = galleriesWithImages.filter(gallery => gallery.hidden);

    const galleries =
      publicGalleriesWithImages.map((gallery, index) => ({
          ...gallery,
          newer:
            index > 0
              ? {
                  link: publicGalleriesWithImages[index - 1].link,
                  name: publicGalleriesWithImages[index - 1].name,
                }
              : null,
          older:
            index < publicGalleriesWithImages.length - 1
              ? {
                  link: publicGalleriesWithImages[index + 1].link,
                  name: publicGalleriesWithImages[index + 1].name,
                }
              : null,
          }));
    
    const hiddenGalleries =
      hiddenGalleriesWithImages.map((gallery, index) => ({
          ...gallery,
          newer:
            index > 0
              ? {
                  link: hiddenGalleriesWithImages[index - 1].link,
                  name: hiddenGalleriesWithImages[index - 1].name,
                }
              : null,
          older:
            index < hiddenGalleriesWithImages.length - 1
              ? {
                  link: hiddenGalleriesWithImages[index + 1].link,
                  name: hiddenGalleriesWithImages[index + 1].name,
                }
              : null,
          }));

    const allGalleries = [...galleries, ...hiddenGalleries];


    const imageData = allGalleries.flatMap(
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

    const images = imageData.map((image, index) => ({
      ...image,
      next:
        index < imageData.length - 1 && imageData[index + 1].name !== "000"
          ? {
              link: imageData[index + 1].link,
              name: imageData[index + 1].name,
            }
          : null,
      previous:
        index > 0 && imageData[index].name !== "000"
          ? {
              link: imageData[index - 1].link,
              name: imageData[index - 1].name,
            }
          : null,
    }));

    return {
      galleries,
      hiddenGalleries,
      images,
    };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = async () => ({
  folders: await fetchFoldersFromApi(),
  ...(await fetchGalleryDataFromApi()),
});
