module.exports = function (migration) {
  const taxonomy = migration
    .createContentType("taxonomyTerm")
    .name("Taxonomy Term")
    .description("Reusable taxonomy for Genre, Audience, and Language")
    .displayField("title");

  taxonomy.createField("title").name("Title").type("Symbol").required(true);

  taxonomy
    .createField("slug")
    .name("Slug")
    .type("Symbol")
    .required(true)
    .validations([{ unique: true }]);

  taxonomy
    .createField("type")
    .name("Type")
    .type("Symbol")
    .required(true)
    .validations([
      {
        in: ["genre", "audience", "language"],
      },
    ]);

  taxonomy
    .createField("parent")
    .name("Parent")
    .type("Link")
    .linkType("Entry")
    .validations([{ linkContentType: ["taxonomyTerm"] }]);
};
