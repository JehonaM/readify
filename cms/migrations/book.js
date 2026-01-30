module.exports = function (migration) {
  const book = migration
    .editContentType("book")
    .name("Book")
    .description("Single book page");

  book
    .createField("taxonomies")
    .name("Taxonomies")
    .type("Array")
    .items({
      type: "Link",
      linkType: "Entry",
      validations: [{ linkContentType: ["taxonomyTerm"] }],
    });
};
