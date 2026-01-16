module.exports = function (migration) {
  const section = migration
    .createContentType("imageWithText")
    .name("Image With Text");

  section.createField("title").name("Title").type("Symbol");

  section.createField("description").name("Description").type("RichText");

  section.createField("image").name("Image").type("Link").linkType("Asset");

  section
    .createField("imageAlignment")
    .name("Image Alignment")
    .type("Symbol")
    .validations([{ in: ["left", "right", "top", "bottom"] }]);
};
