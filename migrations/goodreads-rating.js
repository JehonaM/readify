module.exports = function (migration) {
  const book = migration.editContentType("book");

  // Add Goodreads rating field
  book
    .createField("goodreadsRating")
    .name("Goodreads Rating")
    .type("Number")
    .validations([
      {
        range: {
          min: 0,
          max: 5,
        },
      },
    ])
    .helpText("Book rating from Goodreads (0-5 stars)");

  // Add Goodreads book ID for linking
  book
    .createField("goodreadsId")
    .name("Goodreads Book ID")
    .type("Symbol")
    .helpText("Goodreads book ID for external linking");

  // Add review count
  book
    .createField("reviewCount")
    .name("Review Count")
    .type("Integer")
    .helpText("Total number of reviews on Goodreads");
};
