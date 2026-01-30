module.exports = function (migration) {
  const home = migration.createContentType("homePage").name("Home Page");

  home.createField("title").name("Title").type("Symbol");

  home.createField("heroTitle").name("Hero Title").type("Symbol");

  home
    .createField("heroImage")
    .name("Hero Image")
    .type("Link")
    .linkType("Asset");

  home
    .createField("sections")
    .name("Sections")
    .type("Array")
    .items({
      type: "Link",
      linkType: "Entry",
      validations: [{ linkContentType: ["imageWithText"] }],
    });
};
