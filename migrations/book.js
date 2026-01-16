module.exports = function (migration) {
  const book = migration
    .createContentType("book")
    .name("Book")
    .description("Single book page");

  book.createField("title").name("Title").type("Symbol").required(true);

  book
    .createField("shortDescription")
    .name("Short Description")
    .type("RichText");

  book
    .createField("coverImage")
    .name("Cover Image")
    .type("Link")
    .linkType("Asset");

  book.createField("numberOfPages").name("Number of Pages").type("Integer");

  book
    .createField("authors")
    .name("Authors")
    .type("Array")
    .items({ type: "Symbol" });

  book.createField("externalLink").name("External Resource").type("Symbol");

  book
    .createField("taxonomy")
    .name("Taxonomy")
    .type("Array")
    .items({ type: "Symbol" });
};
