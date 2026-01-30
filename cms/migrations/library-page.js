module.exports = function (migration) {
  const library = migration
    .createContentType("libraryPage")
    .name("Library Page");

  library.createField("title").name("Title").type("Symbol");

  library.createField("pageSize").name("Page Size").type("Integer");
};
